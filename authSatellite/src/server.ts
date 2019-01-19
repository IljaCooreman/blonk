// tslint:disable:no-console
import * as uuid from 'uuid';
import * as WebSocket from 'ws';

import { GROUP, SERVER_HOST, SERVER_PORT } from '../config';

enum DeviceType {
  authSatellite = 'satellite',
  mothership = 'mothership',
  browser = 'browser',
  broadcast = 'broadcast'
}
enum Purpose {
  message = 'message',
  handshake = 'handshake',
}

interface DTO {
  body: any,
  purpose: Purpose,
  type: DeviceType
}

export const init = () => {

  console.log('this thing is on');

  const ws = new WebSocket(`ws://${SERVER_HOST}:${SERVER_PORT}`);
  ws.on('open', function open() {
    console.log('connection open');
    const dataObject: DTO = {
      body: `${GROUP}:${uuid.v4()}`,
      purpose: Purpose.handshake,
      type: DeviceType.authSatellite,
    }
    ws.send(JSON.stringify(dataObject));
  });

  ws.on('message', function incoming(data: string) {
    console.log(data);
  });

  ws.on('error', (error) => {
    console.log(error)
  })
}