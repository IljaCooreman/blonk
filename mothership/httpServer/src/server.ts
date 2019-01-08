import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';

// import * as WebSocket from 'ws';
// import { messageSystem } from './MessageSystem';
import { redisClient } from './redis';

export default class HttpServer {
  constructor() {
    const app = express();
    app.use(bodyParser.json());
    app.post('/auth', (req, res) => {
      console.log('body', req);
      redisClient.hgetall('satTokens', (err, tokens) => {
        if (!tokens) { throw new Error('No satellite tokens found') };
        const id = Object.keys(tokens).find(key => tokens[key] === JSON.stringify(req.body));
        if (id) {
          res.send({ token: 'abcd1234' });
        } else {
          res.send('failed');
        }
      })
    });

    const server = http.createServer(app);
    server.listen(process.env.PORT || 9000, () => {
      console.log(`Server started on port 9000`);
    });
  }
}

// // initialize a simple http server
// const server = http.createServer(app);

// // initialize the WebSocket server instance
// const wss = new WebSocket.Server({ server, clientTracking: true });


// wss.on('connection', (ws: WebSocket) => {
//   console.log(wss.clients.size, 'connected clients')
//   ws.on('open', () => {
//     console.log('new connection opened')
//   })

//   ws.on('message', (message: string) => {
//     const dto = messageSystem.parse(message);
//   });
// });

// // start our server
// server.listen(process.env.PORT || 9000, () => {
//   console.log(`Server started on port 9000`);
// });