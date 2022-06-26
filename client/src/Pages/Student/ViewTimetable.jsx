import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import HomeHelper from '../../Components/HomeHelper'
import { useHistory } from 'react-router-dom'
import { fetchTimetable } from '../../redux/action/studentAction'

const ViewTimetable = ()=>{
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    // const [test,setTest] = useState("")
    // const [year,setYear] = useState("")
    // const [section, setSection] = useState("")
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false) 

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    useEffect(()=>{
        console.log("stu is",store.student)
        dispatch(fetchTimetable())
    },[])


    return(
        <div>
        {store.student.isAuthenticated ? <>
            <HomeHelper />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3>{store.student.timetable.department} - {store.student.timetable.year} year Semester-{store.student.timetable.semester} Section-{store.student.timetable.section}</h3>
                        <br/><br/><br/>
                        <table className="table">
                            <thead>
                                <tr>
                                  <td align='center'><h2>Time Table</h2></td>
                                </tr>
                            </thead>
                            <tbody>
                               <tr>
                                   <td><img src={store.student.timetable.avatar} alt="Timetable.png" height={"600px"} width={"600px"}></img></td>
                               </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </> : (history.push('/'))}
       
        
    </div>
    )
}

export default ViewTimetable