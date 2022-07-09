import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ParentUpdate ,parentLogout} from '../../redux/action/parentAction'
import ParentHomeHelper from '../../Components/ParentHomeHelper'

import { useHistory, withRouter } from 'react-router-dom'

const ParentUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [name,setName] = useState('')
    const [gender, setGender] = useState('')
    const [parentMobileNumber, setContactNumber] = useState('')
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
        formData.append("name",name)
        formData.append("gender", gender)
        formData.append("parentMobileNumber", parentMobileNumber)
        formData.append("avatar", avatar)
        formData.append("email", store.parent.parent.parent.email)
        dispatch(ParentUpdate(formData,history))
        setModal(true)
        alert("Kindly login again to see updates")
        dispatch(parentLogout())
        history.push('/')
    }
        return (
            <div>
                {store.parent.isAuthenticated ? <>
                    <ParentHomeHelper />
                    <div className="container mt-5">
                        <div className="row ">
                            <div className="col-md-5 w-100 m-auto">
                                <form onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="inputId">Profile Picture</label>
                                        <input required className="form-control" type="file" accept=".jpg,.png,.jpeg,.pdf" id="inputId" onChange={imagehandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fatherId">Name</label>
                                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="fatherId" />
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
                                        <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
                                    </div>
                                 
                                 
                                 
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </> : (history.push('/'))}
                
            </div>
        )
    }

export default withRouter(ParentUpdateProfile)