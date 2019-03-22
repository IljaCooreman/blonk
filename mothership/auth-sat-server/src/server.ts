// tslint:disable:no-console
import * as WebSocket from 'ws';

import { DTO, Purpose } from '../types/typedefs';
import { messageSystem } from './MessageSystem';
import { redisClient } from './redis';
import { tokenGenerator } from './tokenGenerator';

export default class AuthSatelliteServer {
  constructor() {
    let id: string = '';
    const wss = new WebSocket.Server({ port: 9001 });
    redisClient.del('satTokens');
    console.log('Auth server started on port 9001');

    wss.on('connection', (ws: WebSocket) => {
      redisClient.on('connect', () => { console.log('redis connected') });

      ws.on('message', (message: string) => {
        const parsedMessage: DTO = messageSystem.parse(message);
        if (parsedMessage.purpose === Purpose.handshake) {
          id = parsedMessage.body;
        }
        console.log('New device succesfully connected. id: ', id);
      })

      const timeout = tokenGenerator(loginCode => {
        redisClient.hset('satTokens', id, JSON.stringify(loginCode));
        ws.send(messageSystem.encode(Purpose.token, loginCode));
      });


      const removeToken = (): void => {
        redisClient.hdel('satTokens', [id], () => console.log(`Error on connection ${id}.`));
        clearTimeout(timeout);
      }

      ws.on('close', removeToken);
      ws.on('error', removeToken);


      // ws.on('pong', () => {
      //   /* tslint:disable */
      //   console.log('pong')
      //   isAlive = true;
      // })

      //   const pingInterval = setInterval(function ping() {
      //     if (isAlive === false) {
      //       clearInterval(pingInterval);
      //       ws.terminate();
      //       return console.log('connection no longer alive')
      //     }
      //     isAlive = false;
      //     ws.ping(() => { console.log('pinging') });
      //   }, 5000)
    });
  }
}
/* tslint:enable */