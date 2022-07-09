import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import {
    SET_ADMIN, SET_ERRORS, 
    GET_SUBJECTS
} from '../actionTypes'

const url = "http://localhost:5000"

const setAdmin = (data) => {
    return {
        type: SET_ADMIN,
        payload: data
    }
}

const adminAddParentFlag = (data) => {
    return{
        type:"ADMIN_ADD_PARENT_FLAG",
        payload:data
    }
}

const adminAddFacultyFlag = (data) => {
    return {
        type: "ADMIN_ADD_FACULTY_FLAG",
        payload: data
    }
}

const adminAddStudentFlag = (data) => {
    return {
        type: "ADMIN_ADD_STUDENT_FLAG",
        payload: data
    }
}

const adminAddSubjectFlag = (data) => {
    return {
        type: "ADMIN_ADD_SUBJECT_FLAG",
        payload: data
    }
}

const adminAssignFacultyFlag = (data) => {
    return {
        type: "ADMIN_ASSIGN_FACULTY_FLAG",
        payload: data
    }
}

const adminAddAdminFlag = (data) => {
    return {
        type: "ADMIN_ADD_ADMIN_FLAG",
        payload: data
    }
}

const getSubjctsHelper = (data) => {
    return {
        type: GET_SUBJECTS,
        payload: data
    }
}


const adminGetAllFacultyHelper = (data) => {
    return {
        type: "GET_ALL_FACULTY",
        payload: data
    }   
}


const adminAddTimetableHelper = (data) => {
    return {
        type: "ADMIN_ADD_TIMETABLE",
        payload: data
    }   
}

const adminGetAllStudentHelper = (data) => {
    return {
        type: "GET_ALL_STUDENT",
        payload: data
    }
}


const adminGetAllSubjectHelper = (data) => {
    return {
        type: "GET_ALL_SUBJECT",
        payload: data
    }
}

export const adminLogin = (adminCredential) => {
    return async (dispatch) => {
        try {
            console.log("Admin Login Credentials", adminCredential)
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/login",
                data: adminCredential
            })
            console.log("login response", data)
            const { token } = data;
            // Set token to local Storage
            localStorage.setItem('adminJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setAdmin(decoded))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminGetAllSubjects = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/admin/getSubjects",
            })
            dispatch(getSubjctsHelper(data))
        }
        catch (err) {
            console.log("Error in getting all subjects", err.message)
        }
    }
}

export const adminAddFaculty = (facultyCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addFaculty",
                data: facultyCredential
            })
            dispatch(adminAddFacultyFlag(true))
            alert("Faculty Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
    
        }
    }
}

export const adminAddParent = (parentCredential) => {
    return async (dispatch) => {
        console.log("befr cntrl in action")
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addParent",
                data: parentCredential
            })
            console.log("parent cred",parentCredential)
            dispatch(adminAddParentFlag(true))
            alert("Parent Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
    
        }
    }
}

export const adminAddStudent = (studentCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addStudent",
                data: studentCredential
            })
            dispatch(adminAddStudentFlag(true))
            alert("Student Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminAddSubject = (subjectCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addSubject",
                data: subjectCredential
            })
            dispatch(adminAddSubjectFlag(true))
            alert("Subject Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminAssignFaculty = (subjectCredential) => {
    return async (dispatch) => {
        try {
            console.log("inside act")
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/assignFaculty",
                data: subjectCredential
            })
            dispatch(adminAssignFacultyFlag(true))
            alert("Subject Assigned Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}




export const adminAddAdmin = (adminCredentails) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addAdmin",
                data: adminCredentails
            })
            dispatch(adminAddAdminFlag(true))
            alert("Admin Added Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminAddTimetable = (timetableData) => {
    return async (dispatch) => {
        try {
            console.log("act started")
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/addTimetable",
                data: timetableData
            })
            console.log("data is",data)
            console.log("timetable added")
            dispatch(adminAddTimetableHelper(data))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminGetAllFaculty = (department) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/getAllFaculty",
                data: department
            })
            dispatch(adminGetAllFacultyHelper(data.result))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminGetAllFacultyAndSubjects = () => {
    return async (dispatch) => {
        try {
            console.log("in fac n sub act")
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/admin/getAllFacultyAndSubject",
            })
            console.log("returned",data)
            dispatch({
                type:"GET_ALL_FACULTY_AND_SUBJECTS",
                faculties:data.faculties,
                subjects:data.subjects
            })
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const adminGetAllStudent = (searchCredentials) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/getAllStudent",
                data: searchCredentials
            })
            dispatch(adminGetAllStudentHelper(data.result))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const adminGetAllSubject = (department) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/admin/getAllSubject",
                data: department
            })
            dispatch(adminGetAllSubjectHelper(data.result))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const setAdminUser = data => {
    return {
        type: SET_ADMIN,
        payload: data
    };
}

export const adminLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('adminJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setAdmin({}));
    };