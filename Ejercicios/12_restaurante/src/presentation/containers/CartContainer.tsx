import { useContext } from "react";
import { createPortal } from "react-dom";
import { contextRestaurant } from "../store/ContextRest";
import { calculateCartTotal } from "../../core/domain/services";
import { CartView } from "../complements/CartView";
export function CartContainer() {
  const { stateCart } = useContext(contextRestaurant)!;

  const totalCart = calculateCartTotal(stateCart);

  return createPortal(
    <CartView totalCart={totalCart} stateCart={stateCart} />,
    document.getElementById("modal")!
  );
}
