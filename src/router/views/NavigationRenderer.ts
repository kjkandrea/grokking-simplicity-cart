import {Routes} from '../data/routes';
import AbstractRenderer from '../../abstracts/AbstractRenderer';
import {OnEmit} from '../../utils/OnEmit';

export class NavigationRenderer extends OnEmit implements AbstractRenderer {
  private readonly rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    super();
    this.rootElement = rootElement;
  }

  public render(routes: Routes) {
    this.rootElement.innerHTML = '';
    this.rootElement.append(this.generateNavigationHTMLElement(routes));
  }

  private generateNavigationHTMLElement(routes: Routes) {
    const wrapperElement = document.createElement('ul');

    console.log(routes);

    Object.entries(routes)
      .map(([id, route]) => {
        const wrapperElement = document.createElement('li');
        const anchorElement = document.createElement('a');

        wrapperElement.append(anchorElement);
        anchorElement.href = route.path;
        anchorElement.textContent = route.label;
        this.bindClickAnchorEvent(anchorElement, id);

        return wrapperElement;
      })
      .forEach(itemElement => wrapperElement.append(itemElement));

    return wrapperElement;
  }

  private bindClickAnchorEvent(anchorElement: HTMLAnchorElement, id: string) {
    anchorElement.addEventListener('click', event => {
      event.preventDefault();

      this.emit('@click:navigation', id);
    });
  }
}
