import styles from "../ShoppingCart/cart.module.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
// import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { AuthContext } from "../../context/AuthContext";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { redirect, useNavigate } from "react-router-dom";
import loadingIcon from "../../components/LoadingIcon/LoadingIcon.svg";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const BASE_URL = import.meta.env.VITE_API_URL;

// TODO (Nico): Refactor into separate file to import
const toDollars = (value) => {
  return (value / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const OrdersPage = () => {
  const { token, user } = useContext(AuthContext);

  const {
    data: payments,
    loading,
    error,
  } = useFetchData(`orders/payment-history/${user?.customerId}`);

  const {
    data: productData,
    loading2,
    error2,
  } = useFetchData(`products`);

  const findImageSrc = (id) => {
    let pr = productData?.data?.filter((p) => p.stripeId === id)[0];
    return pr?.images[0];
  };

  if (loading || loading2) {
    return (
      <div className={styles.wrapper}>
        <img src={loadingIcon} width={200} />
      </div>
    );
  }

  if (error || error2) {
    console.error(error);
    return (
      <div className={styles.wrapper}>
        <h1>Error</h1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Order history</h1>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
                payments?.data.map((payment) => {
                    const paidOn = new Date(payment?.period_end);
                    return (
                        <tr key={payment?.id}>
                            <td><img src={`/img/${findImageSrc(payment?.lines?.data[0]?.price?.product)}`} className={styles.img} /></td>
                            <td><p>{payment?.lines?.data[0]?.description}</p></td>
                            <td><p>{payment?.lines?.data[0]?.quantity}</p></td>
                            <td><p>{`${toDollars(payment?.amount_paid)} USD`}</p></td>
                            <td><p>{paidOn.toDateString()}</p></td>
                        </tr>
                        
                    )
                })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersPage;
