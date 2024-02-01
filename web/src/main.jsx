import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorPage, Home } from "./pages/index.js";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

import About from "./pages/About/AboutPage.jsx";
import FAQ from "./pages/FAQ/FAQPage.jsx";
import Cart from "./pages/ShoppingCart/ShoppingCartPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import CancelPage from "./pages/Cancelled/CancelPage.jsx";
import SuccessPage from "./pages/Success/SuccessPage.jsx";
import { CatalogContextProvider } from "./context/CatalogContext.jsx";
import Catalog from "./pages/Catalog/CatalogPage.jsx";

function Main() {
  const [roles, setRoles] = useState([]);

  return (
    <main id="main">
      <Routes>
        <Route path="/" element={<App />}>
          {/** Public routes */}
          <Route index element={<Home />} />

          <Route path="/catalog" element={<Catalog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/success" element={<SuccessPage />} />

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
      <CatalogContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </CartContextProvider>
      </CatalogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
