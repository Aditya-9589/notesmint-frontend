
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import apiClient from './services/apiClient';
import { setCredentials } from './store/slices/authSlice';
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ToastContainer } from"react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./pages/Home";
import Bundles from "./pages/Bundles";
import BundleDetails from "./pages/BundleDetails";
// ----   import Login from "./pages/Login";   ----
import MyPurchased from "./pages/MyPurchases";
import Navbar from './components/layout/Navbar';
import AuthModal from './components/modal/AuthModal';
import MyPurchases from './pages/MyPurchases';
import BundleNotes from './pages/BundleNotes';


const App = () => {

  const [authOpen, setAuthOpen] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await apiClient.get("/auth/me");

          dispatch(setCredentials({
            user: res.data.user,
            token,
          }));
        }   catch (error) {
          console.error("Auto login failed", error);
        }
      }
    };

    fetchUser();
  }, [token, dispatch]);

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
          {/* <Route path='/my-purchases' element={<MyPurchased />} ></Route> */}
          <Route path="/my-purchases" element={token ? <MyPurchases /> : <Navigate to="/" />} ></Route>

          <Route path='/notes/:id' element={token ? <BundleNotes /> : <Navigate to="/" />} ></Route>

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