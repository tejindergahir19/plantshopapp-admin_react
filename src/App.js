import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import ChatPage from "./pages/ChatPage";


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
