import { type OrderRepository } from "../application/ports";
import { httpClient } from "./api";

export const orderRepositoryImpl: OrderRepository = {
  sendCart: async (Cart) => {
    await httpClient.post(
      "https://redux-cdb8d-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      Cart
    );
  },
};
