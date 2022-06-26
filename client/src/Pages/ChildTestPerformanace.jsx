import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ParentHomeHelper from '../Components/ParentHomeHelper'
import { useHistory } from 'react-router-dom'
import { getMarks } from '../redux/action/parentAction'

const ChildTestPerformance = (props) => {
    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const studentRegistrationNumber =  props.match.params.registrationNumber

    useEffect(() => {
        console.log("child marks",store.parent.allMarks)
    },[])

    useEffect(()=>{
        dispatch(getMarks(studentRegistrationNumber))
    },[])


    return (

        <>
            {store.parent.isAuthenticated ? <>
                <ParentHomeHelper />

                <div className="container">
                    <h4>Marks report</h4><br/>
                    <h5>Student Name: {store.parent.allMarks.studentName}</h5><br/><br/>
                    {store.parent.allMarks.Mid1 &&
                        <div className="row mt-3">
                            <div className="col-md-8 m-auto">
                                {store.parent.allMarks.Mid1.length !== 0 ? <>
                                    <h4>Mid 1</h4>
                                    <table className="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Subject Code</th>
                                                <th scope="col">Subject Name</th>
                                                <th scope="col">Obtained Marks</th>
                                                <th scope="col">Total Marks</th>
                                                <th scope="col">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                store.parent.allMarks.Mid1.map((res, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.subject.subjectCode}</td>
                                                        <td>{res.subject.subjectName}</td>
                                                        <td>{res.marks}</td>
                                                        <td>{res.totalMarks}</td>
                                                        <td>{(parseFloat(res.marks / res.totalMarks)*100).toFixed(2)}%</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table></> : null}
                            </div>
                        </div>


                    }

                    {store.parent.allMarks.Mid2 &&
                        <div className="row mt-3">
                            <div className="col-md-8 m-auto">
                                {store.parent.allMarks.Mid2.length !== 0 ? <>
                                    <h4>Mid 2</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Subject Code</th>
                                                <th scope="col">Subject Name</th>
                                                <th scope="col">Obtained Marks</th>
                                                <th scope="col">Total Marks</th>
                                                <th scope="col">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                store.parent.allMarks.Mid2.map((res, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.subject.subjectCode}</td>
                                                        <td>{res.subject.subjectName}</td>
                                                        <td>{res.marks}</td>
                                                        <td>{res.totalMarks}</td>
                                                        <td>{(parseFloat(res.marks / res.totalMarks)*100).toFixed(2)}%</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table></> : null}
                            </div>
                        </div>
                    }

                    {store.parent.allMarks.Semester &&
                        <div className="row mt-3">
                            <div className="col-md-8 m-auto">
                                {store.parent.allMarks.Semester.length !== 0 ? <>
                                    <h4>Semester</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Subject Code</th>
                                                <th scope="col">Subject Name</th>
                                                <th scope="col">Obtained Marks</th>
                                                <th scope="col">Total Marks</th>
                                                <th scope="col">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                store.parent.allMarks.Semester.map((res, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.subject.subjectCode}</td>
                                                        <td>{res.subject.subjectName}</td>
                                                        <td>{res.marks}</td>
                                                        <td>{res.totalMarks}</td>
                                                        <td>{(parseFloat(res.marks / res.totalMarks)*100).toFixed(2)}%</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table></> : null}
                            </div>
                        </div>

                    }
                </div></> : (history.push('/'))}

        </>

    )
}

export default ChildTestPerformance