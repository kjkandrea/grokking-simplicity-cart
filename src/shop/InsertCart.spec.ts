import {InsertCart} from './InsertCart';

describe('InsertCart', () => {
  describe('calc_cart_total', () => {
    it('$6 상품을 담으면 상품가 $6 + 배송비 $2 로 총 total은 $8 이다.', () => {
      const insertCart = new InsertCart([]);
      const shoes = {name: 'shoes', price: 6};
      insertCart.setProduct(shoes);
      insertCart.calc_cart_total(total => expect(total).toBe(8));
    });
  });
});
