import type { order } from "../domain/models";
import type { MenuRepository, OrderRepository } from "./ports";

// getMenu.ts
export const getMenu = (menuRepository: MenuRepository) => async () => {
  return menuRepository.getMenu();
};

// checkout.ts
export const checkout =
  (orderRepository: OrderRepository) => async (order: order) => {
    return orderRepository.sendOrder(order);
  };
