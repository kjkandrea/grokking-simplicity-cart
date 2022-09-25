import {Cart} from './Cart';
import {Cart as CartData} from './data/cart';

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
  describe('immediateDeliverable 는', () => {
    it('즉시배송 가능 : true 인 상품들만 반환한다.', () => {
      const cartData: CartData = {
        shoes: {
          price: 1000,
          quantity: 1,
          shipping: 'seoul',
          immediateDeliverable: true,
        },
        tShort: {
          price: 1500,
          quantity: 2,
          shipping: 'my company',
        },
      };

      const {immediateDeliverableCart} = new Cart(cartData);
      const immediateDeliverableCartList = Object.values(
        immediateDeliverableCart
      );

      expect(
        immediateDeliverableCartList.every(
          cartItem => cartItem.immediateDeliverable
        )
      ).toBe(true);
    });
  });
});
