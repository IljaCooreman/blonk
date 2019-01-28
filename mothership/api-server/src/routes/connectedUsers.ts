import { NextFunction, Request, Response } from 'express';

import { publisher } from '../redis';


const connectedUsers = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    publisher.keys('connectedUsers:*', (err, userKeys) => {
      if (err) { next(err); }
      res.json(userKeys.map(key => {
        return key.split(':')[1];
      }))
    });
  },
  getSingle: (req: Request, res: Response, next: NextFunction) => {
    publisher.hgetall(`connectedUsers:${req.params.userId}`, (err, user) => {
      if (err) { next(err); }
      res.json(user)
    });
  },
}

export default connectedUsers;