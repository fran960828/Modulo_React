import { createContext, useState } from "react";
import {
  type IcontextCart,
  type IfunctionContext,
  type IcartItem,
} from "../core_modules/core";
import { DUMMY_PRODUCTS } from "../utils/dummy-products";

const CartContext = createContext<IcontextCart | undefined>(undefined);

export function ShopCartContextProvider({ children }: IfunctionContext) {
  // El carrito empieza vacío, nunca undefined
  const [shoppingCart, setShoppingCart] = useState<IcartItem[]>([]);

  function handleAddProduct(id: string) {
    setShoppingCart((prev) => {
      const updatedCart = [...prev];

      // Buscar si ya está en el carrito
      const itemIndex = updatedCart.findIndex((item) => item.id === id);

      // Si ya existe → incrementar cantidad
      if (itemIndex !== -1) {
        const existing = updatedCart[itemIndex];
        updatedCart[itemIndex] = {
          ...existing,
          quantity: existing.quantity + 1,
        };
      }
      // Si NO existe → agregarlo
      else {
        const product = DUMMY_PRODUCTS.find((p) => p.id === id);
        if (!product) return prev; // por seguridad

        updatedCart.push({
          ...product,
          quantity: 1,
        });
      }
      console.log(updatedCart);
      return updatedCart;
    });
  }

  return (
    <CartContext.Provider value={{ shoppingCart, handleAddProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
