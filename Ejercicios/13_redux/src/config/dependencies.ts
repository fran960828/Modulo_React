import { sendCart, getCart } from "../core/application/use-cases";
import { CartRepositoryImpl } from "../core/infrastructure/menu";
import { orderRepositoryImpl } from "../core/infrastructure/order";

export const getCartFirebase: ReturnType<typeof getCart> =
  getCart(CartRepositoryImpl);

export const sendCartFirebase: ReturnType<typeof sendCart> =
  sendCart(orderRepositoryImpl);
