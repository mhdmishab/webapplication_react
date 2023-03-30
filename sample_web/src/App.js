import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/user/Home";
import {Login} from "./components/user/Login";
import {Signup} from "./components/user/Signup";
import Profile from "./components/user/profile";
import AdminLogin from "./components/admin/AdminLogin"
import AdminHome from './components/admin/AdminHome'
import './App.css';
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.token);
  return (
    <div className="App bg-dark min-vh-100 ">

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={token?<Home/>:<Login/>} />
          <Route exact path="/login" element={!token?<Login/>:<Home/>} />
          <Route exact path="/signup" element={!token?<Signup/>:<Home/>} />
          <Route exact path="/profile" element={token?<Profile/>:<Login/>} />
          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path='/adminhome' element={<AdminHome/>} />
        </Routes>
      </BrowserRouter>

      
     
    </div>
  );
}

export default App;
