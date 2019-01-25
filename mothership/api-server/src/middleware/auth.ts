import { NextFunction, Request, Response } from 'express';

import { publisher } from '../redis';

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  publisher.hgetall(`connectedUsers:${req.headers.authorization}`, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (!data) {
        return res.status(400).json({ error: 'Not authorized! Go back!' });
      } else {
        return next();
      }
    }
  });
}
