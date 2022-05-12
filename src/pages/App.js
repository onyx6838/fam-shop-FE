import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import TopHeader from "../components/TopHeader/TopHeader";
import HeaderBottom from "../components/HeaderBottom/HeaderBottom";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Product from "./Product";
import Details from "./Details";
import Cart from "./Cart";
import Payment from "./Payment";
import React from "react";
import CategoryProduct from "./CategoryProduct";
import Login from "./Login";
import withAuth from "../HOC/withAuth";
import Register from "./Register";
import PaymentSuccess from "./PaymentSuccess";

function App() {
  const ProtectedRoutes = {
    Payment: withAuth(Payment)
  }

  return (
    <>
      <TopHeader />
      <HeaderBottom />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/details/:id' element={<Details />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/payment' element={<ProtectedRoutes.Payment />}></Route>
        <Route path='/category' element={<CategoryProduct />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/payment-success' element={<PaymentSuccess />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;