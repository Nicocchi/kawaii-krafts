import React from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  disabled,
  icon,
  placeholder,
  width,
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <button
        className={styles.button}
        disabled={disabled}
        style={{ width: `${width}px` }}
      >{children}</button>
    </div>
  );
}
