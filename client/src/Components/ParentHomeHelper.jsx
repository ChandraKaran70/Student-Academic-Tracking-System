import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { parentLogout } from '../redux/action/parentAction'


const ParentHome = () => {
    const store = useSelector(store => store)
    const [name, setName] = useState("")

    useEffect(() => {

        if (store.parent.parent.parent.name) {
            setName(store.parent.parent.parent.name)
        }
    }, [store.parent.parent.parent.name])

    const history = useHistory()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(parentLogout())
        history.push('/')
    }



    return (
        <div className="container-fluid">
          
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h4 className="navbar-brand mt-1" href="">JNTUH</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button type="button" className="btn"><Link to="/parent"><li>{name.toUpperCase()}</li></Link></button>
                        </li>
                        {/* <li className="nav-item">
                            <button type="button" className="btn"><Link to="/parent/checkAttendance"><li>CHECK ATTENDANCE</li></Link></button>
                        </li> */}
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/parent/checkAttendance"><li>CHECK ATTENDANCE</li></Link></button>
                        </li>  
                      
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/parent/getMarks"><li>CHECK MARKS</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/parent/updateProfile"><li>UPDATE PROFILE</li></Link></button>
                        </li>
                    </ul>
                </div>
                <div>

                    <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn"><li>LOGOUT</li></button>

                </div>
            </nav>
        </div>
    )
}

export default ParentHome