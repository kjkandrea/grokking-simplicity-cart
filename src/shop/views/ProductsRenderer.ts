import AbstractRenderer from '../../abstracts/AbstractRenderer';
import {Product} from '../data/products';
import {OnEmit} from '../../utils/OnEmit';

export class ProductsRenderer extends OnEmit implements AbstractRenderer {
  private readonly rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    super();
    this.rootElement = rootElement;
  }

  public render(products: Product[]) {
    this.rootElement.innerHTML = '';
    this.rootElement.append(this.generateProductsHTMLElement(products));
  }

  private generateProductsHTMLElement(products: Product[]) {
    const wrapperElement = document.createElement('ul');

    products
      .map(product => this.generateProductItemHTMLElement(product))
      .forEach(cartItem => wrapperElement.appendChild(cartItem));

    return wrapperElement;
  }

  private generateProductItemHTMLElement(product: Product) {
    const itemElement = document.createElement('li');
    const textElement = document.createElement('p');
    textElement.textContent = `name: ${product.name}, price: $${product.price}`;
    itemElement.append(textElement);
    itemElement.append(this.generateBuyNowButtonElement(product));

    return itemElement;
  }

  private generateBuyNowButtonElement(product: Product) {
    const buyNowElement = document.createElement('button');
    buyNowElement.type = 'button';
    buyNowElement.textContent = 'Buy Now';
    this.bindBuyNowButtonEvent(buyNowElement, product);

    return buyNowElement;
  }

  private bindBuyNowButtonEvent(
    buyNowElement: HTMLButtonElement,
    product: Product
  ) {
    buyNowElement.addEventListener('click', () =>
      this.emit('@click:buyNow', product)
    );
  }
}
