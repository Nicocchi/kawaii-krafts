import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.links}>
        <NavLink className={styles.link} to="/terms">Terms</NavLink>
        <NavLink className={styles.link} to="/privacy-policy">Privacy Policy</NavLink>
        <NavLink className={styles.link} to="/return-policy">Return Policy</NavLink>
      </div>
      <p className={styles.copyright}>
        Copyright © Nicocchi / All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
