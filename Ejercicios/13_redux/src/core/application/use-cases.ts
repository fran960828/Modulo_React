import type { ProductSentHttp } from "../domain/models";
import type { CartRepository, OrderRepository } from "./ports";

// getMenu.ts
export const getCart = (menuRepository: CartRepository) => async () => {
  return menuRepository.getCart();
};

// checkout.ts
export const sendCart =
  (orderRepository: OrderRepository) => async (cart: ProductSentHttp) => {
    return orderRepository.sendCart(cart);
  };
