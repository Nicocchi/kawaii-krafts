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
import { TiThMenu } from "react-icons/ti";

const MobileNavbar = () => {
  const [visible, setVisible] = useToggle();
  const navigate = useNavigate();
  const { user, role, token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(false);
    setVisible(!visible);
  };

  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const goToBilling = () => {
    window.location.href =
      "https://billing.stripe.com/p/login/test_8wM4kk9sR8rI9J65kk";
  };

  const goToPage = (value) => {
    setOpen(false);
    navigate(value);
  }

  return (
      <div className={styles.mWrapper}>
        <div className={styles.hamburgerMenu}>
          <TiThMenu
            size={30}
            className={styles.icon}
            onClick={() => setOpen(!open)}
          />
      </div>
      <ul className={open ? styles.mNav : styles.mClose}>
        <li>
          <button onClick={() => goToPage("/")}>Home</button>
        </li>
        <li>
          <button onClick={() => goToPage("/catalog")}>Catalog</button>
        </li>
        <li>
          <button onClick={() => goToPage("/about")}>About</button>
        </li>
        <li>
          <button onClick={() => goToPage("/contact")}>Contact</button>
        </li>
        {token && user ? (
          <Dropdown className={styles.mDropdown}>
            <Dropdown.Button>{user?.name}</Dropdown.Button>
            <Dropdown.Content>
              <Dropdown.List>
                <Dropdown.Item onClick={() => goToPage("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={goToBilling}>Billing</Dropdown.Item>
                <Dropdown.Item onClick={() => goToPage("/orders")}>
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.List>
            </Dropdown.Content>
          </Dropdown>
        ) : (
          <li>
            <button onClick={toggleModal}>Log in</button>
          </li>
        )}
        <FaShoppingCart
          size={25}
          className={styles.icon}
          onClick={() => goToPage("/cart")}
        />
      </ul>
      <Modal visible={visible} toggleModal={toggleModal}>
        <LoginModal />
      </Modal>
    </div>
  );
};

export default MobileNavbar;
