import { createContext, useEffect, useReducer } from "react";

const initialState = {
  catalog: [],
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return (state.catalog = action.payload);

    default:
      return state;
  }
};

export const CatalogContext = createContext(initialState);

export const CatalogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state]);

  return (
    <CatalogContext.Provider
      value={{
        catalog: state.catalog,
        dispatch,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
