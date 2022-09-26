import Subscribe from '../utils/Subscribe';
import {MiniCartProduct} from './views/MiniCartRenderer';
import {Product} from './data/products';

export class InsertCart extends Subscribe<MiniCartProduct[]> {
  constructor(miniCartProducts: MiniCartProduct[]) {
    super(miniCartProducts);
  }

  public setProduct(product: Product) {
    console.log(product);
  }

  private get miniCartProducts() {
    return this.data;
  }

  private set miniCartProducts(miniCartProducts: MiniCartProduct[]) {
    this.data = miniCartProducts;
  }

  get totalPrice() {
    return this.miniCartProducts.reduce((total, product) => {
      total += product.price * product.quantity;
      return total;
    }, 0);
  }
}

export default function setup(miniCartProducts: MiniCartProduct[]) {
  return new InsertCart(miniCartProducts);
}
