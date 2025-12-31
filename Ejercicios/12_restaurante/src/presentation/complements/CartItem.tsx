import { useContext } from "react";
import { contextRestaurant } from "../store/ContextRest";
import type { CartItem } from "../../core/domain/models";

export function CartItem() {
  const { stateCart, handleUpdateProduct } = useContext(contextRestaurant)!;

  return (
    <ul className="my-4 flex flex-col gap-2 p-0 list-none">
      {stateCart.map((product: CartItem) => (
        <li
          key={product.id}
          className="px-4 py-2 rounded-md bg-[#fbd392] text-[15px] flex justify-between items-center "
        >
          <span>{product.name}</span>
          <span className="font-bold">${Number(product.price).toFixed(2)}</span>
          <div className="flex items-center gap-2 text-[1rem]">
            <button onClick={() => handleUpdateProduct(product.id, -1)}>
              -
            </button>
            <span>{product.quantity}</span>
            <button onClick={() => handleUpdateProduct(product.id, 1)}>
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
