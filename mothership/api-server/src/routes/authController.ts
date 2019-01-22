import { NextFunction, Request, Response } from 'express';
import { isArray, promisify } from 'util';
import * as uuid from 'uuid';

import { publisher } from '../redis';
const asyncHgetall = promisify(publisher.hgetall).bind(publisher);

export const authController = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || !req.body.entryCode || !isArray(req.body.entryCode)) {
    return res
      .status(400)
      .json({ error: 'D.E.N.I.E.D., Denied! No code provided.' });
  }

  if (!publisher.connected) { next(new Error('Server is not connected to Redis.')) };


  const tokens = await asyncHgetall('satTokens');
  if (!tokens) {
    return res
      .status(500)
      .json({ error: 'No satellites connected right now.' });
  };

  const satelliteId = Object.keys(tokens).find(key => {
    const purifiedBodyCode = JSON.stringify(req.body.entryCode).replace(/\s+/g, '');
    return tokens[key] === purifiedBodyCode;
  });

  if (satelliteId) {
    // store token in redis.
    const token = uuid.v4();
    publisher.set(token, satelliteId, 'EX', 2 * 60 * 60); // token expires after 2hours (2 * 3600 sec)

    res.status(201);
    res.json({
      group: satelliteId.split(':')[0],
      satelliteId,
      token,
    });
  } else {
    return res
      .status(401)
      .json({ error: 'D.E.N.I.E.D., Denied! Wrong code. Try again' })
  }
};
