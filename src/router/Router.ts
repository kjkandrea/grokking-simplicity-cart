import {Routes} from './data/routes';
import Subscribe from '../utils/Subscribe';

type RouteId = keyof Routes;

export class Router extends Subscribe<RouteId> {
  public readonly routes: Routes;

  constructor(routes: Routes) {
    super('cart'); // 이상함
    this.routes = routes;
  }

  public move(id: RouteId) {
    history.pushState(null, '', this.routes[id].path);
    this.currentId = id;

    this.next();
  }

  private set currentId(id: RouteId) {
    this.data = id;
  }
}
