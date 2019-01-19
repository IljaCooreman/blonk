// tslint:disable:no-console
import * as WebSocket from 'ws';

import { Purpose, DTO } from '../types/typedefs';
import { messageSystem } from './MessageSystem';
import { redisClient } from './redis';
import { tokenGenerator } from './tokenGenerator';

export default class AuthSatelliteServer {
  constructor() {
    const wss = new WebSocket.Server({ port: 9001 });
    redisClient.del('satTokens');
    console.log('Auth server started on port 9001');

    wss.on('connection', ws => {
      console.log('New device connected');
      let id = '';

      ws.on('message', (message: string) => {
        const parsedMessage: DTO = messageSystem.parse(message);
        if (parsedMessage.purpose === Purpose.handshake) {
          id = parsedMessage.body;
        }
      })

      redisClient.on('connect', () => { console.log('redis connected') });
      const timeout = tokenGenerator(token => {
        console.log(id)
        redisClient.hset('satTokens', id, JSON.stringify(token));
        ws.send(messageSystem.encode(Purpose.token, token));
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