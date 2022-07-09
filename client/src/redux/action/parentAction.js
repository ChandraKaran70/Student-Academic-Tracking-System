import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import {
 SET_ERRORS
} from '../actionTypes'
const url = "http://localhost:5000"

const setParent = (data) => {
    return {
        type: "SET_PARENT",
        payload: data
    }
}

const fetchAttendenceHelper = (data) => {
    return {
        type: "GET_ATTENDENCE",
        payload: data
    }
}

// const fetchStudentsHelper = (data) => {
//     return {
//         type: "FETCH_STUDENTS",
//         payload: data
//     }
// }

export const setParentUser = data => {
    return {
        type: "SET_PARENT",
        payload: data
    };
}

const getMarksHelper = (data) => {
    return {
        type: "GET_MARKS",
        payload: data
    }
    
}



export const parentLogin = (parentCredential) => {
    return async (dispatch) => {
        try {
            console.log("Parent Login Credentials", parentCredential)
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/parent/login",
                data: parentCredential
            })
            console.log("login response", data)
            const { token } = data;
            // console.log("students in action",children)
            // Set token to local Storage
            localStorage.setItem('parentJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setParent(decoded))

            // dispatch(fetchStudentsHelper(children))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const fetchStudents = () => {
    return async (dispatch) => {
        console.log("begin act")
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/parent/getChildren"
            })
            dispatch({
                type:"FETCH_STUDENTS",
                payload:data.children
            })
            console.log("end act")
        }
        catch (err) {
            console.log("errrrrr")
            console.log("Error in getting children in act", err.message)
        }
    
    }
}


export const fetchAttendence = (registrationNumber) => {
    return async (dispatch) => {
        console.log("begin act")
        console.log(registrationNumber)
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/parent/checkAttendence1",
                data: {registrationNumber}
            })
            console.log("end act")
            dispatch(fetchAttendenceHelper(data.result))
        }
        catch (err) {
            console.log("errrrrr")
            console.log("Error in sending message", err.message)
        }
    
    }
}


export const getMarks = (registrationNumber) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/parent/getMarks",
                data: {registrationNumber}
            })
           dispatch(getMarksHelper(data.result))
        }
        catch (err) {
            console.log("Error in getting marks", err.message)
        }
    }
}

export const ParentUpdate = (updatedData) => {
    return async () => {
        try {
            console.log("updateData",updatedData)
            const { data } = await axios({
                method: 'Post',
                url: url + `/api/parent/updateProfile`,
                data: updatedData
            })
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const parentLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('parentJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setParent({}));
    };