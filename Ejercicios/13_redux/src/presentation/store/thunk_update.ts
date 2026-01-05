import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductSentHttp } from "../../core/domain/models";
import { UIActions } from "./ui-slice";
import { sendCartFirebase } from "../../config/dependencies";

// En tu archivo de acciones o donde definiste el thunk
export const syncCartWithFirebase = createAsyncThunk(
  "cart/syncCartWithFirebase",
  async (cartData: ProductSentHttp, { dispatch, rejectWithValue }) => {
    // 1. Notificamos que estamos enviando
    dispatch(
      UIActions.showNotification({
        status: "pending",
        title: "Enviando...",
        message: "Sincronizando el carrito con Firebase",
      })
    );

    try {
      await sendCartFirebase(cartData);

      // 2. Notificamos éxito
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "¡Éxito!",
          message: "Carrito guardado correctamente",
        })
      );

      return "Success";
    } catch (error: any) {
      // 3. Notificamos error
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error",
          message: "No se pudo guardar el carrito",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);
