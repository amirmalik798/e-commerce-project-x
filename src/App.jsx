import { useContext, useState } from 'react';
import './App.css'
import { Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home";
import Auth from './pages/Auth';
import CheckOut from "./pages/CheckOut";
import NavBar from "./components/NavBar";
import AuthProvider from './context/AuthContext';
import ProductDetails from './pages/ProductsDetails';
import CartProvider from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route> 
      </Routes>
    </div>
    </CartProvider>
    </AuthProvider>
  )
}

export default App

// REACT COMPONENTS -> JS FUNCTIONS THAT RETURN JSX
// REACT ROUTER DOM