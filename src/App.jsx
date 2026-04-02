
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Bundles from "./pages/Bundles";
import BundleDetails from "./pages/BundleDetails";
import Login from "./pages/Login";
import MyPurchased from "./pages/MyPurchases";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/bundles' element={<Bundles />} ></Route>
        <Route path='/bundle/:id' element={<BundleDetails />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/my-purchases' element={<MyPurchased />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App