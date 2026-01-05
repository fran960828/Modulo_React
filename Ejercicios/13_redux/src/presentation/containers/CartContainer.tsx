import { createPortal } from "react-dom";
import { calculateCartTotal } from "../../core/domain/services";
import { CartView } from "../complements/CartView";
import { useAppSelector } from "../hooks/customHooks";
export function CartContainer() {
  const cart = useAppSelector((state) => state.cart.items);

  const totalCart = calculateCartTotal(cart);

  return createPortal(
    <CartView totalCart={totalCart} stateCart={cart} />,
    document.getElementById("modal")!
  );
}
