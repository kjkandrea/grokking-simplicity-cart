import AbstractRenderer from '../../abstracts/AbstractRenderer';
import {Cart as CartData, CartItem} from '../data/cart';
import {Options} from '../../shop/data/products';

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

    itemElement.append(this.generateCartItemElement(cartItemName, cartItem));

    return itemElement;
  }

  private generateCartItemElement(cartItemName: string, cartItem: CartItem) {
    const wrapperElement = document.createElement('div');
    const template = `
      ${this.generateFieldTemplate('name', cartItemName)}
      ${this.generateFieldTemplate('price', cartItem.price)}
      ${this.generateFieldTemplate('quantity', cartItem.quantity)}
      ${this.generateFieldTemplate('shipping', cartItem.shipping)}
      ${this.generateFieldTemplate(
        'options',
        cartItem?.options
          ? this.generateCartItemOptionTemplate(cartItem.options)
          : '없음'
      )}
		`;

    wrapperElement.insertAdjacentHTML('beforeend', template);
    return wrapperElement;
  }

  private generateFieldTemplate(fieldName: string, value: string | number) {
    return `
      <dl>
        <dt>${fieldName}</dt>
        <dd>${value}</dd>
      </dl>
    `;
  }

  private generateCartItemOptionTemplate(options: Options) {
    return Object.entries(options)
      .map(([optionName, optionValue]) =>
        this.generateFieldTemplate(optionName, optionValue)
      )
      .join('');
  }

  private setElementByItemName(element: HTMLElement, itemName: string) {
    element.dataset.itemName = itemName;
  }
}
