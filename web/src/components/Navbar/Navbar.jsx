import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { useState, useContext } from "react";
import useToggle from "../../hooks/useToggle";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../core/Modal/Modal";

const Navbar = () => {
  const [visible, setVisible] = useToggle();
  const navigate = useNavigate();
  const { user, role, token } = useContext(AuthContext);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="./img/logo.png" />
      </div>
      <div className={styles.nav}>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/about")}>About</button>
          </li>
          <li>
            <button onClick={() => navigate("/faq")}>Faq</button>
          </li>
          <li>
            <button onClick={() => navigate("/cart")}>Cart</button>
          </li>
          {token && user ? (
            <>
              <h1 onClick={() => navigate("/profile")}>{user?.name}</h1>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <li>
              <button onClick={toggleModal}>Log in</button>
            </li>
          )}
        </ul>
      </div>
      <Modal visible={visible} toggleModal={toggleModal}>
        <LoginModal />
      </Modal>
      {/* <LoginModal visible={visible} /> */}
    </div>
  );
};

export default Navbar;
