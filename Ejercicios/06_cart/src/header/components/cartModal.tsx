import { forwardRef, useImperativeHandle, useRef,useContext } from "react";
import {
  type IcartItem,
  type ICartModalHandle,
  type ICartModalProps,
} from "../../core_modules/core";
import { createPortal } from "react-dom";
import  CartContext  from "../../store/shopCartContext";
import { CartList } from "./cartList";

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

    const {shoppingCart}=useContext(CartContext)!

    const totalCart=shoppingCart.reduce((acc:number,product:IcartItem):number=>{
      return acc+product.quantity*product.price
    },0)

    return createPortal(
      <dialog
        ref={dialog}
        className="w-1/3 bg-[#d3b17b] border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.5)] mx-auto my-auto backdrop:bg-[rgba(0,0,0,0.65)] px-4 py-2"
      >
        <h2 className="text-2xl uppercase text-[#4f3807] m-0 font-bold">
          YOUR CART
        </h2>
        {shoppingCart.length===0 ? <p>No items in cart</p> : <CartList/>}
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

// #cart-items {
//   list-style: none;
//   margin: 1rem 0;
//   padding: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// }

// #cart-items li {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.5rem 1rem;
//   background: #fbd392;
//   border-radius: 5px;
//   font-size: 0.9rem;
// }

// .cart-item-actions {
//   font-size: 1rem;
//   display: flex;
//   gap: 0.5rem;
//   align-items: center;
// }

// .cart-item-actions button {
//   background: transparent;
//   border: none;
//   border-radius: 5px;
//   color: #201e1a;
//   cursor: pointer;
//   font-size: 1.1rem;
// }

// .cart-item-actions button:hover {
//   background: #f5b744;
// }

// .cart-item-actions button:first-of-type {
//   padding-bottom: 0.2rem;
// }

// #cart-total-price {
//   text-align: right;
// }

// #modal form {
//   display: flex;
//   gap: 1rem;
//   justify-content: flex-end;
//   align-items: center;
// }
