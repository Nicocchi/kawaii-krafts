import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div>
          <h1 className={styles.title}>About Kawaii Krafts</h1>
          <p>
            Kawaii Krafts was started by Jeremy Boggs, a software engineer and
            artist struggling to find work. So, I decided to start selling my
            custom artworks with a shop that I built from the ground up by
            myself as a display of what I am capable of making.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
