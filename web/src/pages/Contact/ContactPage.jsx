import styles from "./contact.module.css";

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div>
          <h1 className={styles.title}>Contact Me</h1>
          <span className={styles.span}>
            <p>
              For questions regarding me, my work, or business, you can contact
              me at
            </p>{" "}
            <p className={styles.email}>jeremyboggs776@gmail.com</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
