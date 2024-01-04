import styles from "./ProductCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../features/shoppingCart/shoppingCartSlice";
import { useEffect, useState } from "react";

const ProductCard = ({ value }) => {
  const [item, setItem] = useState();

  useEffect(() => {
    setItem(value);
  }, [item]);

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <img
          src="img/sticker01.png"
          alt="Yazawa Nico Christmas Sticker"
          className={styles.img}
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.header}>Stickers</p>
        <p className={styles.title}>Yazawa Nico Christmas Sticker</p>
        <button className={styles.buy} onClick={() => dispatch(add(item))}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
