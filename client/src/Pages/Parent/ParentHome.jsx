import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import ParentHomeHelper from '../../Components/ParentHomeHelper'
import { useEffect } from 'react';

const ParentHome = () => {
    const store = useSelector((store) => store)
   

    const history = useHistory()
    return (
        <div>
           
            {store.parent.isAuthenticated ? <>
                <ParentHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={store.parent.parent.parent.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{store.parent.parent.parent.name}</h5>
                                            <h5 className="card-title">{store.parent.parent.parent.registrationNumber}</h5>
                                            {/* <Link to='/faculty/updateProfile'>UPDATE PROFILE</Link> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{store.parent.parent.parent.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{store.parent.parent.parent.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{store.parent.parent.parent.registrationNumber}</td>
                                            </tr>
                                          
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{store.parent.parent.parent.parentMobileNumber ?
                                                    store.parent.parent.parent.parentMobileNumber : "NA"}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>{store.parent.parent.parent.gender}</td>
                                                   
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </div>
                </> : (history.push('/'))}
                
        </div>
    )
}

export default ParentHome