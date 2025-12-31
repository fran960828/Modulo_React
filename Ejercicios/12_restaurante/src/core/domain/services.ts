import type { CartItem } from "./models";

export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
