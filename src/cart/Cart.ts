import {Cart as CartData, CartItem} from './data/cart';
import object from '../utils/object';
import Subscribe from '../utils/Subscribe';
import {Options} from '../shop/data/products';

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

  // 기억할 것이 너무 많을 때에는, (가령 option 을 찾으려면 3층 탕색이 필요함)
  // 추상화의 벽을 통해 세부사항을 숩긴다.
  public setCartItemOptionBy<OptionName extends string>(
    cartItemName: string,
    optionName: OptionName,
    optionValue: Options[OptionName]
  ) {
    this.cartData = object.nestedUpdate(
      this.cartData,
      [cartItemName, 'options', optionName], // 옵션을 변경하려면 options 를 탐색해야 한단건 세부사항이다.
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

export function setup(cartData: CartData) {
  return new Cart(cartData);
}
