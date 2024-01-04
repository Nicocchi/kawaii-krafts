import styles from "./ProductPage.module.css";
const BASE_URL = import.meta.env.VITE_API_URL;
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const {
    data: productData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/products/${params.id}`);

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={styles.wrapper}>
      <p>{productData?.title}</p>
      <p>{productData?.description}</p>
      <p>Quantity: {productData?.quantity}</p>
      <p>Price: {USDollar.format(productData?.price)}</p>
    </div>
  );
};

export default ProductPage;
