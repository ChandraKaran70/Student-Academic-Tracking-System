import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {fetchStudents,markAttendence } from '../redux/action/facultyAction'
import FacultyHomeHelper from '../Components/FacultyHomeHelper'
import { useHistory } from 'react-router-dom'

const FacultyMarkAttendance = (props) => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [subjectCode, setSubjectCode] = useState("")
    const [checkedValue, setCheckedValue] = useState([])
    const [error, setError] = useState({})
    const [isLoading2, setIsLoading2] = useState(false)
    const dateNow = new Date()
    const today = (dateNow.getDate()>9?dateNow.getDate():('0'+dateNow.getDate())) +'-'+((dateNow.getMonth()+1)>9?(dateNow.getMonth()+1):'0'+(dateNow.getMonth()+1))+'-'+dateNow.getFullYear()

    const department = props.location.state.department
    const year = props.location.state.year
    const section= props.location.state.section


    const handleInputChange = (e) => {
        const tempCheck = checkedValue
        let index
        if (e.target.checked)
        {
            tempCheck.push(e.target.value)
        }
        else {
            index = tempCheck.indexOf(e.target.value)
            tempCheck.splice(index,1)
        }
        setCheckedValue(tempCheck)
    }
    
    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    useEffect(()=>{
        let registrationNumber = store.faculty.faculty.faculty.registrationNumber
        dispatch(fetchStudents(department, year, section,registrationNumber))
        console.log("students",store.faculty)
    },[store.faculty.fetchedStudentsHelper])

    // const formHandler = (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     let registrationNumber = store.faculty.faculty.faculty.registrationNumber
    //     dispatch(fetchStudents(department, year, section,registrationNumber))
       
    // }

    // useEffect(() => {
    //     if (store.error || !store.faculty.fetchedStudentsHelper) {
    //         setIsLoading(false)
    //     }
        
    // }, [store.error, store.faculty.fetchedStudentsHelper])

 

    const secondFormHandler = (e) => {
        e.preventDefault()
        setIsLoading2(true)
        console.log("dteails passed are",department,year,section)
        let registrationNumber = store.faculty.faculty.faculty.registrationNumber
        dispatch(markAttendence(checkedValue, subjectCode, department, year, section,registrationNumber))
        setCheckedValue([])
        
    }

    useEffect(() => {
        console.log(store.faculty.fetchedStudentsHelper)
        if (store.faculty.fetchedStudentsHelper) {
            setIsLoading2(false)
        }
        
    },[store.faculty.fetchedStudentsHelper])
    
    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                {store.faculty.fetchedStudentsHelper && <div className="row  justify-content-center mt-4">
                    <div className="col-md-4">
                        <h5 style={{color:'green'}}>Date: {today}</h5><br/>
                        <form onSubmit={secondFormHandler}>
                            <div className="form-group">
                                <label htmlFor="subjectId">Subject Code</label>
                                <select required onChange={(e) => setSubjectCode(e.target.value)} className="form-control" id="subjectId">
                                    <option>Select</option>
                                    {
                                        store.faculty.allSubjectCodeList.map(subjectCodeName =>
                                            <option>{subjectCodeName}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td></td>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Student Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.fetchedStudents.map((obj, index) =>
                                            <tr>
                                                <td><div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value={obj._id} onChange={handleInputChange} id="defaultCheck1" />
                                                </div></td>
                                                <td key={index}>{obj.registrationNumber}</td>
                                                <td>{obj.name}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div class="row justify-content-center">
                                <div class="col-md-1">
                                    {
                                        isLoading2 && <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {!isLoading2 && <button type="submit" className="btn btn-info ml-1  ">Submit</button>}
                        </form>
                    </div>
                </div>
                }</> : (history.push('/'))}
            
        </div>
    )
}

export default FacultyMarkAttendance