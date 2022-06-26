const mongoose = require('mongoose')
const { Schema } = mongoose

const timetableSchema = new Schema({
    department: {
        type:String
    },
    year: {
        type:Number
    },
    semester: {
        type:Number
    },
    section: {
        type:String
    },
    avatar: {
        type: String
    }
})

module.exports = mongoose.model('timetable', timetableSchema)
