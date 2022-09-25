export interface Routes {
  [id: string]: Route;
}

export interface Route {
  path: string;
  label: string;
}

export const routes: Routes = {
  cart: {
    path: '/cart',
    label: '장바구니',
  },
  shop: {
    path: '/shop',
    label: '상점',
  },
};
