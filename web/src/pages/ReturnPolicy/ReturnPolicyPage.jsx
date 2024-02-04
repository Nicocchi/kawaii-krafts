import styles from "./policy.module.css";

const ReturnPolicyPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div>
          <h1 className={styles.title}>Retrun Policy of Kawaii Krafts</h1>

          <p>
            We do not accept returns. If there is an issue regarding an order
            such as damaged product, product never arrived, etc, please contact
            me to see how we can fix the issue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
