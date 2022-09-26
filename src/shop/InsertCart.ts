import Subscribe from '../utils/Subscribe';
import {MiniCartProduct} from './views/MiniCartRenderer';
import {Product} from './data/products';
import {cost_ajax} from './api/dummyProductAPI';
import {shipping_ajax} from './api/dummyBuyAPI';

export class InsertCart extends Subscribe<MiniCartProduct[]> {
  constructor(miniCartProducts: MiniCartProduct[]) {
    super(miniCartProducts);
  }

  // 함수형 코딩 394장. 타임라인 버그 해결 적용.
  public calc_cart_total(
    cart: MiniCartProduct[],
    update_total_dom: (total: number) => void
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
