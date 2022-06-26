import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddParent } from '../redux/action/adminAction'
import AdminHomeHelper from '../Components/AdminHomeHelper'


const AdminAddParent = () => {
    const store = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [parentMobileNumber, setParentMobileNumber] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (store.error) {
           setError(store.error)
       }
    }, [store.error])
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(name,email,parentMobileNumber)
        dispatch(adminAddParent({
            name,
            email,
            parentMobileNumber,
            aadharCard,
            gender,
            dob: dob.split("-").reverse().join("-")}))
    }

    useEffect(() => {
        if (store.admin.adminAddParentFlag) {
            setError({})
        }
    }, [store.admin.adminAddParentFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddParentFlag) {
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
        }
    },[store.error,store.admin.adminAddParentFlag])
    return (
       
        <div>
            {store.admin.isAuthenticated ? (<><AdminHomeHelper/>
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col">
                            <form noValidate onSubmit={formHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nameId">Parent/Guardian Name</label>
                                            <input onChange={(e) => setName(e.target.value)} type="text" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.name
                                                })} id="nameId" />
                                            {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emailId">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.email
                                                })} id="emailId" />
                                            {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                                        </div>
    
                                        </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="dobId">DOB</label>
                                            <input onChange={(e) => setDob(e.target.value)} type="date" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.dob
                                                })} id="dobId" />
                                            {error.dob && (<div className="invalid-feedback">{error.dob}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="genderId">Gender</label>
                                            <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                                <option>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numberId">Contact Number</label>
                                            <input onChange={(e) => setParentMobileNumber(e.target.value)} type="number" className="form-control" id="numberId" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="aadharId">Aadhar Card Number</label>
                                            <input onChange={(e) => setAadharCard(e.target.value)} type="number" className="form-control" id="aadharId" />
                                        </div>
                                       
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn btn-info">Add Parent</button>}
                            </form>
                        </div>
                    </div>
                </div></>):(history.push('/'))}
            
        </div>



    )
}

export default AdminAddParent