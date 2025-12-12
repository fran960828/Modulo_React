import { createContext, useReducer } from "react";
import {
  type IcontextCart,
  type IfunctionContext,
  type IcartItem,
  type CartAction
} from "../core_modules/core";
import { DUMMY_PRODUCTS } from "../utils/dummy-products";

const CartContext = createContext<IcontextCart | undefined>(undefined);

// Reducer sólido y seguro
function shoppingCartReducer(state: IcartItem[], action: CartAction): IcartItem[] {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const updatedCart = [...state];
      const itemIndex = updatedCart.findIndex(item => item.id === action.id);

      if (itemIndex !== -1) {
        const existing = updatedCart[itemIndex];
        updatedCart[itemIndex] = {
          ...existing,
          quantity: existing.quantity + 1
        };
      } else {
        const product = DUMMY_PRODUCTS.find(p => p.id === action.id);
        if (!product) return state;

        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart;
    }

    case "UPDATE_PRODUCT": {
      const updatedCart = [...state];
      const index = updatedCart.findIndex(item => item.id === action.id);
      if (index === -1) return state;

      const updatedItem = { ...updatedCart[index] };
      updatedItem.quantity += action.amount;

      if (updatedItem.quantity <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index] = updatedItem;
      }

      return updatedCart;
    }

    default:
      return state;
  }
}

export function ShopCartContextProvider({ children }: IfunctionContext) {
  const [shoppingCart, dispatch] = useReducer(shoppingCartReducer, []);

  function handleAddProduct(id: string) {
    dispatch({ type: "ADD_PRODUCT", id });
  }

  function handleUpdateProduct(id: string, amount: number) {
    dispatch({ type: "UPDATE_PRODUCT", id, amount });
  }

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        handleAddProduct,
        handleUpdateProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;

