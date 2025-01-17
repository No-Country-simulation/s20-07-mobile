import { Request, Response, NextFunction, response } from "express";
import createHttpError from "http-errors";

import {
    getSizes,
    getSizeById,
    createSize,
    updateSize,
    removeSize,
} from '../services/size.service';


export const getAll = async (
    _req: Request<unknown, unknown, unknown>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const sizes = await getSizes();
        res.status(200).json({
            sizes,
        });
    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[sizes -GET ALL]: ${error.message}`);
            next(httpError)
        }
    }
}

export const getById = async (
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    try {
        const size = await getSizeById(Number(id));
        res.status(200).json({
            size,
        })

    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[Size -GET ALL]: ${error.message}`);
            next(httpError);
        }
    }
}

export const create = async (
    req: Request<unknown, unknown, { name: string; basePrice: number, cm: number }>,
    res: Response,
    next: NextFunction,
) => {


    const { name, basePrice, cm } = req.body;

    try {
        const newSize = await createSize({ name, basePrice, cm });
        res.status(201).json({
            size: newSize,
        });

    } catch (error) {

        if (error instanceof Error) {
            const httpError = createHttpError(500, `[Size - CREATE]: ${error.message}`);
            next(httpError);
        }
    }

}

export const update = async (
    req: Request<{ id: string }, unknown, { name: string, basePrice: number, cm: number }>,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    const { name, basePrice, cm } = req.body;

    try {

        const updatedSize = await updateSize(Number(id), { name, basePrice, cm });
        res.status(200).json({
            size: updatedSize,
        });
    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[Size - UPDATE]: ${error.message}`);
            next(httpError);
        }
    }

}

export const remove = async (
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    try {

        await removeSize(Number(id));
        res.status(204).send();

    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[Size - DELETE]: ${error.message}`);
            next(httpError);
        }
    }

}


