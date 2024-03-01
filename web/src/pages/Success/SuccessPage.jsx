import { BASE_URL, BASE_URL_N } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import styles from "./success.module.css";
import { useContext, useEffect, useState } from "react";
import loadingIcon from "../../components/LoadingIcon/LoadingIcon.svg";

// TODO (Nico): Refactor into separate file to import
const toDollars = (value) => {
  return (value / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const SuccessPage = () => {
  const { token, user } = useContext(AuthContext);
  const [images, setImages] = useState([]);

  const {
    data: payments,
    loading,
    error,
  } = useFetchData(`orders/payment-history/${user.customerId}`);

  const {
    data: productData,
    loading2,
    error2,
  } = useFetchData(`products`);

  const findImageSrc = (id) => {
    if (!productData?.data?.filter) return "";
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

  const paidOn = new Date(payments?.data[0]?.period_end);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div>
          <h1 className={styles.title}>Order Success</h1>
          <p>
            Thank you for shopping with us! We really appreciate your service.
            We will begin working on your order ASAP and will email you shipping
            details within the next 12 hours.
          </p>
        </div>
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
          <tr>
            <td>
              <img
                src={`/img/${findImageSrc(
                  payments?.data[0]?.lines?.data[0]?.price.product
                )}`}
                className={styles.img}
              />
            </td>
            <td>
              <p>{payments?.data[0]?.lines?.data[0]?.description}</p>
            </td>
            <td>
              <p>{payments?.data[0]?.lines?.data[0]?.quantity}</p>
            </td>
            <td>
              <p>{`${toDollars(payments?.data[0]?.total)} USD`}</p>
            </td>
            <td>
              <p>{paidOn.toDateString()}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SuccessPage;
