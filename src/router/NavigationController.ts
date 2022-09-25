import {Router} from './Router';
import {NavigationRenderer} from './views/NavigationRenderer';

const navigationId = 'navigation';

export class NavigationController {
  private router: Router;

  constructor(router: Router, rootElement: HTMLElement) {
    this.router = router;
    this.mountDOM(rootElement);
    const renderer = this.createRenderer(this.navigationElement);
    renderer.render(router.routes);
    router.subscribe(console.log);
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
    return new NavigationRenderer(rootElement, route =>
      this.router.move(route)
    );
  }
}
