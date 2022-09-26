import {InsertCart} from './InsertCart';

describe('InsertCart', () => {
  describe('calc_cart_total', () => {
    const shoes = {name: 'shoes', price: 6};

    it('$6 상품을 담으면 상품가 $6 + 배송비 $2 로 총 total은 $8 이다.', () => {
      const insertCart = new InsertCart([]);
      insertCart.setProduct(shoes);
      insertCart.calc_cart_total(total => expect(total).toBe(8));
    });

    describe('타임라인 테스트', () => {
      it('$6 상품을 연속으로 2번 담으면 상품가 $12 + 배송비 $2 로 총 total은 $14 이다.', done => {
        const insertCart = new InsertCart([]);
        let insertCount = 0;

        const interval = setInterval(() => {
          insertCount += 1;
          insertCart.setProduct(shoes);

          if (insertCount > 1) {
            insertCart.calc_cart_total(total => {
              expect(total).toBe(14);
              done();
            });
            clearInterval(interval);
          } else {
            insertCart.calc_cart_total(() => {});
          }
        }, 50);
      });

      // it('100번 테스트해도 결과는 동일하다.', done => {
      //   const insertCart = new InsertCart([]);
      //   const totals: number[] = [];
      //
      //   const goTest = () =>
      //     new Promise(resolve => {
      //       let insertCount = 0;
      //
      //       const interval = setInterval(() => {
      //         insertCount += 1;
      //         insertCart.setProduct(shoes);
      //
      //         if (insertCount > 1) {
      //           insertCart.calc_cart_total(total => totals.push(total));
      //           clearInterval(interval);
      //           resolve(true);
      //         }
      //       }, 50);
      //     });
      //
      //   Promise.all(Array.from({length: 100}, () => goTest())).then(() => {
      //     expect(totals.every(total => total === 14)).toBe(false);
      //     done();
      //   });
      // });
    });
  });
});
