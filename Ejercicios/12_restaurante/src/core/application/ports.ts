// foodRepository.ts

import type { AvailableMeals, order } from "../domain/models";

export interface MenuRepository {
  getMenu: () => Promise<AvailableMeals[]>;
}

export interface OrderRepository {
  sendOrder: (order: order) => Promise<void>;
}
