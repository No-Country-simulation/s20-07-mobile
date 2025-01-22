import db from '../common/db';

export const getDrinks = async () => {
    const drinks = await db.drink.findMany({});
    return drinks;
}

export const getDrinkById = async (id: number) => {
    const drink = await db.drink.findFirst({
        where: { id },
    })
    return drink;
}

export const createDrink = async (
    drink: {
        name: string,
        content: string,
        price: number,
        image: string,
        isAlcoholic: boolean,
        type: string
    }) => {

    const newDrink = await db.drink.create({
        data: {
            ...drink,
        }
    })

    return newDrink
}

export const updateDrink = async (
    id: number,
    drink: {
        name?: string,
        content?: string,
        price?: number,
        image?: string,
        isAlcoholic?: boolean,
        type?: string
    }) => {

    const updateDrink = await db.drink.update({
        where: { id },
        data: {
            ...drink
        }
    });

    return updateDrink;
}

export const removeDrink = async (id: number) => {

    const drinkExists = await db.drink.findUnique({
        where: { id },
    });

    if (!drinkExists) {
        throw new Error(`No se encontró el registro con ID ${id}`);
    }

    const delteDrink = await db.drink.delete({
        where: { id },
    });

    return delteDrink;
}