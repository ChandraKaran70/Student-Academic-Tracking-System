import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hodGetAllStudent } from '../redux/action/facultyAction'
import HodHomeHelper from '../Components/HodHomeHelper'
import classnames from 'classnames'

const HodGetStudents = ()=>{
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [year, setYear] = useState('')
    const [section, setSection] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const [flag,setFlag] = useState(false)
    const history = useHistory()
 
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const department = store.faculty.faculty.faculty.department
        dispatch(hodGetAllStudent({ department, year,section }))
        setIsLoading(false)
        setFlag(true)
    }


    useEffect(() => {
        if (store.faculty.hodFetchedStudents.length !== 0) {
            setIsLoading(false)
        }

    }, [store.faculty.hodFetchedStudents.length])


    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <HodHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <form noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="yearId">Year</label>
                                    <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.year
                                        })} id="yearId">
                                        <option>Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sectionId">Section</label>
                                    <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.year
                                        })} id="sectionId">
                                        <option>Select</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        
                                    </select>
                                    {error.section && (<div className="invalid-feedback">{error.section}</div>)}
                                </div>
                                <button type="submit" className="btn btn-info btn-block  ">Search</button><br/>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                               
                              
                               
                            </form>


                        </div>
                        <div className="col-md-8">

                            {store.faculty.hodFetchedStudents.length !== 0 ? <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Section</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.hodFetchedStudents.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.registrationNumber}</td>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.section}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>:flag? <h2 style={{color:"red",marginLeft:"250px",marginTop:"100px"}}>No details found</h2>:<></>}

                        </div>
                    </div>
                </div>
            </> : (history.push('/'))}
        </div>
    )

}

export default HodGetStudents
