import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import ParentHomeHelper from '../Components/ParentHomeHelper'
import { Link, useHistory } from 'react-router-dom'
import { fetchStudents } from '../redux/action/parentAction'

const AttendanceParent = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [studentRegistrationNumber, setStudentRegistrationNumber] = useState("")
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(()=>{
        console.log("parent is ",store.parent)
        dispatch(fetchStudents())
    },[])

    // useEffect(()=>{
    //     console.log("fetched students",store.parent.fetchedStudents)
    //     console.log("attt",store.parent.attendance)
    // })

    // useEffect(() => {
    //     if (store.parent.fetchedAttendanceHelper) {
    //         console.log("parent updated is",store.parent)
    //         console.log("current",history.location)
    //         history.push(window.location.pathname+'/childAttendance')
    //         console.log("after",history.location)
    //     }
    // }, [store.parent.fetchedAttendanceHelper])
    
    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    // const formHandler = (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     console.log("befr dispatch")
    //     dispatch(fetchAttendence(studentRegistrationNumber))
    //     console.log("form handled")

    // }
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)

    }


    // useEffect(() => {
    //     if (store.error || !store.parent.fetchedAttendanceHelper) {
    //         setIsLoading(false)
    //     }
        
    // }, [store.error, store.parent.fetchedAttendanceHelper])

  
    return (
        <div>
            {store.parent.isAuthenticated ? <> <ParentHomeHelper />
            <div className="row justify-content-center mt-4 ">
                    <div className="col-md-4">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="studentId">Select Student Id</label>
                                <select required onChange={(e) => setStudentRegistrationNumber(e.target.value)} className="form-control" id="studentId">
                                    <option>Select</option>
                                    {
                                        store.parent.fetchedStudents.map(student =>
                                            <option>{student.registrationNumber}</option>
                                        )
                                    }
                                </select>
                                {error.student && (<div classNameName="invalid-feedback">{error.student}</div>)}
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
                            {!isLoading && <Link to={`/parent/checkAttendance/${studentRegistrationNumber}`}> <button type="submit" className="btn btn-info  ">Search</button></Link>}
                        </form>
                    </div>
                </div>
                </>: (history.push('/'))}
        </div>
    )

}

export default AttendanceParent
