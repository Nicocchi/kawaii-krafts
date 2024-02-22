import React from "react";
import styles from "./button.module.css";

export default function IconButton({
  children,
  disabled,
  icon,
  placeholder,
  width,
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.iconButton}
        disabled={disabled}
        style={{ width: `${width}px` }}
      >
        {icon && <div className={styles.iconBtn}>{icon}</div>}
      </button>
    </div>
  );
}
