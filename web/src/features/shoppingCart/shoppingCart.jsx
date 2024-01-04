import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./shoppingCartSlice";
import styles from "./shopping.module.css";

export function ShoppingCart() {
  const count = useSelector((state) => state.shoppingCart.value);
  const items = useSelector((state) => state.shoppingCart.items)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <span>{count}</span>
      </div>
    </div>
  );
}
