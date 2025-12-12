import { Product } from "./components/Product";
import { DUMMY_PRODUCTS } from "../utils/dummy-products";
import type { Iproduct } from "../core_modules/core";

export function Shop() {
  return (
    <section>
      <h2 className="text-2xl text-stone-400 uppercase font-bold mb-4">
        ELEGANT CLOTHING FOR EVERYONE
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8 list-none">
        {DUMMY_PRODUCTS.map((product: Iproduct) => (
          <li key={product.id} className="m-0 p-0">
            <Product prop={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
