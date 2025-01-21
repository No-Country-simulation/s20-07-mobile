import { Request, Response, NextFunction } from "express";
import createHttpError from 'http-errors';

import { registerUser, loginUser } from '../services/user.service';



export const login = async (
    req: Request<unknown, unknown, {
        email: string;
        password: string
    }>,
    res: Response,
    next: NextFunction,
) => {

    const { email, password } = req.body;
    
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ token });

    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[Error - CREATE USER ]: ${error.message}`);
            next(httpError);
        }
    }
}

export const register = async (
    req: Request<unknown, unknown, {
        email: string;
        password: string
    }>,
    res: Response,
    next: NextFunction,
) => {

    const { email, password } = req.body;

    try {
        const token = await registerUser(email, password);
        res.status(201).json({ token });

    } catch (error) {
        if (error instanceof Error) {
          const httpError = createHttpError(500, `[Error - REGISTER]: ${error.message}`);
          next(httpError);
        }
      }

}