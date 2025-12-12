import logo from "/logo.png";
import { Button } from "../components/Button";
import CartContext from "../store/shopCartContext";
import { useContext } from "react";
import { CartModal } from "./components/cartModal";
export function Header() {
  const { shoppingCart } = useContext(CartContext)!;
  const shoppingCartItem = shoppingCart.length;

  return (
    <>
      <CartModal />
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
          <Button>Cart({shoppingCartItem})</Button>
        </div>
      </header>
    </>
  );
}
