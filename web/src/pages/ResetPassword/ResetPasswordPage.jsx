import { useParams } from "react-router-dom";
import axios from "../../utils/axios.config";
import { useState } from "react";
import styles from "./reset.module.css";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const params = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const onHandleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post(
        `/auth/reset/${params.id}/${params.token}`,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    setLoading(true);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Password Reset</h1>
      {isReset ? (
        <div><h2 className={styles.subtitle}>Password has been reset.</h2></div>
      ) : (
        <div>
          <input
            name="password"
            placeholder="Password"
            type="password"
            className={styles.input}
            onChange={onHandleInputChange}
            required
          />
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className={styles.input}
            onChange={onHandleInputChange}
            required
          />
          <div>
            <button className={styles.button} onClick={onSubmit}>
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
