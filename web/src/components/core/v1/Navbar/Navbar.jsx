import react, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import IconButton from "../Button/IconButton";

export const Navbar = ({ children, ...props }) => {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.text}>
          <img src="img/logo2.png" />
        </NavLink>
      </div>
      <div className={styles.elements}>
        <ul className={styles.list}>
          <li>
            <NavLink to="/" className={styles.text}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={styles.text}>
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={styles.text}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={styles.text}>
              Contact
            </NavLink>
          </li>
        </ul>
        <div className={styles.search}>
          <Input placeholder="Search" width={260} icon={<CiSearch />} />
          <IconButton icon={<VscAccount size={20} />} width={40} />
        </div>
      </div>
    </nav>
  );
};
