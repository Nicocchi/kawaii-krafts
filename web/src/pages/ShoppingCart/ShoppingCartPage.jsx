import styles from "./cart.module.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { AuthContext } from "../../context/AuthContext";

import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { redirect, useNavigate } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const toDollars = (value) => {  
  return (value / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
}

const Cart = () => {
  const { dispatch, cart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState('');

  const onQuantityChange = (e, item) => {
    let quantity = e.target.value;
    item.quantity = quantity;
    dispatch({
      type: "UPDATE",
      payload: item,
    })
  }

  const onCheckout = async () => {

    try {
      const res = await fetch(`${BASE_URL}/orders/create-checkout-session`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({cart: Object.values(cart), customerId: user.customerId}),
      });

      const result = await res.json();

      console.log(result);

      window.location.href = result.url;

      dispatch({
        type: "REMOVE_ALL",
      })

      // const { message } = await res.json();

      // console.log(message);

      // if (!res.ok) {
      //   throw new Error(message);
      // }
    } catch (err) {
      console.error(err);
    }
  }

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (cart === null) {
    return (
      <div className={styles.wrapper}>
      <span className={styles.span}>
        <p></p>
        <p>Product</p>
        <p>Quantity</p>
        <p>Price</p>
        <p></p>
      </span>
      <button className={styles.button}>Continue to Checkout</button>
    </div>
    )
  }

  return (
    <>
    <div className={styles.wrapper}>
      <span className={styles.span}>
        <p></p>
        <p>Product</p>
        <p>Quantity</p>
        <p>Price</p>
        <p></p>
      </span>
      {/* // TODO: These should be in a table */}
      <div className={styles.items}>
        {Object.keys(cart).map((itm) => {
          return (
            <div key={cart[itm]._id} className={styles.item}>
              <img src="" className={styles.img} />
              <p>{cart[itm].title}</p>
              <input name="quantity" className={styles.number} onChange={(e) => onQuantityChange(e, cart[itm])} value={cart[itm].quantity} type="number" />
              <p>{toDollars(cart[itm].price * cart[itm].quantity)}</p>
              <button
              className={styles.button}
                onClick={() =>
                  dispatch({
                    type: "REMOVE",
                    payload: {
                      key: cart[itm]._id,
                    },
                  })
                }
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <button className={styles.button} onClick={onCheckout}>Continue to Checkout</button>
    </div>
    <div className={styles.checkout}>
    {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
      </div>
    </>
  );
};

export default Cart;
