const mongoose = require('mongoose')
const { Schema } = mongoose

const subjectAttendenceSchema = new Schema({

    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    subjectCode: {
        type: String,
    },
    classtime:{
        type:String
    },
    classday:{
        type:String
    },
    presentStatus:{
        type:String
    }

})

module.exports = mongoose.model('subjectattendance', subjectAttendenceSchema)