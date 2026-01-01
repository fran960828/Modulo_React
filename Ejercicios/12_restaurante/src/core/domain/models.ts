export interface AvailableMeals {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CartItem extends AvailableMeals {
  quantity: number;
}

export interface order {
  order: {
    items: CartItem[];
    customer: {
      name: string;
      email: string;
      street: string;
      "postal-code": string;
      city: string;
    };
  };
}

export interface ErrorLoad {
  message: string;
}

export interface UseFetch<T> {
  fnFetch: () => Promise<T>;
  initialValue: T;
}

export interface CardProduct {
  data: AvailableMeals[];
  isLoading: boolean;
  errorLoad: ErrorLoad | null;
}

export interface ContextRest {
  stateCart: CartItem[];
  handleAddProduct: (product: AvailableMeals) => void;
  handleUpdateProduct: (id: string, amount: number) => void;
  handleClearCart: () => void;
}

export type CartRestAction =
  | { type: "ADD_PRODUCT"; product: AvailableMeals }
  | { type: "UPDATE_PRODUCT"; id: string; amount: number }
  | { type: "CLEAR_CART" };

export type FormState = {
  success: boolean;
  message: string;
  errors?: ValidationError[];
  inputs?: Record<string, string>; // Para persistir datos
};

export interface ValidationError {
  field: string;
  message: string;
}

export type UIStatus = "IDLE" | "CART" | "FORM" | "SUCCESS";

export interface IContextGlobal {
  stateUI: UIStatus;
  handleUICart: () => void;
  handleUIForm: () => void;
  handleUISuccess: () => void;
  closeAll: () => void;
}
