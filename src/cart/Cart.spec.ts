import {Cart} from './Cart';

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
      const cart = new Cart(cartData);

      expect(cart.totalPrice).toBe(1000 * 1 + 1500 * 2);
    });
  });

  // TODO: immediateDeliverable 테스트 작성
  describe('immediateDeliverable 는', () => {});
});
