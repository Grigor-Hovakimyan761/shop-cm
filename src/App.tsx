import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import MainTemplates from "./templates/MainTemplates";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import "./App.css";
import ProductDetail from "./pages/ProductDetail";

function UrlResetter() {
  const location = useLocation();
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    if (window.location.hash) {
     
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, document.title, cleanUrl); 
    }
  }, []);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <UrlResetter />
      <Routes>
        <Route path="/" element={<MainTemplates />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="category" element={<Category />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
