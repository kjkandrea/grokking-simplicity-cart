import {Cart as CartData, CartItem} from './data/cart';
import swallowCopy from '../utils/swallowCopy';
import {CartTotalRenderer} from './index';
import array from '../utils/array';

export class Cart {
  private cart: CartData;
  private cartTotalRenderer: CartTotalRenderer;

  constructor(rootElement: HTMLElement, cartData: CartData) {
    this.cart = cartData;
    this.cartTotalRenderer = new CartTotalRenderer(rootElement);
    this.cartTotalRenderer.render(this.totalPrice);
  }

  get totalPrice() {
    return this.pluckCart('price').reduce((a, b) => a + b);
  }

  private nextCallback?: (cart: CartData) => void;
  public subscribe(callback: (cart: CartData) => void) {
    this.nextCallback = callback;
  }

  private next() {
    this.nextCallback?.(this.cart);
  }

  // 함수 이름에 있는 암묵적 인자 드러내기
  public setCartItemFieldBy<FieldName extends keyof CartItem>(
    cartItemName: string,
    fieldName: FieldName,
    value: CartItem[FieldName]
  ) {
    const newCart = swallowCopy.copy(this.cart);
    if (!newCart[cartItemName])
      throw Error('존재하지 않는 cartItemName 입니다.');
    newCart[cartItemName] = swallowCopy.objectSet(
      newCart[cartItemName],
      fieldName,
      value
    );
    this.cart = newCart;

    this.next();
    if (fieldName === 'price') this.rerenderCartTotalElement();
  }

  private rerenderCartTotalElement() {
    this.cartTotalRenderer.rerender(this.totalPrice);
  }

  // 본문을 콜백으로 바꾸기
  private pluckCart<K extends keyof CartItem>(fieldName: K) {
    return array.pluck<CartItem, K>(Object.values(this.cart), fieldName);
  }
}

export default function setup(rootElement: HTMLElement, cartData: CartData) {
  return new Cart(rootElement, cartData);
}
