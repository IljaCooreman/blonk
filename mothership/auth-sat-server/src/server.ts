// tslint:disable:no-console
import * as WebSocket from 'ws';

import { DTO, Purpose } from '../types/typedefs';
import { messageSystem } from './MessageSystem';
import { redisClient } from './redis';
import { tokenGenerator } from './tokenGenerator';

export default class AuthSatelliteServer {
  constructor() {
    const wss = new WebSocket.Server({ port: 9001 });
    redisClient.del('satTokens');
    console.log('Auth server started on port 9001');

    wss.on('connection', ws => {
      let id = '';

      ws.on('message', (message: string) => {
        const parsedMessage: DTO = messageSystem.parse(message);
        if (parsedMessage.purpose === Purpose.handshake) {
          id = parsedMessage.body;
        }
        console.log('New device succesfully connected. id: ', id);
      })

      redisClient.on('connect', () => { console.log('redis connected') });

      const timeout = tokenGenerator(loginCode => {
        redisClient.hset('satTokens', id, JSON.stringify(loginCode));
        ws.send(messageSystem.encode(Purpose.token, loginCode));
        // redisClient.hgetall('satTokens', (err, tokens) => {
        //   console.log('tokens:', tokens);
        // })
      });


      ws.on('close', () => {
        redisClient.hdel('satTokens', [id], () => console.log(`Closing connection ${id}.`));
        clearTimeout(timeout);
      });

      ws.on('error', () => {
        redisClient.hdel('satTokens', [id], () => console.log(`Error on connection ${id}.`));
        clearTimeout(timeout);
      });
    });
  }
}