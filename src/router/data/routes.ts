export interface Routes {
  [id: string]: Route;
}

export type RouteId<RoutesType> = keyof RoutesType;

export interface Route {
  path: string;
  label: string;
}

export const routes = {
  cart: {
    path: '/cart',
    label: '장바구니',
  },
  shop: {
    path: '/shop',
    label: '상점',
  },
} as const;
