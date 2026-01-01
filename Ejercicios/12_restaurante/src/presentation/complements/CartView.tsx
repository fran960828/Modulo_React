import { useContext } from "react";
import type { CartItem } from "../../core/domain/models";
import { CartItems } from "./CartItems";
import { contextGlobal } from "../store/ContextGlobal";

export function CartView({
  stateCart,
  totalCart,
}: {
  stateCart: CartItem[];
  totalCart: number;
}) {
  const { handleUIForm, closeAll } = useContext(contextGlobal);

  let actionModal = (
    <button
      className="bg-transparent border-none rounded-md cursor-pointer text-[#201e1a] text-lg hover:text-[#453719]"
      onClick={closeAll}
    >
      Close
    </button>
  );

  if (stateCart.length > 0) {
    actionModal = (
      <>
        <button
          className="bg-transparent border-none rounded-md cursor-pointer text-[#201e1a] text-lg hover:text-[#453719]"
          onClick={closeAll}
        >
          close
        </button>
        <button
          className="bg-[#271e07] border-none rounded-md cursor-pointer text-lg text-[#f9efda] px-4 py-2 hover:text-[#382e1b]"
          onClick={handleUIForm}
        >
          Checkout
        </button>
      </>
    );
  }

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
