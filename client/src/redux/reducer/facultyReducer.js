
import { SET_FACULTY } from '../actionTypes'

import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    faculty: {},
    hodFlag:false,
    flag: false,
    updateProfileFlag: false,
    allSubjectCodeList: [],
    fetchedStudents: [],
    fetchedStudentsHelper: true,
    hodFetchedAttendance:[],
    hodFetchedAttendanceFlag:false,
    hodFetchedMarks:[],
    hodFetchedStudents:[],
    hodFetchedMarksFlag:false,
    classSubjects:[]
}


const facultyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FACULTY: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                faculty: action.payload
            }
        }
        case "FETCH_STUDENTS": {
            return {
                ...state,
                fetchedStudentsHelper: true,
                fetchedStudents: action.payload
            }
        }
        case "HOD_FETCH_ATTENDANCE": {
            return {
                ...state,
                hodFetchedAttendanceFlag: true,
                hodFetchedAttendance: action.payload
            }
        }
        case "HOD_FETCH_MARKS": {
            return {
                ...state,
                hodFetchedMarks: action.payload
            }
        }
        case "GET_ALL_STUDENT": {
            return {
                ...state,
                hodFetchedStudents: action.payload
            }
        }
        case "HOD_FETCH_MARKS_FLAG": {
            return {
                ...state,
                hodFetchedMarksFlag: action.payload
            }
        }
        case "FETCH_CLASS_SUBJECTS":{
            return{
                ...state,
                classSubjects:action.payload
            }
        }
        case "FACULTY_UPDATE_PROFILE_FLAG": {
            return {
                ...state,
                updateProfileFlag: action.payload
            }
        }
        case "GET_SUBJECTCODE_LIST": {
            return {
                ...state,
                allSubjectCodeList: action.payload
            }
        }
        case "HELPER": {
            return {
                ...state,
                fetchedStudentsHelper: action.payload
            }
        }
        case "SET_HOD_FLAG": {
            return {
                ...state,
                hodFlag: action.payload
            }
        }        
        default:
            return state
    }
}

export default facultyReducer