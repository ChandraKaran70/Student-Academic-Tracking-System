import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSubjectAttendence} from '../../redux/action/studentAction'
import HomeHelper from '../../Components/HomeHelper'
import { useHistory } from 'react-router-dom'

const SubjectAttendance = (props)=>{
    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const subjectCode = props.match.params.subjectCode
    // const subjectCode = "CS08"
    useEffect(()=>{
        // const studentId = store.student.student.student._id
        console.log("befr act")
        // dispatch(getSubjectAttendance(studentId,subjectCode))
        dispatch(getSubjectAttendence(subjectCode))
    },[])

    useEffect(()=>{
        console.log("hiiiiiii")
        console.log("ans is", store.student.subjectAttendance)
    },[])

    return(
        <div>
        {store.student.isAuthenticated ? <>
            <HomeHelper />
            <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <h3>SubjectCode: {subjectCode}</h3><br/><br/><br/>
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Day</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.student.subjectAttendance.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.classday}</td>
                                                <td>{res.classtime}</td>
                                                {res.attendanceStatus === "present"?<td style={{color:"green"}}>{res.attendanceStatus}</td>:<td style={{color:"red"}}>{res.attendanceStatus}</td>}
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </> : (history.push('/'))}     
    </div>
    )
}

export default SubjectAttendance