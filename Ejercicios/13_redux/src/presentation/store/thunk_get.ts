import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCartFirebase } from "../../config/dependencies";

// En tu archivo de acciones o donde definiste el thunk
export const getCartFromFirebase = createAsyncThunk(
  "cart/getCartFromFirebase",
  async (_, { rejectWithValue }) => {
    // 1. Notificamos que estamos enviando

    try {
      const cartData = await getCartFirebase();
      return cartData.cart;
    } catch (error: any) {
      // 3. Notificamos error
      return rejectWithValue(error.message);
    }
  }
);
