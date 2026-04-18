import DerivAPI from '@deriv/deriv-api';

let api = null;

export const getApi = () => {
  if (!api) {
    const connection = new WebSocket(
      'wss://ws.derivws.com/websockets/v3?app_id=331TJDgd97HSWBzgdRdxl'
    );
    api = new DerivAPI({ connection });
  }
  return api;
};

export default getApi;
