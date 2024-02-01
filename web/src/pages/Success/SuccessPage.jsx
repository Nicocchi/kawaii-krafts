import { BASE_URL, BASE_URL_N } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import styles from "./success.module.css";
import { useContext, useEffect, useState } from "react";

const SuccessPage = () => {
  const { token, user } = useContext(AuthContext);
  const [images, setImages] = useState([]);

  const {
    data: payments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/orders/payment-history/${user.customerId}`);

  const {
    data: productData,
    loading2,
    error2,
  } = useFetchData(`${BASE_URL}/products`);

  const findImageSrc = (id) => {
    let pr = productData?.filter((p) => p.stripeId === id)[0];
    return pr?.images[0];
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <h1>Loading</h1>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className={styles.wrapper}>
        <h1>Error</h1>
      </div>
    );
  }

  console.log(payments[0])

  return (
    <div className={styles.wrapper}>
      <h1>Order Purchased.</h1>
      <div className={styles.product}>
              <img
                className={styles.img}
                src={`${BASE_URL_N}/images/${findImageSrc(
                  payments[0]?.lines?.data[0]?.price.product
                )}`}
              />
              <div className={styles.productinfo}>
                <p>{payments[0]?.lines?.data[0]?.description}</p>
                <p>Quantity: {payments[0]?.lines?.data[0]?.quantity}</p>
              </div>
            </div>
      {/* {payments?.map((invoices) => {
        console.log(payments)
        return invoices?.lines?.data.map((product, i) => {
          console.log(product);
          return (
            <div key={i} className={styles.product}>
              <img
                className={styles.img}
                src={`${BASE_URL_N}/images/${findImageSrc(
                  product.price.product
                )}`}
              />
              <div className={styles.productinfo}>
                <p>{product.description}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          );
        });
      })} */}
    </div>
  );
};

export default SuccessPage;
