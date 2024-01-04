import styles from "./profile.module.css";
import useGetProfile from "../../hooks/useFetchData";
const BASE_URL = import.meta.env.VITE_API_URL;
import Modal from "../../components/core/Modal/Modal";
import { useState } from "react";

const ProfilePage = () => {
    const [modal, setModal] = useState(false);
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const toggleModal = () => {
      setModal(!modal);
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={toggleModal}>Open</button>
      <p>Profile</p>
      <Modal toggleModal={toggleModal} visible={modal}/>
    </div>
  );
};

export default ProfilePage;
