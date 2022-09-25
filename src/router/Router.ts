import {Routes, RouteId} from './data/routes';
import Subscribe from '../utils/Subscribe';

export class Router<RoutesType extends Routes> extends Subscribe<
  RouteId<RoutesType>
> {
  public readonly routes: RoutesType;

  constructor(routes: RoutesType, currentId: RouteId<RoutesType>) {
    super(currentId);
    this.routes = routes;
    this.bindHistoryEvent();
  }

  public move(id: RouteId<RoutesType>) {
    history.pushState(null, '', this.routes[id].path);
    this.currentId = id;

    this.next();
  }

  private set currentId(id: RouteId<RoutesType>) {
    this.data = id;
  }

  private bindHistoryEvent() {
    window.addEventListener('popstate', () => {
      // WARN: 버그 가능성 200%
      const id = location.pathname.replace('/', '');
      this.move(id);
    });
  }
}
