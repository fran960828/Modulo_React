import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  type ICartModalHandle,
  type ICartModalProps,
} from "../../core_modules/core";

export const CartModal = forwardRef<ICartModalHandle, ICartModalProps>(
  function CartModal({ actions }, ref) {
    const dialog = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => {
      return {
        open: () => {
          dialog.current?.showModal();
        },
      };
    });

    return (
      <dialog ref={dialog}>
        <h2>YOUR CART</h2>
        <p>No items in cart</p>
        <p>Cart Total: $0.00</p>
        <form action="dialog">{actions}</form>
      </dialog>
    );
  }
);
