import { NextFunction, Request, Response } from 'express';

import { publisher } from '../redis';

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
    // const err = new Error('No credentials set!');
    // return next(err);
  }
  publisher.get(req.headers.authorization, (error, satId) => {
    if (error) {
      return next(error);
    } else {
      if (!satId) {
        // const err = new Error('Not authorized! Go back!');
        return res.status(400).json({ error: 'Not authorized! Go back!' });
      } else {
        return next();
      }
    }
  });
}
