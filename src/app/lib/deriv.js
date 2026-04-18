import DerivAPI from '@deriv/deriv-api';

const connection = new WebSocket(
  'wss://ws.derivws.com/websockets/v3?app_id=32VoS1k9cgZbKGyjp8sSW'
);

const api = new DerivAPI({ connection });

export default api;
