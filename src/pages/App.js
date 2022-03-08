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

function App() {
  

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
        <Route path='/payment' element={<Payment />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;