const mongoose = require('mongoose')
const { Schema } = mongoose

const parentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    dob:{
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    parentMobileNumber: {
        type: Number
    },
    aadharCard: {
        type: Number
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref:'student'
    }],
    otp: {
        type: String
    }
})

module.exports = mongoose.model('parent', parentSchema)
