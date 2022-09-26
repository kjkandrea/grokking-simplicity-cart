import {MiniCartProduct} from '../views/MiniCartRenderer';

const getShipping = (miniCartProducts: MiniCartProduct[]) => {
  return miniCartProducts.length * 2;
};

export const shipping_ajax = (
  cart: MiniCartProduct[],
  callback: (shipping: number) => void,
  testTime: number = Math.max(300, Math.random() * 2000) // 인자 없을 시 300 ~ 2000 ms
) => {
  const cost = getShipping(cart);
  setTimeout(() => callback(cost), testTime);
};
