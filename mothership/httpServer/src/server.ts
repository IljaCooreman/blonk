import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import { isArray } from 'util';
import * as uuid from 'uuid';

// import * as WebSocket from 'ws';
// import { messageSystem } from './MessageSystem';
import { publisher } from './redis';
import { isAuthorized } from './utils/auth';
import { errorHandler } from './utils/errorHandler';

export default function HttpServer() {

  const app = express();
  app.use(bodyParser.json());
  app.use(errorHandler);

  app.post('/auth', (req, res) => {
    try {
      if (!req.body || !req.body.entryCode || !isArray(JSON.parse(req.body.entryCode))) {
        res.status(400);
        res.send('D.E.N.I.E.D., Denied! No code provided.');
      }
      if (!publisher.connected) { throw new Error('Server is not connected to Redis.') };
      publisher.hgetall('satTokens', (err, tokens) => {
        if (!tokens) {
          res.status(409);
          res.send('No satellites connected right now.');
          return;
        };
        const satelliteId = Object.keys(tokens).find(key => JSON.stringify(tokens[key]) === JSON.stringify(req.body.entryCode));
        if (satelliteId) {
          // store token in redis.
          const token = uuid.v4();
          publisher.set(token, satelliteId, 'EX', 2 * 60 * 60); // token expires after 2hours (2 * 3600 sec)

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

  app.get('/', isAuthorized, (req, res, next) => {
    res.status(200).json({ status: 'looks alll riiiight!' });
    next();
  });

  const server = http.createServer(app);
  server.listen(process.env.PORT || 9000, () => {
    console.log(`Server started on port 9000`);
  });
}
