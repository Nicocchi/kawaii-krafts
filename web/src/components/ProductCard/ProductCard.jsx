import styles from "./ProductCard.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

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
        <img
          src="img/sticker01.png"
          alt="Yazawa Nico Christmas Sticker"
          className={styles.img}
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.header}>Stickers</p>
        <p
          className={styles.title}
          onClick={() => navigate(`/product/${value._id}`)}
        >
          Yazawa Nico Christmas Sticker
        </p>
        <button
          className={styles.buy}
          onClick={() =>
            dispatch({
              type: "ADD",
              payload: value,
            })
          }
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
