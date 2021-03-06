import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HodHomeHelper from '../Components/HodHomeHelper'
import { useHistory } from 'react-router-dom'
import { hodFetchStudents } from '../redux/action/facultyAction'

const SectionAttendance = (props) => {
    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const department = props.location.state.department
    const year = props.location.state.year
    const section = props.location.state.section


    useEffect(()=>{
        console.log("prps are",props)
        console.log("passed details are",department,year,section)
        dispatch(hodFetchStudents(department,year,section))
    },[])


 

    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <HodHomeHelper />
             {store.faculty.hodFetchedAttendanceFlag?<div className="container">
                    <div className="row mt-5">
                        <div className="col-md-12 m-auto">
                        <h5 style={{color:'green'}}> Attendance Report</h5> <br/>
                            <h5>Year-{store.faculty.hodFetchedAttendance.year}  Semester-{store.faculty.hodFetchedAttendance.semester}  Section-{store.faculty.hodFetchedAttendance.section}</h5><br/><br/>
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Student Name</th>
                                        {     
                                           store.faculty.hodFetchedAttendance.attendanceList[0].subAtt.map(subjectAtt => (
                                            <th>{subjectAtt.subjectName}(in %)</th>
                                           )   
                                           )
                                        }
                                        <th scope="col">Attendence(in %)</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.hodFetchedAttendance.attendanceList.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.studentRegNumber}</td>
                                                <td>{res.studentName}</td>
                                                {   
                                          
                                          res.subAtt.map(subjectAtt => {
                                              return <td>{subjectAtt.percentage}</td>
                                           }    
                                        )
                                    }
                                        {res.attendancePercentage<75?res.attendancePercentage>=65?<td style={{color:'brown'}}>{res.attendancePercentage}</td>:<td style={{color:'red'}}>{res.attendancePercentage}</td>:<td style={{color:'green'}}>{res.attendancePercentage}</td>}
                                        {res.attendancePercentage<75?res.attendancePercentage>=65?<td style={{color:'brown'}}>Condonation</td>:<td style={{color:'red'}}>Detained</td>:<td style={{color:'green'}}>Promoted</td>}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>:<h2 style={{marginLeft:"450px",marginTop:"250px"}}>Loading...</h2>}
            </> : (history.push('/'))}
           
            
        </div>

    )
}

export default SectionAttendance