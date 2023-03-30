import React, { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


function AdminLogin() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(email==='Admin' && password==='123456'){
            console.log('admin login success');
            navigate('/adminhome');
        }else{
            console.log("error")
            const err="Invalid Login"
            toast(err, {
                position: "top-right"
            })
        }
    }
    return (
        <div className='container d-flex-column justify-content-center align-items-center'>
             <h1 className="text-white">Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email"></label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}

                    />

                </div>
                <div className="form-group">
                    <label htmlFor="Password"></label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
    
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Login
                </button>
                <ToastContainer/>
            </form>
        </div>
    )
}

export default AdminLogin
