import React from "react";
import styles from "./input.module.css";

export default function Input({
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
      <input
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: `${width}px` }}
      />
    </div>
  );
}
