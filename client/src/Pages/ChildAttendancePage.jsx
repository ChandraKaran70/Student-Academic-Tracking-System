import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ParentHomeHelper from '../Components/ParentHomeHelper'
import { useHistory } from 'react-router-dom'
import { fetchAttendence } from '../redux/action/parentAction'

const ChildAttendancePage = (props) => {
    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()

   const studentRegistrationNumber =  props.match.params.registrationNumber

    useEffect(() => {
        console.log("num is",studentRegistrationNumber)
        console.log("child attendance in child page",store.parent.attendance)
    })

    useEffect(()=>{
        dispatch(fetchAttendence(studentRegistrationNumber))
    },[])

    return (
        <div>
            {store.parent.isAuthenticated ? <>
                <ParentHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Subject Code</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Maximum Hours</th>
                                        <th scope="col">Present Hours</th>
                                        <th scope="col">Absent Hours</th>
                                        <th scope="col">Total Hours</th>
                                        <th scope="col">Attendence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.parent.attendence.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.subjectCode}</td>
                                                <td>{res.subjectName}</td>
                                                <td>{res.maxHours}</td>
                                                <td>{res.lectureAttended}</td>
                                                <td>{res.absentHours}</td>
                                                <td>{res.totalLecturesByFaculty}</td>
                                                <td>{res.attendence}%</td>
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

export default ChildAttendancePage
