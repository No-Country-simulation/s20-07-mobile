import db from '../common/db';

export const getSizes = async () => {
    const sizes = await db.size.findMany({});
    return sizes;
}

export const getSizeById = async (id: number) => {
    const size = await db.size.findFirst({
        where:{id},
    })
    return size;
}

export const createSize = async (
    size: {
        name: string,
        basePrice: number,
        cm: number
    }) => {

    const newSize = await db.size.create ({
        data:{...size}
    })

    return newSize;

}

export const updateSize = async (
    id: number,
    size: {
        name?: string, 
        basePrice?: number,
        cm?:number
    }) => {

    const updateSize = await db.size.update({
        where: {id },
        data: { ...size},
    });
    
    return updateSize;
}

export const removeSize = async(id: number) => {
    const deleteSize = await db.size.delete({
        where:{ id },
    });

    return deleteSize;
}