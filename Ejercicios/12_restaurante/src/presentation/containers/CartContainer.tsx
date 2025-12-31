import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { contextRestaurant } from "../store/ContextRest";
import { calculateCartTotal } from "../../core/domain/services";
import type { ModalActions, ModalCart } from "../../core/domain/models";
import { CartItem } from "../complements/CartItem";

export const CartContainer = forwardRef<ModalCart, ModalActions>(
  function CartContainer({ actions }, ref) {
    const dialog = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => {
      return {
        open: () => {
          dialog.current?.showModal();
        },
      };
    });

    const { stateCart } = useContext(contextRestaurant)!;

    const totalCart = calculateCartTotal(stateCart);

    return createPortal(
      <dialog
        ref={dialog}
        className="w-1/3 bg-[#d3b17b] border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.5)] mx-auto my-auto backdrop:bg-[rgba(0,0,0,0.65)] px-4 py-2"
      >
        <h2 className="text-2xl uppercase text-[#4f3807] m-0 font-bold">
          YOUR CART
        </h2>
        {stateCart.length === 0 ? <p>No items in cart</p> : <CartItem />}
        <p className="text-right my-2">Cart Total: ${totalCart.toFixed(2)}</p>
        <form
          action="dialog"
          className="text-lg flex flex-row gap-2 justify-end items-center "
        >
          {actions}
        </form>
      </dialog>,
      document.getElementById("modal")!
    );
  }
);
