import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const location = useLocation();
  return (
    <>
      <div>
        <Navbar />
        { location.pathname !== "/cart" ? <Hero /> : null}
        <div className={styles.main}>
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
