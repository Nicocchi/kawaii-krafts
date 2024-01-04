import Breadcrumbs from "../core/Breadcrumbs";
import styles from "./SearchCard.module.css";

const SearchCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.button}>Stickers</div>
        <div className={styles.button}>Mugs</div>
      </div>
    </div>
  );
};

export default SearchCard;
