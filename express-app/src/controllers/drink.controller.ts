import { Request, Response, NextFunction, response } from "express";
import createHttpError from "http-errors";

import {
    getDrinks,
    getDrinkById,
    createDrink,
    updateDrink,
    removeDrink,

} from '../services/drink.service';

export const getAll = async (
    _req: Request<unknown, unknown, unknown>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const drinks = await getDrinks();
        res.status(200).json({
            drinks
        });
    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[DRINKS -GET ALL]: ${error.message}`);
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
        const drink = await getDrinkById(Number(id));
        res.status(200).json({
            drink,
        })
    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[DRINK -GET BY ID ]: ${error.message}`);
            next(httpError);
        }
    }

}

export const create = async (
    req: Request<unknown, unknown, {
        name: string,
        content: string,
        price: number,
        image: string,
        isAlcoholic: boolean,
        type: string
    }>,
    res: Response,
    next: NextFunction,
) => {

    const {
        name,
        content,
        price,
        image,
        isAlcoholic,
        type
    } = req.body;

    try {
        const newDrink = await createDrink({
            name,
            content,
            price,
            image,
            isAlcoholic,
            type
        });
        res.status(201).json({
            drink: newDrink,
        });

    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[DRINK - CREATE]: ${error.message}`);
            next(httpError);
        }
    }
}


export const update = async (
    req: Request<{ id: string }, unknown, {
        name: string,
        content: string,
        price: number,
        image: string,
        isAlcoholic: boolean,
        type: string
    }>,
    res: Response,
    next: NextFunction,
) => {

    const { id } = req.params;
    const {
        name,
        content,
        price,
        image,
        isAlcoholic,
        type
    } = req.body;

    try {
        const updatedDrink = await updateDrink(Number(id), {
            name,
            content,
            price,
            image,
            isAlcoholic,
            type
        });

        res.status(200).json({
            drink: updatedDrink
        })
    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[DRINK - UPDATE]: ${error.message}`);
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
        await removeDrink(Number(id));
        res.status(204).send()
    } catch (error) {
        if (error instanceof Error) {
            const httpError = createHttpError(500, `[DRINK - DELETE]: ${error.message}`);
            next(httpError);
        }
    }
}