import {InsertCart} from './InsertCart';

describe('InsertCart', () => {
  describe('calc_cart_total', () => {
    const shoes = {name: 'shoes', price: 6};

    it('$6 상품을 담으면 상품가 $6 + 배송비 $2 로 총 total은 $8 이다.', () => {
      const insertCart = new InsertCart([]);
      insertCart.setProduct(shoes);
      insertCart.calc_cart_total(insertCart.miniCartProducts, total =>
        expect(total).toBe(8)
      );
    });

    describe('타임라인 테스트', () => {
      // calc_cart_total 는 callback 형식이나 다중 테스트를 위해 Promise 규약으로 형식 래핑
      const goTest = () => {
        const insertCart = new InsertCart([]);
        let insertCount = 0;

        return new Promise(resolve => {
          const interval = setInterval(() => {
            insertCount += 1;
            insertCart.setProduct(shoes);

            if (insertCount > 1) {
              insertCart.calc_cart_total(insertCart.miniCartProducts, total =>
                resolve(total)
              );
              clearInterval(interval);
            } else {
              insertCart.calc_cart_total(insertCart.miniCartProducts, () => {});
            }
          }, 50);
        });
      };

      it('$6 상품을 연속으로 2번 담으면 상품가 $12 + 배송비 $2 로 총 total은 $14 이다.', done => {
        goTest().then(total => {
          expect(total).toBe(14);
          done();
        });
      });

      const COUNT = 100;
      it(`${COUNT}번 테스트해도 결과는 동일하다.`, done => {
        const rightTotals = Array.from({length: COUNT}, () => 14);

        Promise.all(Array.from({length: COUNT}, () => goTest())).then(
          totals => {
            expect(totals).toEqual(rightTotals);
            done();
          }
        );
      });
    });
  });
});
