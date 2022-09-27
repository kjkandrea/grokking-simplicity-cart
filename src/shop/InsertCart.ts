import Subscribe from '../utils/Subscribe';
import {MiniCartProduct} from './views/MiniCartRenderer';
import {Product} from './data/products';
import {cost_ajax} from './api/dummyProductAPI';
import {shipping_ajax} from './api/dummyBuyAPI';

type UpdateTotalDOM = (total: number) => void;

// 함수형 코딩 444장. 버그 해결
// TODO: 이런거 타입을 어떻게 지정해야할지 햇갈림.. 이건 다른 책으로 공부
function Queue<Arguments extends any[]>(worker: Function) {
  const queue_items: Arguments[] = [];
  let working = false;

  function runNext() {
    if (working) return;
    working = true;
    const item = queue_items.shift();
    if (!item) return;

    worker(...item, () => {
      working = false;
      runNext();
    });
  }

  return function (...arg: Arguments) {
    queue_items.push(arg);
    setTimeout(() => runNext(), 0); // 이벤트 루프에 작업을 추가합니다.
  };
}

export class InsertCart extends Subscribe<MiniCartProduct[]> {
  constructor(miniCartProducts: MiniCartProduct[]) {
    super(miniCartProducts);
  }

  private calc_cart_worker(
    cart: MiniCartProduct[],
    done: (total: number) => void,
    update_total_dom: UpdateTotalDOM
  ) {
    this.calc_cart_total(cart, total => {
      update_total_dom(total);
      done(total);
    });
  }

  public update_total_queue = Queue(this.calc_cart_worker.bind(this));

  public calc_cart_total(
    cart: MiniCartProduct[],
    update_total_dom: UpdateTotalDOM
  ) {
    let total = 0;
    cost_ajax(cart, cost => {
      total = cost;
      shipping_ajax(cart, shipping => {
        total += shipping;
        update_total_dom(total);
      });
    });
  }

  public setProduct(product: Product) {
    const includeIndex = this.miniCartProducts.findIndex(
      prod => prod.name === product.name
    );

    if (includeIndex >= 0) {
      const newProducts = [...this.miniCartProducts];
      const product = newProducts[includeIndex];
      if (!product) return;
      product.quantity += 1;
      this.miniCartProducts = newProducts;
    } else {
      this.miniCartProducts = [
        ...this.miniCartProducts,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    this.next();
  }

  public get miniCartProducts() {
    return [...this.data];
  }

  private set miniCartProducts(miniCartProducts: MiniCartProduct[]) {
    this.data = miniCartProducts;
  }

  // api 없는 javascript 네이티브 구현
  // get totalPrice() {
  //   return this.miniCartProducts.reduce((total, product) => {
  //     total += product.price * product.quantity;
  //     return total;
  //   }, 0);
  // }
}

export default function setup(miniCartProducts: MiniCartProduct[]) {
  return new InsertCart(miniCartProducts);
}
