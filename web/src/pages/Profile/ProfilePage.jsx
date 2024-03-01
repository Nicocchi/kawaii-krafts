import styles from "./profile.module.css";
import useGetProfile from "../../hooks/useFetchData";
const BASE_URL = import.meta.env.VITE_API_URL;
import Modal from "../../components/core/Modal/Modal";
import { useContext, useState } from "react";
import axios from "../../utils/axios.config";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const [modal, setModal] = useState(false);
  // const [editName, setEditName] = useState(false);
  // const [name, setName] = useState("");
  // const [editEmail, setEditEmail] = useState(false);
  // const [name, setName] = useState("");
  const { token, user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [resetFormData, setResetFormData] = useState({
    password: "",
  });
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const toggleModal = () => {
    setModal(!modal);
  };

  const onHandleResetInputChange = (e) => {
    setResetFormData({ ...password, [e.target.name]: e.target.value });
  };

  const onResetSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/resetp`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: resetFormData.password,
          id: userData._id,
        }),
      });
  
      const result = await res.json();
      setChangePassword(false);
  
      toast("Password Changed");
    } catch (error) {
      toast("Error changing password");
    }
  };

  // console.log(userData);

  return (
    <div className={styles.wrapper}>
      <span>
        Name: <p>{userData?.name}</p>
      </span>
      <span>
        Email: <p>{userData?.email}</p>
      </span>
      <input
        type="password"
        name="password"
        placeholder="password"
        className={changePassword ? styles.password : styles.hidden}
        disabled={!changePassword}
        onChange={onHandleResetInputChange}
      />
      <button
        onClick={onResetSubmitHandler}
        className={changePassword ? styles.button : styles.hidden}
      >
        Save
      </button>
      <button className={styles.button} onClick={() => setChangePassword(!changePassword)}>
        {changePassword ? "Cancel Password Change" : "Change Password"}
      </button>
      <Toaster />
    </div>
  );
};

export default ProfilePage;
