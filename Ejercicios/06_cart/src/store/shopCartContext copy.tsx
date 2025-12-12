import { createContext, useReducer } from "react";
import {
  type IcontextCart,
  type IfunctionContext,
  type IcartItem,
  type CartAction
} from "../core_modules/core";
import { DUMMY_PRODUCTS } from "../utils/dummy-products";

const CartContext = createContext<IcontextCart | undefined>(undefined);

function shoppingCardReducer(state:IcartItem[],action:CartAction){
  if (action.type==='ADD_PRODUCT'){

      const updatedCart = [...state];

      // Buscar si ya está en el carrito
      const itemIndex = updatedCart.findIndex((item) => item.id === action.id);

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
        const product = DUMMY_PRODUCTS.find((p) => p.id === action.id);
        if (!product) return state; // por seguridad

        updatedCart.push({
          ...product,
          quantity: 1,
        });
      }
      console.log(updatedCart);
      return updatedCart;
    ;
  }
  if (action.type==='UPDATE_PRODUCT'){
    const updatedCart = [...state];

    const itemIndex = updatedCart.findIndex(item => item.id === action.id);
    if (itemIndex === -1) return state;

    // CLONAR EL ITEM (muy importante)
    const updatedItem = { ...updatedCart[itemIndex] };

    updatedItem.quantity += action.amount;

    if (updatedItem.quantity <= 0) {
      // remover item
      updatedCart.splice(itemIndex, 1);
    } else {
      // reemplazar con el clon
      updatedCart[itemIndex] = updatedItem;
    }

    return updatedCart;
  }
}

export function ShopCartContextProvider({ children }: IfunctionContext) {
  // El carrito empieza vacío, nunca undefined
  const [shoppingCartState, shoppingCartDispatch] = useReducer<Ireduce>([],shoppingCardReducer);

  function handleAddProduct(id: string) {
    shoppingCartDispatch({
      type:'ADD_PRODUCT',
      payload:id
    })
  }

  function handleUpdateProduct(id: string, amount: number) {
  shoppingCartDispatch({
    type:'UPDATE_PRODUCT',
    id:id,
    amount:amount
  })
}


  return (
    <CartContext.Provider value={{ shoppingCart, handleAddProduct,handleUpdateProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
