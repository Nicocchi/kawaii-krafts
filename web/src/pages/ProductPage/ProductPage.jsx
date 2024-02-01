import styles from "./ProductPage.module.css";
const BASE_URL = import.meta.env.VITE_API_URL;
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const ProductPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const {
    data: productData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/products/${params.id}`);

  const { dispatch } = useContext(CartContext);
  const notify = () => toast("Added to cart");

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
        product: productData[0],
        quantity,
      },
    });

    notify();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img
            src={`/img/${productData[0]?.images[0]}`}
            alt="Yazawa Nico Christmas Sticker"
            className={styles.img}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.rightT}>
            <h1 className={styles.title}>{productData[0]?.title}</h1>
            <span className={styles.span}>
              <p className={styles.price}>
                {toDollars(productData[0]?.price)} USD
              </p>
              <p className={styles.stock}>{productData[0]?.stock ? "In Stock" : "Out of Stock"}</p>
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
          </div>
          <div className={styles.rightB}>
            <button className={styles.buy} onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>{productData[0]?.description}</p>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductPage;
