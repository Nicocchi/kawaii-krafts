import { createContext, useEffect, useReducer } from "react";

const initialState = {
  cart:
    localStorage.getItem("cart") !== undefined
      ? JSON.parse(localStorage.getItem("cart"))
      : {},
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.cart === null) {
        state.cart = {};
      }
      state.cart[action.payload._id] = action.payload;
      return {
        cart: state.cart,
      };
    case "UPDATE":
      state.cart[action.payload._id] = action.payload;
      return {
        cart: state.cart,
      };
    case "REMOVE":
      const key = action.payload.key;
      let { [key]: _, ...rest } = state.cart;
      state.cart = rest;
      return {
        cart: state.cart,
      };

    default:
      return state;
  }
};

export const CartContext = createContext(initialState);

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
