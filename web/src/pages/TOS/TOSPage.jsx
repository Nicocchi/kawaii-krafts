import { NavLink } from "react-router-dom";
import styles from "./policy.module.css";

const TOSPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div>
          <h1 className={styles.title}>Terms of Service of Kawaii Krafts</h1>

          <p>
            Please read these terms of service (“terms”, “terms of service”)
            carefully before using Kawaii Krafts website (the “service”)
            operated by Jeremy Boggs (“us”, ‘we”, “our”).
          </p>

          <h2 className={styles.subtitle}>Conditions of Use</h2>

          <p>
            We will provide their services to you, which are subject to the
            conditions stated below in this document. Every time you visit this
            website, use its services or make a purchase, you accept the
            following conditions. This is why we urge you to read them
            carefully.
          </p>

          <h2 className={styles.subtitle}>Privacy Policy</h2>

          <p>
            Before you continue using our website we advise you to read our
            privacy policy <NavLink to="/privacy-policy">here</NavLink>{" "}
            regarding our user data collection. It will help you better
            understand our practices.
          </p>

          <h2 className={styles.subtitle}>Copyright</h2>

          <p>
            Content published on this website (digital downloads, images, texts,
            graphics, logos) is the property of Jeremy Boggs and/or its content
            creators and protected by international copyright laws. The entire
            compilation of the content found on this website is the exclusive
            property of Jeremy Boggs, with copyright authorship for this
            compilation by Jeremy Boggs.
          </p>

          <h2 className={styles.subtitle}>Communications</h2>

          <p>
            The entire communication with us is electronic. Every time you send
            us an email or visit our website, you are going to be communicating
            with us. You hereby consent to receive communications from us. If
            you subscribe to the news on our website, you are going to receive
            regular emails from us. We will continue to communicate with you by
            posting news and notices on our website and by sending you emails.
            You also agree that all notices, disclosures, agreements, and other
            communications we provide to you electronically meet the legal
            requirements that such communications be in writing.
          </p>

          <h2 className={styles.subtitle}>Applicable Law</h2>

          <p>
            By visiting this website, you agree that the laws of the United
            States of America, without regard to principles of conflict laws,
            will govern these terms of service, or any dispute of any sort that
            might come between Jeremy Boggs and you, or its business partners
            and associates.
          </p>

          <h2 className={styles.subtitle}>Disputes</h2>

          <p>
            Any dispute related in any way to your visit to this website or to
            products you purchase from us shall be arbitrated by state or
            federal court United States of Amerca and you consent to exclusive
            jurisdiction and venue of such courts.
          </p>

          <h2 className={styles.subtitle}>Comments, Reviews, and Emails</h2>

          <p>
            Visitors may post content as long as it is not obscene, illegal,
            defamatory, threatening, infringing of intellectual property rights,
            invasive of privacy, or injurious in any other way to third parties.
            Content has to be free of software viruses, political campaigns, and
            commercial solicitation. We reserve all rights (but not the
            obligation) to remove and/or edit such content. When you post your
            content, you grant Jeremy Boggs non-exclusive, royalty-free and
            irrevocable right to use, reproduce, publish, modify such content
            throughout the world in any media.
          </p>

          <h2 className={styles.subtitle}>License and Site Access</h2>

          <p>
            We grant you a limited license to access and make personal use of
            this website. You are not allowed to download or modify it. This may
            be done only with written consent from us.
          </p>

          <h2 className={styles.subtitle}>User Account</h2>

          <p>
            If you are an owner of an account on this website, you are solely
            responsible for maintaining the confidentiality of your private user
            details (username and password). You are responsible for all
            activities that occur under your account or password. We reserve all
            rights to terminate accounts, edit or remove content and cancel
            orders at their sole discretion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TOSPage;
