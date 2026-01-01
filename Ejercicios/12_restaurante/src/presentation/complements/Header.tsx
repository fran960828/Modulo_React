import logo from "/logo.jpg";
import { contextRestaurant } from "../store/ContextRest";
import { useContext } from "react";
import { CartContainer } from "../containers/CartContainer";
import { contextGlobal } from "../store/ContextGlobal";
import { FormContainer } from "../containers/FormContainer";
import { Success } from "./Success";

export function Header() {
  const { stateCart } = useContext(contextRestaurant);
  const cartElements = stateCart.length;
  const { stateUI, handleUICart } = useContext(contextGlobal);

  return (
    <>
      {stateUI === "CART" && <CartContainer />}
      {stateUI === "FORM" && <FormContainer />}
      {stateUI === "SUCCESS" && <Success />}
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
            onClick={handleUICart}
          >
            {`Cart(${cartElements})`}
          </button>
        </div>
      </header>
    </>
  );
}
