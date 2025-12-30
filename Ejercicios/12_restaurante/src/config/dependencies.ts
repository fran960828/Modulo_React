import { checkout, getMenu } from "../core/application/use-cases";
import { menuRepositoryImpl } from "../core/infrastructure/menu";
import { orderRepositoryImpl } from "../core/infrastructure/order";

export const getMenuRestaurant: ReturnType<typeof getMenu> =
  getMenu(menuRepositoryImpl);

export const checkoutOrder: ReturnType<typeof checkout> =
  checkout(orderRepositoryImpl);
