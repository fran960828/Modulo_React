// foodRepository.ts

import type { ProductSentHttp } from "../domain/models";

export interface CartRepository {
  getCart: () => Promise<ProductSentHttp>;
}

export interface OrderRepository {
  sendCart: (cart: ProductSentHttp) => Promise<void>;
}
