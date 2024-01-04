import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import SearchCard from "../../components/SearchCard/SearchCard.jsx";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
      <SearchCard />
      </div>
      <div className={styles.products}>
        <ProductCard value={{id: "01", name: "Sticker 01", quantity: 1}} />
        <ProductCard value={{id: "02", name: "Sticker 02", quantity: 1}} />
        <ProductCard value={{id: "03", name: "Sticker 03", quantity: 1}} />
        <ProductCard value={{id: "04", name: "Sticker 04", quantity: 1}} />
        <ProductCard value={{id: "05", name: "Sticker 05", quantity: 1}} />
        <ProductCard value={{id: "06", name: "Sticker 06", quantity: 1}} />
        <ProductCard value={{id: "07", name: "Sticker 07", quantity: 1}} />
      </div>
    </div>
  );
};

export default Home;
