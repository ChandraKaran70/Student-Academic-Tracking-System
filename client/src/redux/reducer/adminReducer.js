
import { SET_ADMIN, GET_SUBJECTS } from '../actionTypes'
import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    admin: {},
    adminAddFacultyFlag: false,
    adminAddParentFlag:false,
    adminAddStudentFlag: false,
    adminAddAdminFlag: false,
    adminAddSubjectFlag: false,
    adminAssignFacultyFlag:false,
    adminFetchedSubjectFacultyHelper:false,
    allSubject: {},
    allFaculty: [],
    allStudent: [],
    allParent:[],
    facultyList:[],
    subjectList:[],
    allSubject: [],
    timetables:[]
}






const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN: 
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                admin: action.payload
            }
        case GET_SUBJECTS: {
            return {
                ...state,
                allSubject: action.payload
            }
        }
        case "ADMIN_ADD_PARENT_FLAG": {
            return {
                ...state,
                adminAddParentFlag: action.payload
            }
        }
        case "ADMIN_ADD_FACULTY_FLAG": {
            return {
                ...state,
                adminAddFacultyFlag: action.payload
            }
        }
        case "ADMIN_ADD_STUDENT_FLAG": {
            return {
                ...state,
                adminAddStudentFlag: action.payload
            }
        }
        case "ADMIN_ADD_SUBJECT_FLAG": {
            return {
                ...state,
                adminAddSubjectFlag: action.payload
            }
        }
        case "ADMIN_ASSIGN_FACULTY_FLAG": {
            return {
                ...state,
                adminAssignFacultyFlag: action.payload
            }
        }
        case "ADMIN_ADD_ADMIN_FLAG": {
            return {
                ...state,
                adminAddAdminFlag: action.payload
            }
        }
        case "GET_ALL_FACULTY": {
            return {
                ...state,
                allFaculty: action.payload
            }
        }
        case "GET_ALL_FACULTY_AND_SUBJECTS": {
            return {
                ...state,
                facultyList: action.faculties,
                subjectList: action.subjects,
                adminFetchedSubjectFacultyHelper:true
            }
        }
        case "ADMIN_ADD_TIMETABLE": {
            return {
                ...state,
                timetables: action.payload
            }
        }
        case "GET_ALL_STUDENT": {
            return {
                ...state,
                allStudent: action.payload
            }
        }
        case "GET_ALL_SUBJECT": {
            return {
                ...state,
                allSubject: action.payload
            }
        }
        default:
            return state
    }
}



export default adminReducer