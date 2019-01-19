import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import { isArray } from 'util';
import * as uuid from 'uuid';

// import * as WebSocket from 'ws';
// import { messageSystem } from './MessageSystem';
import { redisClient } from './redis';

export default function HttpServer() {

  const app = express();
  app.use(bodyParser.json());
  app.post('/auth', (req, res) => {
    try {
      if (!req.body || !req.body.entryCode || !isArray(JSON.parse(req.body.entryCode))) {
        res.status(400);
        res.send('D.E.N.I.E.D., Denied! No code provided.');
      }
      if (!redisClient.connected) { throw new Error('Server is not connected to Redis.') };
      redisClient.hgetall('satTokens', (err, tokens) => {
        if (!tokens) {
          res.status(409);
          res.send('No satellites connected right now.');
          return;
        };
        const satelliteId = Object.keys(tokens).find(key => JSON.stringify(tokens[key]) === JSON.stringify(req.body.entryCode));
        if (satelliteId) {
          // store token in redis. satid: <connected
          const token = uuid.v4();
          redisClient.hset('userTokens', token, satelliteId);

          res.status(201);
          res.send({
            group: satelliteId.split(':')[0],
            satelliteId,
            token,
          });
        } else {
          res.status(401);
          res.send('D.E.N.I.E.D., Denied! Wrong code. Try again');
        }
      });
    } catch (e) {
      res.status(500);
      res.send(e.message);
    }
  });

  const server = http.createServer(app);
  server.listen(process.env.PORT || 9000, () => {
    console.log(`Server started on port 9000`);
  });
}
