import {Router} from './Router';
import {NavigationRenderer} from './views/NavigationRenderer';
import {Subscriber} from '../utils/Subscribe';
import {RouteId, Routes} from './data/routes';

const navigationId = 'navigation';

export class NavigationController<RoutesType extends Routes> {
  private router: Router<RoutesType>;

  constructor(
    routes: RoutesType,
    rootElement: HTMLElement,
    subscriber: Subscriber<RouteId<RoutesType>>
  ) {
    this.router = new Router(routes, 'shop'); // 이상함..
    this.mountDOM(rootElement);
    const renderer = this.createRenderer(this.navigationElement);
    renderer.on('@click:navigation', id => this.router.move(id));
    renderer.render(this.router.routes);
    this.router.subscribe(subscriber);
    this.router.move('shop');
  }

  private mountDOM(rootElement: HTMLElement) {
    rootElement.insertAdjacentHTML(
      'beforeend',
      `
        <nav id="${navigationId}"></nav>
      `
    );
  }

  get navigationElement() {
    return document.getElementById(navigationId)!;
  }

  createRenderer(rootElement: HTMLElement) {
    return new NavigationRenderer(rootElement);
  }
}
