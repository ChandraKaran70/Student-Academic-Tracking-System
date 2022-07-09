import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAssignFaculty,adminGetAllFacultyAndSubjects} from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'

const AdminAssignFaculty = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [subjectName, setSubjectName] = useState('')
    const [semester,setSemester] = useState('')
    const [section,setSection] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [ registrationNumber,setRegistrationNumber] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])


    useEffect(()=>{
        dispatch(adminGetAllFacultyAndSubjects())
    },[])

    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminAssignFaculty({  
            department,
            year,
            section,
            semester,
            subjectName,
            registrationNumber
        }))
    }

    useEffect(() => {
        if (store.admin.adminAssignFacultyFlag) {
            setError({})
        }
    }, [store.admin.adminAssignFacultyFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAssignFacultyFlag) {
            setIsLoading(false)
        }
    }, [store.error, store.admin.adminAssignFacultyFlag])

    return (
        <div>
            {store.admin.isAuthenticated ? <> <AdminHomeHelper />
                { store.admin.adminFetchedSubjectFacultyHelper? <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="d-flex justify-content-md-center vh-100">
                                <form noValidate onSubmit={formHandler}>  
                                    
                                    <div className="form-group">
                                        <label htmlFor="departmentId">Department</label>
                                        <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.department
                                            })} id="departmentId">
                                            <option>Select</option>
                                            <option value="E.C.E">E.C.E</option>
                                            <option value="E.E.E">E.E.E</option>
                                            <option value="C.S.E">C.S.E</option>
                                            <option value="I.T">I.T</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Civil">Civil</option>
                                        </select>
                                        {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                    </div>

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
                                        <label htmlFor="semesterId">Semester</label>
                                        <select onChange={(e) => setSemester(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.semester

                                            })} id="semesterId">
                                            <option>Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>

                                        {error.semester && (<div className="invalid-feedback">{error.semester}</div>)}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sectionId">Section</label>
                                        <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.semester

                                            })} id="sectionId">
                                            <option>Select</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </select>

                                        {error.section && (<div className="invalid-feedback">{error.section}</div>)}
                                    </div>
                                        {/* 
                                    <div className="form-group">
                                        <label htmlFor="snameId">Subject Name</label>
                                        <input onChange={(e) => setSubjectName(e.target.value)} type="text" className={classnames("form-control",
                                            {
                                                'is-invalid': error.subjectName
                                            })} id="snameId" />
                                        {error.subjectName && (<div className="invalid-feedback">{error.subjectName}</div>)}
                                    </div> */}

                                <div className="form-group">
                                    <label htmlFor="snameId">Subject Name</label>
                                    <select required onChange={(e) => setSubjectName(e.target.value)} className="form-control" id="snameId">
                                        <option>Select</option>
                                        {
                                            store.admin.subjectList.map(subject =>
                                                <option>{subject.subjectName}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                    {/* <div className="form-group">
                                            <label htmlFor="fac">Faculty</label>
                                            <input onChange={(e) => setRegistrationNumber(e.target.value)} type="text" className="form-control" id="facId" />
                                    </div> */}
                                
                                <div className="form-group">
                                    <label htmlFor="faculty">Faculty</label>
                                    <select required onChange={(e) => setRegistrationNumber(e.target.value)} className="form-control" id="facId">
                                        <option>Select</option>
                                        {
                                            store.admin.facultyList.map(faculty =>
                                                <option value={faculty.registrationNumber}>{faculty.name}-{faculty.registrationNumber}</option>
                                            )
                                        }
                                    </select>
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
                                    {!isLoading && <button type="submit" className="btn btn-info  ">Add Subject</button>}
                                   
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>:<></>}</>: (history.push('/'))}
        </div>
    )
}

export default AdminAssignFaculty
