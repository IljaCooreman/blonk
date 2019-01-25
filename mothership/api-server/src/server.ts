import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';


import { isAuthorized } from './middleware/auth';
import { cors } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { authController } from './routes/authController';
import connectedusers from './routes/connectedUsers';


export default function apiServer() {

  const app = express();

  app.use(cors);
  app.use(bodyParser.json());


  app.post('/auth', authController);

  app.get('/', isAuthorized, (req, res, next) => {
    res.status(200).json({ status: 'looks alll riiiight!' });
    next();
  });

  app.get('/connectedUsers', isAuthorized, connectedusers.get)

  app.use(errorHandler);

  const server = http.createServer(app);
  server.listen(process.env.PORT || 9000, () => {
    console.log(`Server started on port 9000`);
  });
}
