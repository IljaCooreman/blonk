// import * as redis from 'redis';
import * as uuid from 'uuid';
import * as WebSocket from 'ws';

import { Purpose } from '../types/typedefs';
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
      const id = uuid.v4();

      redisClient.on('connect', () => { console.log('redis connected') });
      const timeout = tokenGenerator(token => {
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