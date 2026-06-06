const WS = (() => {
  let socket = null;
  let reconnectDelay = 1000;
  const handlers = {};

  function connect() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    socket = new WebSocket(`${proto}://${location.host}`);

    socket.onopen = () => {
      reconnectDelay = 1000;
      dispatch('__connected__', {});
    };

    socket.onmessage = event => {
      try {
        const { event: name, payload } = JSON.parse(event.data);
        dispatch(name, payload);
      } catch {}
    };

    socket.onclose = () => {
      dispatch('__disconnected__', {});
      setTimeout(() => {
        reconnectDelay = Math.min(reconnectDelay * 2, 30000);
        connect();
      }, reconnectDelay);
    };

    socket.onerror = () => socket.close();
  }

  function dispatch(name, payload) {
    (handlers[name] || []).forEach(fn => fn(payload));
  }

  connect();

  return {
    send(event, payload = {}) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ event, payload }));
      }
    },
    on(event, handler) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(handler);
    },
    isOpen() {
      return socket && socket.readyState === WebSocket.OPEN;
    },
  };
})();
