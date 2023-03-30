import React, { useEffect, useState } from 'react';
import instance from '../../axios/axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from '../../reduxStore/authSlice';



function AdminHome() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([])
    const [BlockUsered, setBlockUser] = useState(false)


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)



    useEffect(() => {
        instance.get('/admin/home').then((response) => {
            console.log(response)
            setUsers(response.data.AllUsers);
        })
    },[])

    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/adminlogin");
    };

    const onChangeHandler = (e) => {
        console.log('working');
        const searchData = e.target.value;
        setSearch(searchData);
        if (searchData !== "") {
          const newPacientes = users.length > 0 ? users.filter((value) =>
            value.fullname && value.fullname.includes(searchData)
          ) : [];
          console.log("newPacientes", newPacientes);
          setFilteredUsers(newPacientes);
        }
      };

    const BlockUser=(async(userId)=>{
        console.log('user block');
        await instance.post(`admin/blockuser/${userId}`).then((response)=>{
        console.log(response);
        setBlockUser((prev)=>{
      return{
        ...prev,
        [userId]:true
      }
        })
      instance.get('/admin/getUser').then((respose)=>{
          setUsers(respose.data.AllUsers)
              })
      
        })
      
      
      })

      const unBlockUser=(async(userId)=>{
        console.log('uswer cliked');
        await instance.post(`admin/unblockuser/${userId}`).then((response)=>{
        const unblock=response.data
        setBlockUser((prev)=>{
          return{
            ...prev,
            [userId]: false
          }
        })
        instance.get('/admin/getUser').then((response)=>{
          setUsers(response.data.AllUsers)
              })
        })
        })

    


    return (
        <div style={{backgroundColor:"white"}}>

            <nav style={{ backgroundColor: "green" }} className="p-4 w-100 h-25 d-flex justify-content-between">
                <h1 style={{ color: "white" }}>Home</h1>
                <h2>User Managment</h2>
                <button className="btn btn-alert " style={{ backgroundColor: 'red' }} onClick={handleLogout}>Logout</button>
            </nav>

            <div className="container " style={{ marginTop: 100 }}>
                <div className="col-4 d-flex m-auto">
                    <input type="text"
                        id="exampleForm2"
                        className="form-control"
                        autoFocus
                        onChange={onChangeHandler}
                        placeholder='Serach....' />
                    <button className='btn btn-primary'>Search</button>
                </div>

            </div>

            <table className="table " style={{ marginTop: 110 }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">id</th>
                        <th scope="col">Block user</th>
                    </tr>
                </thead>
                {search === "" && users.map((obj, index) => {

                    return (


                        <tbody>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{obj.fullname}</td>
                                <td>{obj.email} {obj.isBlocked || BlockUsered[obj._id] ? <span className='text-danger fw-bolder ms-2 mt-1'>Blocked</span> : ''}</td>
                                <td>{obj._id}</td>


                                {obj.isBlocked === true || BlockUsered[obj._id] ?

                                    (
                                        <td><button onClick={() => unBlockUser(obj._id)} className="btn btn-warning" >unblock</button></td>

                                    ) : (
                                        <td><button onClick={() => BlockUser(obj._id)} className="btn btn-danger" >Block</button></td>
                                    )
                                }

                            </tr>


                        </tbody>
                    )



                })}



                {search !== "" && filteredUsers.map((obj, index) => {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{obj.fullname}</td>
                                <td>{obj.email}{obj.isBlocked || BlockUsered[obj._id] ? <span className='text-danger fw-bolder ms-2 mt-1'>Blocked</span> : ''} </td>
                                <td>{obj._id}</td>


                                {obj.isBlocked === true || BlockUsered[obj._id] ?

                                    (
                                        <td><button onClick={() => unBlockUser(obj._id)} className="btn btn-warning" >unblock</button></td>

                                    ) : (
                                        <td><button onClick={() => BlockUser(obj._id)} className="btn btn-danger" >Block</button></td>
                                    )
                                }
                            </tr>


                        </tbody>
                    )


                })}
                {filteredUsers.length === 0 && search !== "" && (
                    <div className='d-flex w-100'>
                        <h1 className='justify-content-center'>No result</h1>
                    </div>
                )}

            </table>



        </div>
    )
}

export default AdminHome;
