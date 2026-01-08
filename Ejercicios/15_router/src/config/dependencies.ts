import { sendCart, getCart } from "../core/application/use-cases";
import { CartRepositoryImpl } from "../core/infrastructure/getImpl";
import { orderRepositoryImpl } from "../core/infrastructure/postImpl";

export const getCartFirebase: ReturnType<typeof getCart> =
  getCart(CartRepositoryImpl);

export const sendCartFirebase: ReturnType<typeof sendCart> =
  sendCart(orderRepositoryImpl);
