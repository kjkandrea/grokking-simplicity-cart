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
    const wrapperElement = document.createElement('dl');
    const template = `
			<dt>name</dt>
      <dd>${cartItemName}</dd>
			<dt>price</dt>
      <dd>${cartItem.price}</dd>
      <dt>quantity</dt>
      <dd>${cartItem.quantity}</dd>
      <dt>shipping</dt>
      <dd>${cartItem.shipping}</dd>
      <dt>options</dt>
      <dd>${
        cartItem?.options
          ? Object.entries(cartItem.options)
              .map(
                ([optionName, optionValue]) => `${optionName} : ${optionValue}`
              )
              .join(' | ')
          : '없음'
      }</dd>
		`;

    wrapperElement.insertAdjacentHTML('beforeend', template);
    return wrapperElement;
  }

  private setElementByItemName(element: HTMLElement, itemName: string) {
    element.dataset.itemName = itemName;
  }
}
