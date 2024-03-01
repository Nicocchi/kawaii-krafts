import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import SearchCard from "../../components/SearchCard/SearchCard.jsx";
import styles from "./home.module.css";
const BASE_URL = import.meta.env.VITE_API_URL;
import useFetchData from "../../hooks/useFetchData";
import loadingIcon from "../../components/LoadingIcon/LoadingIcon.svg";

const Home = () => {
  const {
    data: productData,
    loading,
    error,
  } = useFetchData(`products`);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.products}>
          <img src={loadingIcon} width={200} />
        </div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    if (loading) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.products}>
            <h1>Error</h1>
          </div>
        </div>
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Featured Products</h1>
      <div className={styles.products}>
        {productData.data
          .filter((product) => product.featured)
          .map((product) => (
            <ProductCard key={product?._id} value={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;
