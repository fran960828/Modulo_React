import { createContext, useReducer } from "react";
import type { ContextRest, ContextRestFunction, CartRestAction, CartItem } from "../../core/domain/models";
import { useFetch } from "../hooks/useFetch";
import { getMenuRestaurant } from "../../config/dependencies";

const contextRestaurant=createContext<ContextRest|undefined>(undefined)
const {data}=useFetch({fnFetch:getMenuRestaurant,initialValue:[]})

function restaurantCartReducer(state:CartItem[],actions:CartRestAction){
switch (actions.type) {
    case "ADD_PRODUCT": {
      const updatedCart = [...state];
      const itemIndex = updatedCart.findIndex(item => item.id === actions.id);

      if (itemIndex !== -1) {
        const existing = updatedCart[itemIndex];
        updatedCart[itemIndex] = {
          ...existing,
          quantity: existing.quantity + 1
        };
      } else {
        const product = data.find(p => p.id === actions.id);
        if (!product) return state;

        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart;
    }

    case "UPDATE_PRODUCT": {
      const updatedCart = [...state];
      const index = updatedCart.findIndex(item => item.id === actions.id);
      if (index === -1) return state;

      const updatedItem = { ...updatedCart[index] };
      updatedItem.quantity += actions.amount;

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




export function ContextRestProvider({children}:ContextRestFunction){
    const [stateCart,dispatch]=useReducer(restaurantCartReducer,[])

    function handleAddProduct(id: string) {
    dispatch({ type: "ADD_PRODUCT", id });
  }

  function handleUpdateProduct(id: string, amount: number) {
    dispatch({ type: "UPDATE_PRODUCT", id, amount });
  }

    return(
        <contextRestaurant.Provider value={{stateCart,handleAddProduct,handleUpdateProduct}}>
            {children}
        </contextRestaurant.Provider>

    )
}