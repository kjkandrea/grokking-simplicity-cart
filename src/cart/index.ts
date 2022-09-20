import {Cart as CartData, CartItem} from './data/cart';
export {Cart} from './Cart';

export class CartRenderer {
  private readonly rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  public render(cartData: CartData) {
    this.rootElement.innerHTML = '';
    this.rootElement.append(this.generateCartHTMLElement(cartData));
  }

  private generateCartHTMLElement(cartData: CartData) {
    const wrapperElement = document.createElement('ul');

    Object.entries(cartData)
      .map(([cartItemName, cartItem]) =>
        this.generateCartItemHTMLElement(cartItemName, cartItem)
      )
      .forEach(cartItem => wrapperElement.appendChild(cartItem));

    return wrapperElement;
  }

  private generateCartItemHTMLElement(
    cartItemName: string,
    cartItem: CartItem
  ) {
    const itemElement = document.createElement('li');
    this.setElementByItemName(itemElement, cartItemName);

    itemElement.textContent = this.generateCartItemTextContent(
      cartItemName,
      cartItem
    );

    return itemElement;
  }

  private generateCartItemTextContent(
    cartItemName: string,
    cartItem: CartItem
  ) {
    return `
			name: ${cartItemName},
			price: ${cartItem.price},
			quantity: ${cartItem.quantity},
			shipping: ${cartItem.shipping},
		`;
  }

  private setElementByItemName(element: HTMLElement, itemName: string) {
    element.dataset.itemName = itemName;
  }
}

export class CartTotalRenderer {
  private readonly rootElement: HTMLElement;
  private readonly priceElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.priceElement = document.createElement('span');
  }

  public render(totalPrice: number) {
    this.rootElement.innerHTML = '';
    this.rootElement.append(this.generateCartTotalHTMLElement(totalPrice));
  }

  private generateCartTotalHTMLElement(totalPrice: number) {
    const wrapperElement = document.createElement('div');
    wrapperElement.textContent = 'total price : ';
    wrapperElement.append(this.priceElement);

    this.priceElement.textContent = String(totalPrice);

    return wrapperElement;
  }
}
