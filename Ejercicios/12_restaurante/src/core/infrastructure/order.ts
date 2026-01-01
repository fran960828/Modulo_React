import { type OrderRepository } from "../application/ports";
import { httpClient } from "./api";

export const orderRepositoryImpl: OrderRepository = {
  sendOrder: async (orderData) => {
    await httpClient.post("http://localhost:3000/orders", orderData);
  },
};
