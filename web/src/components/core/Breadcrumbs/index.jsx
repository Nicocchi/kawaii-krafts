import { Link, useLocation } from "react-router-dom";
import styles from "./breadcrumbs.module.css";

const Breadcrumbs = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link
        to="/"
        className={location.pathname === "/" ? 
        styles.active : styles.default}
      >
        Home
      </Link>
      <span className={styles.arrow}>&gt;</span>
      <Link
        to="all-items"
        className={location.pathname.startsWith("/all-items") ? 
        styles.active : styles.default}
      >
        All items
      </Link>
      <span className={styles.arrow}>&gt;</span>
      <Link
        to="/stickers"
        className={location.pathname === "/all-items/stickers" ? 
        styles.active : styles.default}
      >
        Stickers
      </Link>
    </nav>
  );
};

export default Breadcrumbs;
