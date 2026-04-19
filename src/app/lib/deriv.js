import DerivAPI from '@deriv/deriv-api';

let api = null;
let connection = null;

export const getApi = () => {
  if (!api) {
    connection = new WebSocket(
      'wss://ws.derivws.com/websockets/v3?app_id=331TJDgd97HSWBzgdRdxl'
    );
    api = new DerivAPI({ connection });
  }
  return api;
};

export const getConnection = () => connection;

export const resetApi = () => {
  if (connection && connection.readyState === WebSocket.OPEN) {
    connection.close();
  }
  api = null;
  connection = null;
};

export default getApi;
