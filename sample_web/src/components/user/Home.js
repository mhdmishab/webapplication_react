import "bootstrap/dist/css/bootstrap.min.css";
import React,{useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setLogout} from '../../reduxStore/authSlice';


function Home() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/login");
      };

    return (
        <div>

            <nav style={{ backgroundColor: "green" }} className="p-4 w-100 h-25 d-flex justify-content-between">
                <h1 style={{ color: "white" }}>Home</h1>
                <h2>CRUD APP</h2>
                <button className="btn btn-alert " style={{ backgroundColor: 'red' }} onClick={handleLogout}>Logout</button>
            </nav>
            <div className="d-flex justify-content-center mt-5">
                <div className="card" style={{ width: "18rem" }}>
                    {user.picturePath?<img src={`http://127.0.0.1:5000/${user.picturePath}`} className="card-img-top" alt="...try again" />:<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" className="card-img-top" alt="...try again" />}
                    {user.fullname && (
                    <div className="card-body">
                        <h5 className="card-title mt-3">{user.fullname}</h5>
                    
                    </div>)}
                    <ul className="list-group list-group-flush">
                       <li className="list-group-item">{user.email}</li>
                        <li className="list-group-item">{user.phone}</li>
                        
                    </ul>
                    <button style={{backgroundColor: 'red'}} onClick={()=>navigate('/profile')}>Profile</button>
        
                </div>
            </div>
        </div>
    )
}

export default Home

//https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png
