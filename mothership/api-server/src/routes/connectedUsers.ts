import { NextFunction, Request, Response } from 'express';

import { publisher } from '../redis';


const connectedusers = {
  get: (req: Request, res: Response, next: NextFunction) => {
    publisher.keys('connectedUsers:*', (err, userKeys) => {
      if (err) { next(err); }
      // userKeys.forEach(key => {
      //   publisher.hgetall(key, (err, response) => {
      //     console.log(response)
      //   })
      // })
      res.json(userKeys)
    });
  },
}

export default connectedusers;