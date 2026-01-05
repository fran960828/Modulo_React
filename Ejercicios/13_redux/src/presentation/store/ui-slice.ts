import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UiState, INotification } from "../../core/domain/models";
import { syncCartWithFirebase } from "./thunk_update";
import { getCartFromFirebase } from "./thunk_get";

const initialState: UiState = {
  showCart: false,
  notification: {
    status: "",
    title: "",
    message: "",
  },
};

export const cartUI = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action: PayloadAction<INotification>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Cuando el thunk de carrito empieza
      .addCase(syncCartWithFirebase.pending, (state) => {
        state.notification = {
          status: "pending",
          title: "Enviando...",
          message: "Guardando datos en la nube",
        };
      })
      // Cuando el thunk termina con éxito
      .addCase(syncCartWithFirebase.fulfilled, (state) => {
        state.notification = {
          status: "success",
          title: "Sincronizado",
          message: "Los datos están a salvo",
        };
      })
      // Cuando hay un error
      .addCase(syncCartWithFirebase.rejected, (state) => {
        state.notification = {
          status: "error",
          title: "Error de red",
          message: "No pudimos conectar con Firebase",
        };
      });
  },
});

export const UIActions = cartUI.actions;
