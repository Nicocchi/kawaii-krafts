import styles from "./ProductCard.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
const BASE_URL = import.meta.env.VITE_IMAGES_CDN;

const ProductCard = ({ value }) => {
  const [item, setItem] = useState();

  useEffect(() => {
    setItem(value);
  }, [item]);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dispatch } = useContext(CartContext);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.top}
        onClick={() => navigate(`/product/${value._id}`)}
      >
        <div className={styles.imgWrapper}>
          <img
            src={`${BASE_URL}/${value?.images[0]}`}
            alt="Yazawa Nico Christmas Sticker"
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.header}>Stickers</p>
        <p
          className={styles.title}
          onClick={() => navigate(`/product/${value._id}`)}
        >
          {value.title}
        </p>
        <button disabled={!value?.stock} className={styles.buy}>
          {value?.stock ? "In Stock" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
