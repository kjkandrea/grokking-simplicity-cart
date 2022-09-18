import {Cart as CartData, CartItem} from './data/cart';
import swallowCopy from '../utils/swallowCopy';
import {CartRenderer, CartTotalRenderer} from './index';

export class Cart {
  private cart: CartData;
  private cartRenderer: CartRenderer;
  private cartTotalRenderer: CartTotalRenderer;

  constructor(rootElement: HTMLElement, cartData: CartData) {
    this.cart = cartData;
    this.cartRenderer = new CartRenderer(rootElement);
    this.cartTotalRenderer = new CartTotalRenderer(rootElement);
    this.cartRenderer.render(this.cart);
    this.cartTotalRenderer.render(this.totalPrice);
  }

  get totalPrice() {
    return this.mapCart(cartItem => cartItem.price).reduce((a, b) => a + b);
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

    this.rerenderCartItemElement(cartItemName);
    if (fieldName === 'price') this.rerenderCartTotalElement();
  }

  private rerenderCartItemElement(cartItemName: string) {
    this.cartRenderer.rerenderCartItemElement(
      cartItemName,
      this.cart[cartItemName]
    );
  }

  private rerenderCartTotalElement() {
    this.cartTotalRenderer.rerender(this.totalPrice);
  }

  // 본문을 콜백으로 바꾸기
  private mapCart<U>(mapper: (cartItem: CartItem) => U) {
    return Object.values(this.cart).map(mapper);
  }
}

export default function setup(rootElement: HTMLElement, cartData: CartData) {
  return new Cart(rootElement, cartData);
}