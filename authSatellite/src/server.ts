import * as uuid from 'uuid';
import * as WebSocket from 'ws';

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

console.log('this thing is on');
const host = '192.168.1.32'

const ws = new WebSocket(`ws://${host}:9001`);
ws.on('open', function open() {
  console.log('connection open');
  const dataObject: DTO = {
    body: uuid.v4(),
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