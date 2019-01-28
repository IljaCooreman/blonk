import { Server } from 'http';
import * as WebSocket from 'ws';

export const createSocketServer = (server: Server) => new WebSocket.Server({
  clientTracking: true,
  port: 5555,
  server,
});

