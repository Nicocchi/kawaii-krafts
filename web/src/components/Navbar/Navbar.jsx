import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { useState, useContext } from "react";
import useToggle from "../../hooks/useToggle";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../core/Modal/Modal";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Dropdown } from "../../context/DropdownContext";


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

  const goToBilling = () => {
    window.location.href = "https://billing.stripe.com/p/login/test_8wM4kk9sR8rI9J65kk";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="./img/logo.png" onClick={() => navigate("/")} />
      </div>
      <div className={styles.nav}>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/catalog")}>Catalog</button>
          </li>
          <li>
            <button onClick={() => navigate("/about")}>About</button>
          </li>
          <li>
            <button onClick={() => navigate("/contact")}>Contact</button>
          </li>
          {/* <li>
            <button onClick={() => navigate("/cart")}>Cart</button>
          </li> */}
          {token && user ? (
            <Dropdown>
              <Dropdown.Button>{user?.name}</Dropdown.Button>
              <Dropdown.Content>
                <Dropdown.List>
                  <Dropdown.Item onClick={() => navigate("/profile")} >Profile</Dropdown.Item>
                  <Dropdown.Item onClick={goToBilling}>Billing</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/orders")}>Orders</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.List>
              </Dropdown.Content>
            </Dropdown>
          ) : (
            <li>
              <button onClick={toggleModal}>Log in</button>
            </li>
          )}
          <FaShoppingCart size={25} className={styles.icon} onClick={() => navigate("/cart")} />
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
