import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.links}>
        <NavLink className={styles.link}>Terms</NavLink>
        <NavLink className={styles.link}>Privacy Policy</NavLink>
        <NavLink className={styles.link}>Return Policy</NavLink>
      </div>
      <p className={styles.copyright}>
        Copyright © Nicocchi / All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
