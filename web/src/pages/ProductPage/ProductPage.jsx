import styles from "./ProductPage.module.css";
const BASE_URL = import.meta.env.VITE_API_URL;
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL_CDN = import.meta.env.VITE_IMAGES_CDN;
import loadingIcon from "../../components/LoadingIcon/LoadingIcon.svg";

const ProductPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const {
    data: productData,
    loading,
    error,
  } = useFetchData(`products/${params.id}`);

  const { dispatch } = useContext(CartContext);
  const notify = () => toast("Added to cart");

  // TODO (Nico): Refactor into separate file to import
  const toDollars = (value) => {  
    return (value / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
  }
  

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function increment() {
    if (quantity >= 99) {
      return setQuantity(99);
    }

    setQuantity(quantity + 1);
  }

  function decrement() {
    if (quantity <= 1) {
      return setQuantity(1);
    }

    setQuantity(quantity - 1);
  }

  function handleInputChange(e) {
    if (quantity >= 99 || e.target.value >= 99) {
      return setQuantity(99);
    }

    if (quantity <= 1 || e.target.value <= 1) {
      return setQuantity(1);
    }

    setQuantity(e.target.value);
  }

  function addToCart() {
    dispatch({
      type: "ADD",
      payload: {
        product: productData?.data[0],
        quantity,
      },
    });

    notify();
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <img src={loadingIcon} width={200} />
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.imgWrapper}>
          <img
            src={`${BASE_URL_CDN}/${productData?.data[0]?.images[0]}`}
            alt="Yazawa Nico Christmas Sticker"
            className={styles.img}
          />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightT}>
            <h1 className={styles.title}>{productData?.data[0]?.title}</h1>
            <span className={styles.span}>
              <p className={styles.price}>
                {toDollars(productData?.data[0]?.price)} USD
              </p>
              <p className={styles.stock}>{productData?.data[0]?.stock ? "In Stock" : "Out of Stock"}</p>
            </span>

            <p className={styles.quantity}>Quantity</p>
            <div className={styles.numberInput}>
              <button onClick={decrement} className={styles.minus}></button>
              <input
                type="number"
                disabled={true}
                min="1"
                max="99"
                step="1"
                value={quantity}
                onChange={(e) => handleInputChange(e)}
              />
              <button className={styles.plus} onClick={increment}></button>
            </div>
            <div className={styles.summary}>
            <p>{productData?.data[0]?.summary}</p>
            </div>
          </div>
          <div className={styles.rightB}>
            <button className={styles.buy} disabled={!productData?.data[0]?.stock} onClick={addToCart}>
              {productData?.data[0]?.stock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>{productData?.data[0]?.description}</p>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductPage;
