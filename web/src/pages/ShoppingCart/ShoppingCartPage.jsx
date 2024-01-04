import { useSelector, useDispatch } from "react-redux";
import styles from "./cart.module.css";
import { removeItem } from "../../features/shoppingCart/shoppingCartSlice";

const Cart = () => {
  const items = useSelector((state) => state.shoppingCart.items);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
        <span className={styles.span}><p></p><p>Product</p><p>Quantity</p><p></p></span>
        <div className={styles.items}>
      {Object.keys(items).map((itm) => {
        return (
          <div key={items[itm].id} className={styles.item}>
            <img src="" className={styles.img} />
            <p>{items[itm].name}</p>
            <p>{items[itm].quantity}</p>
            <button onClick={() => dispatch(removeItem(items[itm].id))}>Remove</button>
          </div>
        );
      })}
      </div>
      <button>Continue to Checkout</button>
    </div>
  );
};

export default Cart;
