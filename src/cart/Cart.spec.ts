import {Cart} from './Cart';

const DOMTestRootElement = document.createElement('div');

describe('Cart', () => {
  describe('totalPrice 는', () => {
    it('CartData 의 price 의 합계이다.', () => {
      const cartData = {
        shoes: {
          price: 1000,
          quantity: 1,
          shipping: 'seoul',
        },
        tShort: {
          price: 1500,
          quantity: 2,
          shipping: 'my company',
        },
      };
      const cart = new Cart(DOMTestRootElement, cartData);

      expect(cart.totalPrice).toBe(1000 + 1500);
    });
  });
});
