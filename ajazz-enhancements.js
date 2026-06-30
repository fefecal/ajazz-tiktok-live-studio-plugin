(function () {
  'use strict';

  var BLEEP_ACTION = 'com.tiktok.livestudio.bleep';
  var KNOB_ACTIONS = {
    'com.tiktok.livestudio.miccontrol': true,
    'com.tiktok.livestudio.audiocontrol': true
  };

  function safeParse(data) {
    if (typeof data !== 'string' || data.charAt(0) !== '{') return null;
    try { return JSON.parse(data); } catch (e) { return null; }
  }

  function sendSD(socket, event, context) {
    try {
      socket.send(JSON.stringify({ event: event, context: context }));
    } catch (e) {}
  }

  function stopBleep() {
    try {
      var audio = window.__ajazzBleepAudio;
      if (!audio || !audio.gain || !audio.oscillator || !audio.context) return;
      var now = audio.context.currentTime;
      audio.gain.gain.cancelScheduledValues(now);
      audio.gain.gain.setValueAtTime(audio.gain.gain.value, now);
      audio.gain.gain.linearRampToValueAtTime(0, now + 0.005);
      setTimeout(function () {
        try {
          audio.oscillator.stop();
          audio.oscillator.disconnect();
          audio.gain.disconnect();
        } catch (e) {}
      }, 10);
    } catch (e) {
    } finally {
      window.__ajazzBleepAudio = null;
    }
  }

  function startBleep(socket, context) {
    try {
      stopBleep();
      var AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) {
        sendSD(socket, 'showAlert', context);
        return;
      }

      var audioContext = window.__ajazzBleepContext || new AudioContextCtor();
      window.__ajazzBleepContext = audioContext;

      var oscillator = audioContext.createOscillator();
      var gain = audioContext.createGain();
      var now = audioContext.currentTime;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.75, now + 0.005);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();

      window.__ajazzBleepAudio = {
        context: audioContext,
        oscillator: oscillator,
        gain: gain
      };
      // showOk disabled by user request
    } catch (e) {
      sendSD(socket, 'showAlert', context);
    }
  }

  function handleBleepMessage(socket, message) {
    if (!message || message.action !== BLEEP_ACTION) return false;

    if (message.event === 'keyDown') {
      startBleep(socket, message.context);
      return true;
    }
    if (message.event === 'keyUp' || message.event === 'willDisappear') {
      stopBleep();
      return true;
    }
    return false;
  }

  function getVolumeStepPercent(message) {
    var settings = (message && message.payload && message.payload.settings) || {};
    var value = Number(settings.volumeStepPercent);
    if (!isFinite(value) || value <= 0) return 1;
    return Math.min(100, value);
  }

  function adjustDialRotateEvent(event, message) {
    if (!message ||
        message.event !== 'dialRotate' ||
        !KNOB_ACTIONS[message.action] ||
        !message.payload) {
      return event;
    }

    var ticks = Number(message.payload.ticks) || 0;
    var stepPercent = getVolumeStepPercent(message);
    if (!ticks || stepPercent === 1) return event;

    message.payload.ticks = ticks * stepPercent;

    return {
      data: JSON.stringify(message),
      origin: event.origin,
      lastEventId: event.lastEventId,
      source: event.source,
      ports: event.ports,
      type: event.type,
      target: event.target,
      currentTarget: event.currentTarget,
      eventPhase: event.eventPhase,
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      defaultPrevented: event.defaultPrevented,
      composed: event.composed,
      timeStamp: event.timeStamp,
      isTrusted: event.isTrusted
    };
  }

  function installWebSocketFilter() {
    var NativeWebSocket = window.WebSocket;
    if (!NativeWebSocket || NativeWebSocket.__ajazzEnhancements) return;

    function WrappedWebSocket(url, protocols) {
      var socket = protocols === undefined
        ? new NativeWebSocket(url)
        : new NativeWebSocket(url, protocols);
      var nativeAddEventListener = socket.addEventListener.bind(socket);

      socket.addEventListener = function (type, listener, options) {
        if (type !== 'message' || !listener) {
          return nativeAddEventListener(type, listener, options);
        }

        var wrappedListener = typeof listener === 'function'
          ? function (event) {
              var message = safeParse(event.data);
              if (handleBleepMessage(socket, message)) return;
              return listener.call(this, adjustDialRotateEvent(event, message));
            }
          : {
              handleEvent: function (event) {
                var message = safeParse(event.data);
                if (handleBleepMessage(socket, message)) return;
                return listener.handleEvent(adjustDialRotateEvent(event, message));
              }
            };

        return nativeAddEventListener(type, wrappedListener, options);
      };

      return socket;
    }

    try { Object.setPrototypeOf(WrappedWebSocket, NativeWebSocket); } catch (e) {}
    WrappedWebSocket.prototype = NativeWebSocket.prototype;
    WrappedWebSocket.__ajazzEnhancements = true;
    window.WebSocket = WrappedWebSocket;
  }

  installWebSocketFilter();
})();
