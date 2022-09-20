export interface CartItem {
  price: number;
  quantity: number;
  shipping: string;
  immediateDeliverable?: true;
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
  },
  hood: {
    price: 800,
    quantity: 1,
    shipping: 'seoul',
    immediateDeliverable: true,
  },
  tShort: {
    price: 1500,
    quantity: 2,
    shipping: 'my company',
  },
});
