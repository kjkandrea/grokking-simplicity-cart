import {MiniCartProduct} from '../views/MiniCartRenderer';

const getCost = (miniCartProducts: MiniCartProduct[]) => {
  return miniCartProducts.reduce((total, product) => {
    total += product.price * product.quantity;
    return total;
  }, 0);
};

export const cost_ajax = (
  cart: MiniCartProduct[],
  callback: (cost: number) => void,
  testTime = 5
) => {
  const cost = getCost(cart);
  setTimeout(() => callback(cost), testTime);
};
