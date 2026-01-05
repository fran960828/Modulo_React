import logo from "/logo.jpg";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";
import { CartContainer } from "../containers/CartContainer";
import { UIActions } from "../store/ui-slice";

export function Header() {
  const stateCart = useAppSelector((state) => state.cart.items);
  const uiCart = useAppSelector((state) => state.ui.showCart);
  const dispatch = useAppDispatch();
  const productsInCart = stateCart.length;

  function handleShowCart() {
    dispatch(UIActions.toggleCart());
  }

  return (
    <>
      {uiCart && <CartContainer />}
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
            onClick={handleShowCart}
          >
            {`Cart(${productsInCart})`}
          </button>
        </div>
      </header>
    </>
  );
}
