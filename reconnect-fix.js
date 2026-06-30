(function () {
  'use strict';

  var CONNECTED = 'connected';
  var DISCONNECTED = 'disconnected';
  var JOIN_ROOM = 'join_room';
  var SYNC_SETTINGS = 'sync_settings';

  function safeJSON(value) {
    if (!value) return null;
    if (typeof value === 'object') return value;
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  function log(ls, message) {
    try {
      if (ls && ls._queries && ls._queries.onLog) {
        ls._queries.onLog('---ls reconnect fix: ' + message + '---');
      }
    } catch (e) {}
  }

  function getChannel(ls, name) {
    return ls._getChannel ? ls._getChannel(name) : ('stream_deck/' + name);
  }

  function emit(socket, channel) {
    try {
      if (socket && socket.connected !== false) socket.emit(channel);
    } catch (e) {}
  }

  function reopen(ls, delay) {
    if (ls.__ajazzReconnectTimer) return;
    ls.__ajazzReconnectTimer = true;
    setTimeout(function () {
      ls.__ajazzReconnectTimer = false;
      try {
        if (ls.socket) ls.socket.close();
      } catch (e) {}
      ls.socket = void 0;
      ls.lsStatus = DISCONNECTED;
      ls._init();
    }, delay || 0);
  }

  function patchLiveStudioConnection(ls) {
    if (!ls || ls.__ajazzReconnectFix) return;
    ls.__ajazzReconnectFix = true;

    var originalHandleDisconnect = ls._handleDisconnect;

    ls._handleConnect = function () {
      var socket = ls.socket;
      if (!socket) return;

      var joinChannel = getChannel(ls, JOIN_ROOM);
      var syncChannel = getChannel(ls, SYNC_SETTINGS);
      var onConnected = (ls._queries && ls._queries.onConnected) || function () {};
      var onSyncSettings = (ls._queries && ls._queries.onSyncSettings) || function () {};
      var connectedNotified = false;

      function markConnected() {
        ls.lsStatus = CONNECTED;
        if (!connectedNotified) {
          connectedNotified = true;
          onConnected();
        }
      }

      function requestSync() {
        emit(socket, joinChannel);
        setTimeout(function () { emit(socket, syncChannel); }, 250);
      }

      log(ls, 'connect');

      try {
        if (socket.off) {
          socket.off(joinChannel);
          socket.off(syncChannel);
        }
      } catch (e) {}

      socket.on(joinChannel, function () {
        log(ls, 'join_room');
        markConnected();
        emit(socket, syncChannel);
      });

      socket.on(syncChannel, function (payload) {
        var settings = safeJSON(payload);
        log(ls, 'sync_settings');
        if (settings) {
          ls.lsSettings = settings;
          markConnected();
          onSyncSettings(settings);
        }
      });

      requestSync();

      setTimeout(function () {
        if (ls.socket === socket && ls.lsStatus !== CONNECTED) {
          log(ls, 'no sync; rescan');
          reopen(ls, 0);
        }
      }, 2500);
    };

    ls._handleDisconnect = function () {
      try {
        if (originalHandleDisconnect) return originalHandleDisconnect.apply(ls, arguments);
      } finally {
        if (ls.lsStatus !== CONNECTED) reopen(ls, 750);
      }
    };

    ls.tryConnect = function () {
      log(ls, 'try connect');
      if (ls.lsStatus !== CONNECTED && ls.socket) {
        reopen(ls, 0);
        return;
      }
      ls._init();
      if (ls.socket && ls.socket.connected) {
        ls._handleConnect();
      }
    };

    setInterval(function () {
      if (ls.lsStatus === CONNECTED) return;
      if (ls.socket && ls.socket.connected) {
        ls._handleConnect();
        return;
      }
      reopen(ls, 0);
    }, 2000);

    ls.tryConnect();
  }

  function wrapConnect(original) {
    if (!original || original.__ajazzReconnectFix) return original;
    var wrapped = function () {
      var instance = original.apply(this, arguments);
      setTimeout(function () {
        patchLiveStudioConnection(instance && instance._lsInstance);
      }, 0);
      return instance;
    };
    wrapped.__ajazzReconnectFix = true;
    return wrapped;
  }

  function installWrapper() {
    var current = window.connectElgatoStreamDeckSocket;
    if (!current || current.__ajazzReconnectFix) return false;
    window.connectElgatoStreamDeckSocket = wrapConnect(current);
    return true;
  }

  var hasAccessor = false;
  var assignedConnect = window.connectElgatoStreamDeckSocket;

  try {
    Object.defineProperty(window, 'connectElgatoStreamDeckSocket', {
      configurable: true,
      get: function () {
        return assignedConnect;
      },
      set: function (value) {
        assignedConnect = wrapConnect(value);
      }
    });
    hasAccessor = true;
    if (assignedConnect) assignedConnect = wrapConnect(assignedConnect);
  } catch (e) {}

  if (!hasAccessor && !installWrapper()) {
    setTimeout(installWrapper, 0);
  }
})();
