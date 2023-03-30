import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import instance from "../../axios/axios";
import { useDispatch } from "react-redux";
import {setLogin} from '../../reduxStore/authSlice';




function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showerror, setShowError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  

    useEffect(()=>{
        setTimeout(()=>{
            showerror && setShowError(false);
        },2000)
    },[showerror])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === null || email === '' || email === undefined) {
            setError("Email is required");
            setShowError(true);
        } else if(password === null || password === '' || password === undefined){
            setError("Password is required");
            setShowError(true);
        }else {

            await instance.post('/auth/login', {
                email,
                password,
                }).then(response => {
                    dispatch(
                        setLogin({
                          user: response.data.user,
                          token: response.data.token,
                        })
                      );
                    navigate('/')
                }).catch(error => {
                    console.log(error,"here")
                    setError(error.response.data.error);
                    setShowError(true);
                })
            }
        };

   

    return (



        <div className="container d-flex-column justify-content-center align-items-center ">
             <h1 className="text-white">Login</h1>
           
            <form onSubmit={handleSubmit} className="needs-validation mb-3">

            {showerror && <p style={{color:'red'}}>{error}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
    
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Login
                </button>

            </form>
            <div>

            <span><h6 className="text-white">Need a Account?<Link to={'/signup'}>Signup</Link></h6></span>

            </div>

        </div>
    );
}

export const Login = LoginForm;