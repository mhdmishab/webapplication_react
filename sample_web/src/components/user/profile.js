
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import React, { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setLogin } from '../../reduxStore/authSlice';
import instance from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
    const user = useSelector(state => state.auth.user);
    console.log(user, "useerrrrrrrrrrrrrrrrrrrr")
    const token = useSelector((state) => state.auth.token);

    const [image, setImage] = useState('');
    const [data, setData] = useState("")

    function handleImage(e) {
        setImage(e.target.files[0])
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/login");
    };

    const generateError = (err) => toast.error(err, {
        position: "top-right"
    })

    const [values, setValues] = useState({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData()
            formData.append('image', image)
            instance.post(`/auth/updateimage/${user._id}`, formData).then((res) => {
                setData(res.data)
                console.log(res.data);
            })


            const { data } = await instance.post('/auth/update', {
                fullname: values.fullname,
                email: values.email,
                phone: values.phone,
                userId: user._id,
            })

            console.log("sdfghgfds");
            if (data) {
                if (data.errors) {
                    generateError("Enter Correct values");
                } else {
                    dispatch(
                        setLogin({
                            user: data.user,
                            token: token
                        })
                    );
                    navigate('/')
                }
            }
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div>
            <nav style={{ backgroundColor: "green" }} className="p-4 w-100 h-25 d-flex justify-content-between">
                <h1 style={{ color: "white" }}>Home</h1>
                <h2>CRUD APP</h2>
                <button className="btn btn-alert " style={{ backgroundColor: 'red' }} onClick={handleLogout}>Logout</button>
            </nav>

            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input className="text-white" type={'file'} onChange={handleImage} />
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="fullname"
                            className="form-control"
                            value={values.fullname}
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={values.email}
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phonenumber">Phonenumber</label>
                        <input
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            className="form-control"
                            value={values.phone}
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" >Update</button>
                    <button style={{ backgroundColor: 'red' }} className="btn btn-primary mt-3" onClick={() => navigate('/')}>Home</button>
                    <ToastContainer />
                </form>

            </div>

        </div>

    )
}

export default Profile
