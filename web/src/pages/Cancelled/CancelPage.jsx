import styles from "./cancel.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CancelPage = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
        <div>
          <h1 className={styles.title}>Order Cancelled</h1>
          <button className={styles.button} onClick={() => navigate("/")}>
              Return to homepage
            </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
