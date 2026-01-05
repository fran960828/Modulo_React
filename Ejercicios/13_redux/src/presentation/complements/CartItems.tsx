import { useDispatch } from "react-redux";
import type { CartProduct } from "../../core/domain/models";
import { cartActions } from "../store/cart-slice";
import { useAppSelector } from "../hooks/customHooks";

export function CartItems() {
  const stateCart = useAppSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  function handleAddProduct(item: CartProduct) {
    dispatch(cartActions.addProduct(item));
  }
  function handleRemoveProduct(id: string) {
    dispatch(cartActions.removeProduct(id));
  }

  return (
    <ul className="my-4 flex flex-col gap-2 p-0 list-none">
      {stateCart.map((product: CartProduct) => (
        <li
          key={product.id}
          className="px-4 py-2 rounded-md bg-[#fbd392] text-[15px] flex justify-between items-center "
        >
          <span className="text-[#4f3807]">{product.name}</span>
          <span className="font-bold text-[#4f3807]">
            ${Number(product.price).toFixed(2)}
          </span>
          <div className="flex items-center gap-2 text-[1rem]">
            <button
              className="text-[#4f3807]"
              onClick={() => handleRemoveProduct(product.id)}
            >
              -
            </button>
            <span className="text-black">{product.quantity}</span>
            <button
              className="text-[#4f3807]"
              onClick={() => handleAddProduct(product)}
            >
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
