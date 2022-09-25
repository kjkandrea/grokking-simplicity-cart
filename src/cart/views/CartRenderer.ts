import AbstractRenderer from '../../abstracts/AbstractRenderer';
import {Cart as CartData, CartItem} from '../data/cart';

export class CartRenderer implements AbstractRenderer {
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

    itemElement.append(this.generateCartItemContent(cartItemName, cartItem));

    return itemElement;
  }

  private generateCartItemContent(cartItemName: string, cartItem: CartItem) {
    return `
			name: ${cartItemName},
			price: ${cartItem.price},
			quantity: ${cartItem.quantity},
			shipping: ${cartItem.shipping},
			options: ${
        cartItem?.options
          ? Object.entries(cartItem.options)
              .map(
                ([optionName, optionValue]) => `${optionName} : ${optionValue}`
              )
              .join(' | ')
          : '없음'
      }
		`;
  }

  private setElementByItemName(element: HTMLElement, itemName: string) {
    element.dataset.itemName = itemName;
  }
}
