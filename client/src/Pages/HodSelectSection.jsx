import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import HodHomeHelper from '../Components/HodHomeHelper'
import { useHistory ,Link} from 'react-router-dom'
import { hodFetchStudents } from '../redux/action/facultyAction'

const SectionSelect = ()=>{
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [year,setYear] = useState("")
    const [section, setSection] = useState("")
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false) 
    const department = store.faculty.faculty.faculty.department

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    
    // const formHandler = (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     let department = store.faculty.faculty.faculty.department
    //     dispatch(hodFetchStudents(department,year,section))  
    // }

     
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // let department = store.faculty.faculty.faculty.department
        // dispatch(hodFetchStudents(department,year,section))  
    }

    // useEffect(()=>{
    //     if(store.faculty.hodFetchedAttendanceFlag)
    //     {
    //         console.log("current",history.location)
    //         history.push('hod/selectSection/sectionAttendance')
    //         console.log("after",history.location)
    //     }
    // },[store.faculty.hodFetchedAttendanceFlag])

    // useEffect(() => {
    //     if (store.error || !store.faculty.hodFetchedAttendanceFlag) {
    //         setIsLoading(false)
    //     }
        
    // }, [store.error, store.faculty.hodFetchedAttendanceFlag])

    return(
        <div>
        {store.faculty.isAuthenticated ? <>
        <HodHomeHelper />
        <div className="row justify-content-center mt-4 ">
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

                                {error.year && (<div classNameName="invalid-feedback">{error.year}</div>)}
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="sectionId">Section</label>
                                <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.section

                                    })} id="sectionId">
                                    <option>Select</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                </select>
                                {error.section && (<div classNameName="invalid-feedback">{error.section}</div>)}
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
                            {!isLoading && <Link to={{pathname:'/hod/selectSection/sectionAttendance',state:{department:department,year:year,section:section}}}><button type="submit" className="btn btn-info  ">Search</button></Link> }
                        </form>
                    </div>
                </div>
        </>:history.push("/")}
        </div>
    )
}

export default SectionSelect