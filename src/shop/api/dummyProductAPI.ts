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
  testTime: number = Math.max(300, Math.random() * 2000) // 인자 없을 시 300 ~ 2000 ms
) => {
  const cost = getCost(cart);
  setTimeout(() => callback(cost), testTime);
};
