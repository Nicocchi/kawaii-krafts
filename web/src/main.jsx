import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorPage, Home } from "./pages/index.js";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

// redux
import { Provider } from "react-redux";
import store from "./store.js";
import About from "./pages/About/AboutPage.jsx";
import FAQ from "./pages/FAQ/FAQPage.jsx";
import Cart from "./pages/ShoppingCart/ShoppingCartPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";

function Main() {
  const [roles, setRoles] = useState([]);

  return (
    <main id="main">
      <Routes>
        <Route path="/" element={<App />}>
          {/** Public routes */}
          <Route index element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />

          {/** Private routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/** 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
