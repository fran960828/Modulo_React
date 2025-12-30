import type { CartItem } from "./models";

export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
