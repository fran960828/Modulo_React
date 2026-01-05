import type { CartProduct } from "../../core/domain/models";
import { useAppDispatch } from "../hooks/customHooks";
import { UIActions } from "../store/ui-slice";
import { CartItems } from "./CartItems";

export function CartView({
  totalCart,
  stateCart,
}: {
  totalCart: number;
  stateCart: CartProduct[];
}) {
  const dispatch = useAppDispatch();

  function handleShowCart() {
    dispatch(UIActions.toggleCart());
  }

  let actionModal = (
    <button
      className="bg-transparent border-none rounded-md cursor-pointer text-[#201e1a] text-lg hover:text-[#453719]"
      onClick={handleShowCart}
    >
      Close
    </button>
  );

  return (
    <div className="absolute z-10 top-40 left-[30%] w-1/3 bg-[#d3b17b] border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.5)] backdrop:bg-[rgba(0,0,0,0.65)] px-4 py-2">
      <h2 className="text-2xl uppercase text-[#4f3807] m-0 font-bold">
        YOUR CART
      </h2>
      {stateCart.length === 0 ? (
        <p className="text-[#4f3807]">No items in cart</p>
      ) : (
        <CartItems />
      )}
      <p className="text-right my-2 text-[#4f3807]">
        Cart Total: ${totalCart.toFixed(2)}
      </p>
      <form
        action="div"
        className="text-lg flex flex-row gap-2 justify-end items-center "
      >
        {actionModal}
      </form>
    </div>
  );
}
