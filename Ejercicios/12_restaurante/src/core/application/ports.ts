// foodRepository.ts

import type { AvailableMeals, Order } from "../domain/models";

export interface MenuRepository {
  getMenu: () => Promise<AvailableMeals[]>;
}

export interface OrderRepository {
  sendOrder: (order: Order) => Promise<void>;
}
