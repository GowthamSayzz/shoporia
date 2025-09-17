import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import NavBar from './shared/Navbar';
import Home from './Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown.js.map';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './shared/SignIn.js';
import Signup from './shared/Signup.js';
import ResetPassword from './shared/ResetPassword.js';
import Search from './Products/Search.js';
import SingleProduct from './Products/SingleProduct.js';
import Address from './Address/Addresses.js';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path="/signin" Component={SignIn} />
        <Route path='/signup' Component={Signup} />
        <Route path='/forgot-password' Component={ResetPassword} />
        <Route path='/product-search' Component={Search} />
        <Route path='/addresses' Component={Address} />
        <Route path='/product/:productId' Component={SingleProduct} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
