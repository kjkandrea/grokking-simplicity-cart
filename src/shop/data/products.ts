interface Product {
  name: string;
  price: number;
  options?: Options;
}

export interface Options {
  [optionName: string]: string | number;
}

export const getProducts = (): Product[] => [
  {
    name: 'shoes',
    price: 6,
  },
  {
    name: 'tShort',
    price: 2,
  },
];
