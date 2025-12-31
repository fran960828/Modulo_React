import logo from "/logo.jpg";
import { contextRestaurant } from "../store/ContextRest";
import { useContext, useRef } from "react";
import type { ModalCart } from "../../core/domain/models";
import { CartContainer } from "../containers/CartContainer";

export function Header() {
  const { stateCart } = useContext(contextRestaurant);
  const cartElements = stateCart.length;
  const dialog = useRef<ModalCart>(null);
  function handleModal() {
    dialog.current?.open();
  }

  let actionModal = (
    <button className="bg-transparent border-none rounded-md cursor-pointer text-[#201e1a] text-lg hover:text-[#453719]">
      Close
    </button>
  );

  if (stateCart.length > 0) {
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
      <CartContainer ref={dialog} actions={actionModal} />
      <header className="flex justify-between items-center px-[10%] py-12">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 object-contain rounded-[50%] border-2 border-[#ffc404]"
          />
          <h1 className="font-bold text-[2rem] uppercase tracking-[0.2rem]">
            React Food
          </h1>
        </div>
        <div>
          <button
            className="font-normal text-xl border-none text-[#ffc404] bg-transparent cursor-pointer transition-all"
            onClick={handleModal}
          >
            {`Cart(${cartElements})`}
          </button>
        </div>
      </header>
    </>
  );
}
