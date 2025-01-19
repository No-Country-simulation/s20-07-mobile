import { User } from '@prisma/client';
import db from '../common/db';

enum ProductType {
  PREDEFINEDPIZZA = 'predefinedPizza',
  CUSTOMPIZZA = 'customPizza',
  DRINK = 'drink',
}

interface CartItem {
  id: number;
  price: number;
  type: ProductType;
  quantity: number;
}

export const createOrder = async (cart: CartItem[], userId: number, discount?: number) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const predefinnedPizzas = cart.filter((item) => item.type === ProductType.PREDEFINEDPIZZA);
  const customPizzas = cart.filter((item) => item.type === ProductType.CUSTOMPIZZA);
  const drinks = cart.filter((item) => item.type === ProductType.DRINK);

  console.log(userId);

  discount = discount ?? 0;

  const { id } = await db.order.create({
    data: {
      userId,
      totalPrice: total,
      discount,
    },
  });

  if (predefinnedPizzas.length) {
    const orderItemsPromises = predefinnedPizzas.map((item) =>
      db.orderItem.create({
        data: {
          orderId: id,
          predefinedPizzaId: item.id,
          price: item.price,
          quantity: item.quantity,
        },
      }),
    );

    await Promise.all(orderItemsPromises);
  }

  if (customPizzas.length) {
    const orderItemsPromises = customPizzas.map((item) =>
      db.orderItem.create({
        data: {
          orderId: id,
          customPizzaId: item.id,
          price: item.price,
          quantity: item.quantity,
        },
      }),
    );
    await Promise.all(orderItemsPromises);
  }

  if (drinks.length) {
    const orderItemsPromises = drinks.map((item) =>
      db.orderItem.create({
        data: {
          orderId: id,
          drinkId: item.id,
          price: item.price,
          quantity: item.quantity,
        },
      }),
    );
    await Promise.all(orderItemsPromises);
  }

  return { id, total };
};
