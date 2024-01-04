import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import SearchCard from "../../components/SearchCard/SearchCard.jsx";
import styles from "./home.module.css";
const BASE_URL = import.meta.env.VITE_API_URL;
import useFetchData from "../../hooks/useFetchData";

const Home = () => {
  const {
    data: productData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/products`);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <SearchCard />
      </div>
      <div className={styles.products}>
        {productData.map((product) => (
          <ProductCard
            key={product?._id}
            value={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
