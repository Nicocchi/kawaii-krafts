import styles from "./cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { dispatch, cart } = useContext(CartContext);

  const onQuantityChange = (e, item) => {
    let quantity = e.target.value;
    item.quantity = quantity;
    dispatch({
      type: "UPDATE",
      payload: item,
    })
  }

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (cart === null) {
    return (
      <div className={styles.wrapper}>
      <span className={styles.span}>
        <p></p>
        <p>Product</p>
        <p>Quantity</p>
        <p>Price</p>
        <p></p>
      </span>
      <button className={styles.button}>Continue to Checkout</button>
    </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.span}>
        <p></p>
        <p>Product</p>
        <p>Quantity</p>
        <p>Price</p>
        <p></p>
      </span>
      {/* // TODO: These should be in a table */}
      <div className={styles.items}>
        {Object.keys(cart).map((itm) => {
          return (
            <div key={cart[itm]._id} className={styles.item}>
              <img src="" className={styles.img} />
              <p>{cart[itm].title}</p>
              <input name="quantity" className={styles.number} onChange={(e) => onQuantityChange(e, cart[itm])} value={cart[itm].quantity} type="number" />
              <p>{USDollar.format(cart[itm].price * cart[itm].quantity)}</p>
              <button
              className={styles.button}
                onClick={() =>
                  dispatch({
                    type: "REMOVE",
                    payload: {
                      key: cart[itm]._id,
                    },
                  })
                }
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <button className={styles.button}>Continue to Checkout</button>
    </div>
  );
};

export default Cart;
