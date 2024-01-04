import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
  name: "shoppingcart",
  initialState: {
    value: 0,
    items: {}
  },
  reducers: {
    add: (state, action) => {
      state.items[action.payload.id] = action.payload;
    },
    removeItem: (state, action) => {
      const key = action.payload;
      let { [key]: _, ...rest} = state.items
      state.items = rest;
    },
  },
});

export const { increment, decrement, incrementByAmount, add, removeItem, } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;