import {Routes} from '../data/routes';
import AbstractRenderer from '../../abstracts/AbstractRenderer';

type RouteId = keyof Routes;
type Listener = (id: RouteId) => void;

export class NavigationRenderer implements AbstractRenderer {
  private readonly rootElement: HTMLElement;
  private readonly listener: Listener;

  constructor(rootElement: HTMLElement, listener: Listener) {
    this.rootElement = rootElement;
    this.listener = listener;
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

      this.listener(id);
    });
  }
}
