import {Cart as CartData, CartItem, Options} from './data/cart';
import object from '../utils/object';
import Subscribe from '../utils/Subscribe';

export class Cart extends Subscribe<CartData> {
  constructor(cartData: CartData) {
    super(cartData);
  }

  get totalPrice() {
    return this.mapCart(({price, quantity}) => price * quantity).reduce(
      (a, b) => a + b
    );
  }

  get immediateDeliverableCart() {
    const immediateDeliverableCartItemEntries = Object.entries(
      this.cartData
    ).filter(([_, cartItem]) => cartItem.immediateDeliverable);

    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    return Object.fromEntries(immediateDeliverableCartItemEntries);
  }

  private get cartData() {
    return this.data;
  }

  private set cartData(cartData: CartData) {
    this.data = cartData;
  }

  // 함수 이름에 있는 암묵적 인자 드러내기
  public setCartItemFieldBy<FieldName extends keyof CartItem>(
    cartItemName: string,
    fieldName: FieldName,
    value: CartItem[FieldName]
  ) {
    this.cartData = object.nestedUpdate(
      this.cartData,
      [cartItemName, fieldName],
      () => value
    );

    this.next();
  }

  public setCartItemOptionBy<OptionName extends string>(
    cartItemName: string,
    optionName: OptionName,
    optionValue: Options[OptionName]
  ) {
    this.cartData = object.nestedUpdate(
      this.cartData,
      [cartItemName, 'options', optionName],
      () => optionValue
    );

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
