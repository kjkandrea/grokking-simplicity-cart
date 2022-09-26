import {MiniCartProduct} from '../views/MiniCartRenderer';

const getShipping = (miniCartProducts: MiniCartProduct[]) => {
  return miniCartProducts.length * 2;
};

export const shipping_ajax = (
  cart: MiniCartProduct[],
  callback: (shipping: number) => void,
  testTime: number = Math.max(5, Math.floor(Math.random() * 50)) // 인자 없을 시 5 ~ 50 ms
) => {
  const cost = getShipping(cart);
  setTimeout(() => callback(cost), testTime);
};
