import type { CartProduct } from "./models";

export const calculateCartTotal = (items: CartProduct[]): number =>
  items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

// core/domain/validation/checkoutValidation.ts
