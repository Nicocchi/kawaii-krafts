import React, { useState } from "react";
import styles from "./modal.module.css";

const Modal = ({ toggleModal, visible, children }) => {
  // remove scrollbars when modal is active
  if (visible) {
    document.body.classList.add(styles.active);
  } else {
    document.body.classList.remove(styles.active);
  }
  return (
    <>
      {visible && (
        <div className={styles.wrapper}>
          <div className={styles.overlay} onClick={toggleModal}></div>
          <div className={styles.content}>
            {children}
            <button className={styles.close} onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
