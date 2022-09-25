export interface CartItem {
  price: number;
  quantity: number;
  shipping: string;
  immediateDeliverable?: true;
  options?: {
    [optionName: string]: string | number;
  };
}

export interface Cart {
  [cartItemName: string]: CartItem;
}

export const getCartData = (): Cart => ({
  shoes: {
    price: 1000,
    quantity: 1,
    shipping: 'seoul',
    immediateDeliverable: true,
    options: {
      size: 265,
    },
  },
  hood: {
    price: 800,
    quantity: 1,
    shipping: 'seoul',
    immediateDeliverable: true,
    options: {
      color: 'black',
    },
  },
  tShort: {
    price: 1500,
    quantity: 2,
    shipping: 'my company',
    options: {
      color: 'red',
      size: 3,
    },
  },
});
