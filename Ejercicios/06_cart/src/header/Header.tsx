import logo from "/logo.png";
import { Button } from "../components/Button";
import CartContext from "../store/shopCartContext";
import { useContext, useRef } from "react";
import { CartModal } from "./components/cartModal";
import type { ICartModalHandle } from "../core_modules/core";
export function Header() {
  const { shoppingCart } = useContext(CartContext)!;
  function handleOpenCart() {
    dialog.current?.open();
  }

  const shoppingCartItem = shoppingCart.length;
  const dialog = useRef<ICartModalHandle>(null);
  let actionModal = (
    <button className="bg-transparent border-none rounded-md cursor-pointer text-[#201e1a] text-lg hover:text-[#453719]">
      Close
    </button>
  );

  if (shoppingCart.length > 0) {
    actionModal = (
      <>
        <button className="bg-transparent border-none rounded-md cursor-pointer text-[#201e1a] text-lg hover:text-[#453719]">
          close
        </button>
        <button className="bg-[#271e07] border-none rounded-md cursor-pointer text-lg text-[#f9efda] px-4 py-2 hover:text-[#382e1b]">
          Checkout
        </button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={dialog} actions={actionModal} />
      <header className="flex flex-row justify-between items-center mb-8">
        <div
          id="title"
          className="flex flex-row justify-start items-center gap-4"
        >
          <img src={logo} alt="logo" className="w-1/8 h-1/8 object-cover" />
          <h1 className="font-extrabold text-4xl text-[#edbf68] m-0">
            ELEGANT CONTEXT
          </h1>
        </div>
        <div id="title__button">
          <Button onClick={handleOpenCart}>Cart({shoppingCartItem})</Button>
        </div>
      </header>
    </>
  );
}
