import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { adminLogout } from '../../redux/action/adminAction'
import { adminAddTimetable } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'

import { useHistory, withRouter } from 'react-router-dom'

const AdminAddTimetable = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [department, setDepartment] = useState('')
    const [semester,setSemester] = useState('')
    const [year, setYear] = useState('')
    const [section, setSection] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("department", department)
        formData.append("year", year)
        formData.append("section", section)
        formData.append("semester",semester)
        formData.append("avatar", avatar)
        dispatch(adminAddTimetable(formData, history))
        setModal(true)
        alert("Kindly login again to see updates")
        dispatch(adminLogout())
        history.push('/')
    }
        return (
            <div>
                {store.admin.isAuthenticated ? <>
                    <AdminHomeHelper />
                    <div className="container mt-5">
                        <div className="row ">
                            <div className="col-md-5 w-100 m-auto">
                                <form onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="inputId">Time table</label>
                                        <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="departmentId">Department</label>
                                        <select onChange={(e) => setDepartment(e.target.value)} className="form-control" id="departmentId">
                                            <option>Select</option>
                                            <option value="C.S.E">C.S.E</option>
                                            <option value="E.C.E">E.C.E</option>
                                            <option value="E.E.E">E.E.E</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yearId">Year</label>
                                        <select onChange={(e) => setYear(e.target.value)} className="form-control" id="yearId">
                                            <option>Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="semesterId">Semester</label>
                                        <select onChange={(e) => setSemester(e.target.value)} className="form-control" id="semesterId">
                                            <option>Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="secId">Section</label>
                                        <select onChange={(e) => setSection(e.target.value)} className="form-control" id="secId">
                                            <option>Select</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </div>
                                   
                                    <button type="submit" className="btn btn-primary">Add/Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </> : (history.push('/'))}
                
            </div>
        )
    }

export default withRouter(AdminAddTimetable)
