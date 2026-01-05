import type { CartRepository } from "../application/ports";
import type { ProductSentHttp } from "../domain/models";
import { httpClient } from "./api";

export const CartRepositoryImpl: CartRepository = {
  getCart: async () => {
    const dto = await httpClient.get<ProductSentHttp>(
      "https://redux-cdb8d-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
    );
    return dto;
  },
};
