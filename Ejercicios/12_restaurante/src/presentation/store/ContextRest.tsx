import { createContext, useCallback, useReducer, type ReactNode } from "react";
import type {
  ContextRest,
  CartRestAction,
  CartItem,
  AvailableMeals,
} from "../../core/domain/models";
export const contextRestaurant = createContext<ContextRest>({} as ContextRest);

// --- REDUCER (Ahora es una función pura) ---
function restaurantCartReducer(
  state: CartItem[],
  action: CartRestAction
): CartItem[] {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { product } = action; // El producto ya viene aquí completo
      const itemIndex = state.findIndex((item) => item.id === product.id);

      if (itemIndex !== -1) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...product, quantity: 1 }];
    }

    case "UPDATE_PRODUCT": {
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + action.amount }
            : item
        )
        .filter((item) => item.quantity > 0); // Elimina si es 0 o menos
    }
    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
}

// --- PROVIDER ---
export function ContextRestProvider({ children }: { children: ReactNode }) {
  // Traemos la data aquí, no en el reducer

  const [stateCart, dispatch] = useReducer(restaurantCartReducer, []);

  function handleAddProduct(product: AvailableMeals) {
    dispatch({ type: "ADD_PRODUCT", product }); // Enviamos el producto completo
  }

  function handleUpdateProduct(id: string, amount: number) {
    dispatch({ type: "UPDATE_PRODUCT", id, amount });
  }
  const handleClearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <contextRestaurant.Provider
      value={{
        stateCart,
        handleAddProduct,
        handleUpdateProduct,
        handleClearCart,
      }}
    >
      {children}
    </contextRestaurant.Provider>
  );
}
