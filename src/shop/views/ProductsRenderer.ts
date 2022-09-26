import AbstractRenderer from '../../abstracts/AbstractRenderer';
import {Product} from '../data/products';

export class ProductsRenderer implements AbstractRenderer {
  private readonly rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
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
    itemElement.textContent = `name: ${product.name}, price: $${product.price}`;

    return itemElement;
  }
}
