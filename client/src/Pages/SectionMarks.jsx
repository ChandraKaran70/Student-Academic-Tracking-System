import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HodHomeHelper from '../Components/HodHomeHelper'
import { useHistory } from 'react-router-dom'
import { hodFetchMarks } from '../redux/action/facultyAction'

const SectionMarks = (props) => {
    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const department = props.location.state.department
    const year = props.location.state.year
    const section = props.location.state.section
    const semester = props.location.state.semester
    const test = props.location.state.test


    useEffect(()=>{
        dispatch(hodFetchMarks(department,year,section,semester,test)) 
    },[])

    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <HodHomeHelper />
               {store.faculty.hodFetchedMarksFlag?<div className="container">
                    <div className="row mt-5">
                        <div className="col-md-9 m-auto">
                            <h5 style={{color:'green'}}> {store.faculty.hodFetchedMarks[0].exam} Exam</h5> <br/>
                            <h5>Year-{store.faculty.hodFetchedMarks[0].year}  Semester-{store.faculty.hodFetchedMarks[0].semester}  Section-{store.faculty.hodFetchedMarks[0].section}</h5><br/><br/>
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Student Name</th>
                                        {
                                            store.faculty.classSubjects.map(subjectName=>(
                                                <th>{subjectName}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.hodFetchedMarks.map((student, index) => 
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{student.studentRegNumber}</td>
                                                <td>{student.studentName}</td>
                                             {   
                                          
                                            store.faculty.classSubjects.map(subjectName => {
                                                let flag = false
                                                let subjectMarks = 0
                                                student.subjectAndmarks? student.subjectAndmarks.map((res)=>{      
                                                    if(subjectName===res.subjectName){
                                                        console.log("name",student.studentName)
                                                        console.log("both are",subjectName,res.subjectName)
                                                        flag = flag || true
                                                        subjectMarks = res.marks
                                                        // return <td>{res.marks}</td>
                                                    }  
                                                    else{
                                                        flag = flag || false
                                                    } 
                                                }) : <></>
                                                if(flag){
                                                    return <td>{subjectMarks}</td>
                                                }     
                                                else{
                                                    return <td>--</td>
                                                }                       
                                            })   
                                            
                                                          
                                        }
                                        </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>:<></>}
            </> : (history.push('/'))}
           
            
        </div>

    )
}

export default SectionMarks