import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <App />
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
