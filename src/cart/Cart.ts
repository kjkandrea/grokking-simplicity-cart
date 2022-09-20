import {Cart as CartData, CartItem} from './data/cart';
import swallowCopy from '../utils/swallowCopy';
import Subscribe from '../utils/Subscribe';

export class Cart extends Subscribe<CartData> {
  constructor(cartData: CartData) {
    super(cartData);
  }

  get cartData() {
    return this.data;
  }

  set cartData(cartData: CartData) {
    this.data = cartData;
  }

  get totalPrice() {
    return this.mapCart(({price, quantity}) => price * quantity).reduce(
      (a, b) => a + b
    );
  }

  // 함수 이름에 있는 암묵적 인자 드러내기
  public setCartItemFieldBy<FieldName extends keyof CartItem>(
    cartItemName: string,
    fieldName: FieldName,
    value: CartItem[FieldName]
  ) {
    const newCart = swallowCopy.copy(this.cartData);
    if (!newCart[cartItemName])
      throw Error('존재하지 않는 cartItemName 입니다.');
    newCart[cartItemName] = swallowCopy.objectSet(
      newCart[cartItemName],
      fieldName,
      value
    );
    this.cartData = newCart;

    this.next();
  }

  // NOTE : pluck 기능 구현. 후에 사용할 것으로 예상되어 주석처리 해 둠
  // private pluckCart<K extends keyof CartItem>(fieldName: K) {
  //   return array.pluck<CartItem, K>(Object.values(this.cart), fieldName);
  // }

  // 본문을 콜백으로 바꾸기
  private mapCart<U>(mapper: (cartItem: CartItem) => U) {
    return Object.values(this.cartData).map(mapper);
  }
}

export default function setup(cartData: CartData) {
  return new Cart(cartData);
}
