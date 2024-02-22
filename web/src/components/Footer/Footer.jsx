import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.links}>
        <NavLink className={styles.link} to="/terms">Terms</NavLink>
        <NavLink className={styles.link} to="/privacy-policy">Privacy Policy</NavLink>
        <NavLink className={styles.link} to="/return-policy">Return Policy</NavLink>
      </div>
      <p className={styles.copyright}>
        © 2024, Kawaii Kraft
      </p>
    </footer>
  );
};

export default Footer;
