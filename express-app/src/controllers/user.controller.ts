import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { registerUser, loginUser } from '../services/user.service';

export const login = async (
  req: Request<
    unknown,
    unknown,
    {
      email: string;
      password: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  /*   if (!email || !password) {
    return res.status(400).json({ message: 'El email y la contraseña son requeridos' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email no válido.' });
  } */

  try {
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, email: user.email });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Error - CREATE USER ]: ${error.message}`);
      next(httpError);
    }
  }
};

export const register = async (
  req: Request<
    unknown,
    unknown,
    {
      email: string;
      password: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  /* if (!email || !password) {
    return res.status(400).json({ message: 'El email y la contraseña son requeridos' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email no válido.' });
  } */

  try {
    const token = await registerUser(email, password);
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      const httpError = createHttpError(500, `[Error - REGISTER]: ${error.message}`);
      next(httpError);
    }
  }
};
