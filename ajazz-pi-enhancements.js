(function () {
  'use strict';

  var KNOB_ACTIONS = {
    'com.tiktok.livestudio.miccontrol': true,
    'com.tiktok.livestudio.audiocontrol': true
  };

  var state = {
    action: '',
    context: '',
    settings: {},
    socket: null
  };

  function safeParse(data) {
    if (typeof data !== 'string' || data.charAt(0) !== '{') return null;
    try { return JSON.parse(data); } catch (e) { return null; }
  }

  function cleanStep(value) {
    var number = Number(value);
    if (!isFinite(number) || number <= 0) return 1;
    return Math.min(100, Math.round(number * 100) / 100);
  }

  function mergeStepIntoPayload(raw) {
    var message = safeParse(raw);
    if (!message || message.event !== 'setSettings' || !KNOB_ACTIONS[state.action]) {
      return raw;
    }

    var step = cleanStep(state.settings.volumeStepPercent);
    state.settings = Object.assign({}, state.settings, message.payload || {}, {
      volumeStepPercent: step
    });
    message.payload = Object.assign({}, state.settings);
    return JSON.stringify(message);
  }

  function sendSettings() {
    if (!state.socket || !state.context) return;
    state.socket.send(JSON.stringify({
      event: 'setSettings',
      context: state.context,
      payload: state.settings
    }));
  }

  function upsertStepControl() {
    if (!KNOB_ACTIONS[state.action]) return;

    var root = document.getElementById('root');
    if (!root || document.getElementById('ajazz-volume-step')) return;

    var item = document.createElement('div');
    item.className = 'sdpi-item';
    item.id = 'ajazz-volume-step';
    item.innerHTML = [
      '<div class="sdpi-item-label">Step (%)</div>',
      '<input class="sdpi-item-value" type="number" min="0.1" max="100" step="0.1">'
    ].join('');

    var input = item.querySelector('input');
    input.value = cleanStep(state.settings.volumeStepPercent || 1);
    input.addEventListener('change', function () {
      state.settings = Object.assign({}, state.settings, {
        volumeStepPercent: cleanStep(input.value)
      });
      input.value = state.settings.volumeStepPercent;
      sendSettings();
    });

    root.appendChild(item);
  }

  function rememberPIMessage(data) {
    var message = safeParse(data);
    if (!message) return;

    if (message.event === 'sendToPropertyInspector') {
      state.action = message.action || state.action;
      state.context = message.context || state.context;
      state.settings = Object.assign(
        {},
        state.settings,
        (message.payload && message.payload.settings) || {}
      );
    }
  }

  function installWebSocketFilter() {
    var NativeWebSocket = window.WebSocket;
    if (!NativeWebSocket || NativeWebSocket.__ajazzPIEnhancements) return;

    function WrappedWebSocket(url, protocols) {
      var socket = protocols === undefined
        ? new NativeWebSocket(url)
        : new NativeWebSocket(url, protocols);

      state.socket = socket;

      var nativeSend = socket.send.bind(socket);
      var nativeAddEventListener = socket.addEventListener.bind(socket);

      socket.send = function (data) {
        return nativeSend(mergeStepIntoPayload(data));
      };

      socket.addEventListener = function (type, listener, options) {
        if (type !== 'message' || !listener) {
          return nativeAddEventListener(type, listener, options);
        }

        var wrappedListener = typeof listener === 'function'
          ? function (event) {
              rememberPIMessage(event.data);
              var result = listener.call(this, event);
              setTimeout(upsertStepControl, 0);
              return result;
            }
          : {
              handleEvent: function (event) {
                rememberPIMessage(event.data);
                var result = listener.handleEvent(event);
                setTimeout(upsertStepControl, 0);
                return result;
              }
            };

        return nativeAddEventListener(type, wrappedListener, options);
      };

      return socket;
    }

    try { Object.setPrototypeOf(WrappedWebSocket, NativeWebSocket); } catch (e) {}
    WrappedWebSocket.prototype = NativeWebSocket.prototype;
    WrappedWebSocket.__ajazzPIEnhancements = true;
    window.WebSocket = WrappedWebSocket;
  }

  installWebSocketFilter();
})();
