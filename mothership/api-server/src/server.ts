import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';

import { createSocketServer } from './createSocketServer';
import { isAuthorized } from './middleware/auth';
import { cors } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { authController } from './routes/authController';
import connectedUsers from './routes/connectedUsers';


export default function apiServer() {

  const app = express();

  app.use(cors);
  app.use(bodyParser.json());

  // endpoints
  app.post('/auth', authController);
  app.get('/', isAuthorized, (req, res, next) => {
    res.status(200).json({ status: 'looks alll riiiight!' });
    next();
  });
  app.get('/connectedUsers', isAuthorized, connectedUsers.getAll)
  app.get('/connectedUsers/:userId', isAuthorized, connectedUsers.getSingle)


  app.use(errorHandler);
  const server = http.createServer(app);
  const wss = createSocketServer(server);
  wss.on('connection', (ws: any) => {
    ws.id = (Math.random() * 1000).toString();
    console.log('new connenction with id', ws.id)
    wss.clients.forEach(wsClient => {
      wsClient.send(JSON.stringify({ message: `new connection ${ws.id}`, }))
    })
  });

  server.listen(process.env.PORT || 9000, () => {
    console.log(`Server started on port 9000`);
  });
}
