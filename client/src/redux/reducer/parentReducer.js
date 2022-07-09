import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    parent: {},
    attendence: {}, 
    allMarks: {},
    isStudentSelected:false,
    fetchedAttendanceHelper:false,
    fetchedMarksHelper:false,
    fetchedStudents: [],
    fetchedStudentsHelper: false
}

const parentReducer = (state = initialState, action) => {
    switch (action.type) {
            case "SET_PARENT": 
                return {
                    ...state,
                    isAuthenticated: !isEmpty(action.payload),
                    parent: action.payload
                } 
            case "GET_ATTENDENCE": 
                return {
                    ...state,
                    attendence: action.payload,
                    fetchedAttendanceHelper:true
                }
            case "GET_MARKS": 
                return {
                    ...state,
                    allMarks: action.payload,
                    fetchedMarksHelper:true
                }
            case "FETCH_STUDENTS":
                return{
                    ...state,
                    fetchedStudents:action.payload,
                    fetchedStudentsHelper:true
                }
            default:
            return state
        }
}

export default parentReducer