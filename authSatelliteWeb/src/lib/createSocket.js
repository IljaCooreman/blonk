import { SERVER_PORT, SERVER_HOST, GROUP } from "../config";
import uuid from "uuid";

const DeviceType = {
  authSatellite: 'satellite',
  mothership: 'mothership',
  browser: 'browser',
  broadcast: 'broadcast'
}
const Purpose = {
  message: 'message',
  handshake: 'handshake',
}

export const createSocket = () => {
  const ws = new WebSocket(`ws://${SERVER_HOST}:${SERVER_PORT}`)
  ws.onopen = () => {
    console.log('connection open');
    const dataObject = {
      body: `${GROUP}:${uuid.v4()}`,
      purpose: Purpose.handshake,
      type: DeviceType.authSatellite,
    }
    ws.send(JSON.stringify(dataObject));
  }
  return ws;
}

export const handshake = ws => {
  ws.onopen()
}

export const error = ws => {
  ws.onerror = ('error', function (e) {
    console.log('error', e)
  })
}