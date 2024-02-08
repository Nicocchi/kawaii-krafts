import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import useToggle from "../../hooks/useToggle";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { BASE_URL } from "../../config.js";
import toast, { Toaster } from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";

import axios from "../../utils/axios.config";

const LoginModal = ({ visible }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useToggle();
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [resetFormData, setResetFormData] = useState({
    email: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  // const notify = () => toast("Added to cart");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  const handleOutsideClick = () => {
    setShowModal(false);
  };

  const ref = useOutsideClick(handleOutsideClick);

  const onHandleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHandleLoginInputChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const onHandleResetInputChange = (e) => {
    setResetFormData({ ...resetFormData, [e.target.name]: e.target.value });
  };

  const onRegisterSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast("Successfully registered.");
      //toast.success(message)
      // navigate to login
      console.log(message);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  const onLoginSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/auth/login", JSON.stringify(loginFormData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: res.data.data,
            token: res.data.token,
            role: res.data.role,
          },
        });
        setLoading(false);
        setShowModal(false);
        toast("Successfully logged in");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });

    setLoading(true);
  };

  const onResetSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(resetFormData);
    axios
      .post("/auth/forgot", JSON.stringify(resetFormData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setLoading(false);
        setResetting(true);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });

    setLoading(true);
  };

  const loginForm = () => {
    return (
      <form className={styles.form}>
        <input
          name="email"
          placeholder="email"
          type="email"
          className={styles.input}
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
          onChange={onHandleLoginInputChange}
          required
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={onHandleLoginInputChange}
          required
        />
        <div>
          <button className={styles.button} onClick={onLoginSubmitHandler}>
            Login
          </button>
        </div>
      </form>
    );
  };

  const registerForm = () => {
    return (
      <form className={styles.form} onSubmit={onRegisterSubmitHandler}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          className={styles.input}
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
          onChange={onHandleInputChange}
          required
        />
        <input
          name="name"
          placeholder="Full Name"
          type="text"
          className={styles.input}
          onChange={onHandleInputChange}
          required
        />
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
          <button className={styles.button} onClick={onRegisterSubmitHandler}>
            Register
          </button>
        </div>
      </form>
    );
  };

  if (passwordReset) {
    return (
      <div>
        <form className={styles.form} onSubmit={onResetSubmitHandler}>
          {resetting ? (
            <p>
              If an account exists with this email, further instructions will be
              sent to the email given
            </p>
          ) : (
            <input
              name="email"
              placeholder="Email"
              type="email"
              className={styles.input}
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              onChange={onHandleResetInputChange}
              required
            />
          )}

          <div>
            <button className={styles.button} onClick={onResetSubmitHandler}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {form ? registerForm() : loginForm()}
      <div>
        {!form ? (
          <>
            <span className={styles.span}>
              <p>Don't have an account?</p>
              <p className={styles.link} onClick={setForm}>
                Register
              </p>
            </span>
            <span className={styles.span}>
              <p>Forgot password?</p>
              <p className={styles.link} onClick={() => setPasswordReset(true)}>
                Reset Password
              </p>
            </span>
          </>
        ) : (
          <span className={styles.span}>
            <p>Have an account?</p>
            <p className={styles.link} onClick={setForm}>
              Login
            </p>
          </span>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default LoginModal;
