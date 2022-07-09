const mongoose = require('mongoose')
const { Schema } = mongoose

const subjectfacultySchema = new Schema({
    department: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true 
    },
    section:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,
        required:true
    },
   
})

module.exports = mongoose.model('subjectfaculty', subjectfacultySchema)