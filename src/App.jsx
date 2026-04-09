
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from"react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./pages/Home";
import Bundles from "./pages/Bundles";
import BundleDetails from "./pages/BundleDetails";
// ----   import Login from "./pages/Login";   ----
import MyPurchased from "./pages/MyPurchases";
import Navbar from './components/layout/Navbar';
import AuthModal from './components/modal/AuthModal';


const App = () => {

  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <BrowserRouter>

        {/* Navbar gets control  */}
        <Navbar openAuth={() => setAuthOpen(true)} ></Navbar>

        <Routes>
          <Route path='/' element={<Home openAuth={() => setAuthOpen(true)} />} ></Route>
          <Route path='/bundles' element={<Bundles openAuth={() => setAuthOpen(true)} />} ></Route>
          <Route path='/bundle/:id' element={<BundleDetails openAuth={() => setAuthOpen(true)} />} ></Route>
          {/* ----    <Route path='/login' element={<Login />} ></Route>     ---- */}
          <Route path='/my-purchases' element={<MyPurchased />} ></Route>
        </Routes>

        {/* Global Modal  */}
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      </BrowserRouter>

      {/* Global Toast  */}
      <ToastContainer position="top-right" autoClose={2000} />
      
    </>
  )
}

export default App