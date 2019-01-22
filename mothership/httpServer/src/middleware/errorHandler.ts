import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('error handler activated')
  if (res.headersSent) {
    console.log('headersSent')
    return next(err)
  }
  res.status(500)
  res.json({ error: err.message })
};

