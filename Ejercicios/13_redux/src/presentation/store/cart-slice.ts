import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AvailableMeals, ProductState } from "../../core/domain/models";
import { getCartFromFirebase } from "./thunk_get";

const initialState: ProductState = {
  items: [],
  totalQuantity: 0,
  change: false,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<AvailableMeals>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity = Number(state.totalQuantity) + 1;
      state.change = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          description: newItem.description,
          image: newItem.image,
          quantity: 1,
        });
      } else {
        existingItem.quantity += 1;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity = Number(state.totalQuantity) - 1;
      state.change = true;
      if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (existingItem) {
        existingItem.quantity--;
      }
    },
    replaceProduct(
      state,
      action: PayloadAction<{ items: any[]; totalQuantity: number }>
    ) {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCartFromFirebase.fulfilled, (state, action) => {
        console.log("Actualizando estado de Redux con:", action.payload);
        // Reemplazamos el estado local con lo que viene de Firebase
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.change = false; // Importante: al cargar, no hay cambios pendientes
      })
      .addCase(getCartFromFirebase.rejected, (state) => {
        console.error("Error al cargar el carrito inicial");
      });
  },
});

export const cartActions = cartSlice.actions;
