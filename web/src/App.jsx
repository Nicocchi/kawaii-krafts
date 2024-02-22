//import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
// import { Navbar } from "./components/core/v1/Navbar/Navbar.jsx"

function App() {
  const location = useLocation();
  const allowedPages = ["/", "/about", "/faq"]
  return (
    <>
      <div>
        <Navbar />
        <div className={styles.main}>
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
