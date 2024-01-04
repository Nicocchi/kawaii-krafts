import styles from "./profile.module.css";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
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
      console.log("toggle?", modal);
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
