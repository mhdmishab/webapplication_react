

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import instance from "../../axios/axios";





function SignupForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullname === null || fullname === '' || fullname === undefined) {
      setError("Invalid fullname");
      setShowError(true)
      return
    } else if (password.length < 5) {
      setError("password should be greater than 5");
      setShowError(true)
      return
    } else if (email === null || email === '' || email === undefined) {
      setError("Invalid email");
      setShowError(true)
      return
    }else if(password !== confirmPassword){

      setError("passwords are not same");
      setShowError(true);

    } else {
      await instance.post('/auth/register', {
        fullname: fullname,
        email: email,
        password: password,

      }).then((response) => {
        console.log("inside axiosx`")
        console.log(response.data, 'response.data');
        console.log(response, 'response');
        navigate('/login');
      }).catch((error) => {
        setError(error.response.data.error)
        setShowError(true)
      })
    }
  };

  useEffect(()=>{
    setTimeout(()=> {
     showError && setShowError(false)
    },2500)
  },[showError])

  return (

    <div className="container d-flex-column justify-content-center align-items-center ">
      <h1 className="text-white">Sign Up</h1>
      <form onSubmit={handleSubmit} className="needs-validation" >
        {showError && <p style={{ color: 'red' }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Full Name</label>
          <input
            type="fullname"
            placeholder="Full Name"
            className="form-control"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}

          />
        </div>
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
          <div className="invalid-feedback">Please provide a valid email address.</div>
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
          <div className="invalid-feedback">Please provide a password.</div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
          <div className="invalid-feedback">Please confirm your password.</div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Sign up
        </button>
      </form>
      <div>
        <h6 className="text-white mt-2">Already have account?<Link to={'/login'}>Login</Link></h6>
      </div>
    </div>
  );
}

export const Signup = SignupForm;