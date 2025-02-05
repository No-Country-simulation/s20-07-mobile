import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../common/db';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1] || null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'your_secret_key') as jwt.JwtPayload;
      const id = decoded.id;
      const user = await db.user.findFirst({ where: { id } });
      req.user = user;
    } catch (error) {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};

export default authMiddleware;
