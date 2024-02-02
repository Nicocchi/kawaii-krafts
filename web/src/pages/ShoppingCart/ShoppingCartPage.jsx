import styles from "./cart.module.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { AuthContext } from "../../context/AuthContext";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { redirect, useNavigate } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const toDollars = (value) => {
  return (value / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const Cart = () => {
  const { dispatch, cart } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");

  const onQuantityChange = (e, item) => {
    let quantity = e.target.value;
    item.quantity = quantity;
    dispatch({
      type: "UPDATE",
      payload: item,
    });
  };

  const onCheckout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders/create-checkout-session`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: Object.values(cart),
          customerId: user.customerId,
        }),
      });

      const result = await res.json();

      console.log(result);

      window.location.href = result.url;

      dispatch({
        type: "REMOVE_ALL",
      });

      // const { message } = await res.json();

      // console.log(message);

      // if (!res.ok) {
      //   throw new Error(message);
      // }
    } catch (err) {
      console.error(err);
    }
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Cart</h1>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cart).map((itm) => {
              return (
                <tr key={cart[itm]._id}>
                  <td>
                    <img src={`/img/${cart[itm]?.images[0]}`} className={styles.img} />
                  </td>
                  <td>
                    <p>{cart[itm].title}</p>
                  </td>
                  <td>
                    <input
                      name="quantity"
                      className={styles.number}
                      onChange={(e) => onQuantityChange(e, cart[itm])}
                      value={cart[itm].quantity}
                      type="number"
                    />
                  </td>
                  <td>
                    <p>{toDollars(cart[itm].price * cart[itm].quantity)}</p>
                  </td>
                  <td>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className={styles.button} onClick={onCheckout}>
          Continue to Checkout
        </button>
      </div>
      <div className={styles.checkout}>
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </>
  );
};

export default Cart;
