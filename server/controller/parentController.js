const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const keys = require('../config/key')
const sendEmail = require('../utils/nodemailer')
const Student = require('../models/student')
const Parent = require('../models/parent')
const Subject = require('../models/subject')
const Attendence = require('../models/attendence')
const Message = require('../models/message')
const Mark = require("../models/marks")


//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

const validateParentLoginInput = require('../validation/parentLogin')
const validateStudentUpdatePassword = require('../validation/studentUpdatePassword')
const validateForgotPassword = require('../validation/forgotPassword')


module.exports = {
    parentLogin: async (req, res, next) => {
        const { errors, isValid } = validateParentLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { registrationNumber, password } = req.body;

        const parent = await Parent.findOne({ registrationNumber })
        if (!parent) {
            errors.registrationNumber = 'Registration number not found';
            return res.status(404).json(errors);
        }
        const isCorrect = await bcrypt.compare(password, parent.password)
        if (!isCorrect) {
            errors.password = 'Invalid Credentials';
            return res.status(404).json(errors);
        }
        const students = await Student.find({fatherMobileNumber:parent.parentMobileNumber})
        console.log("students",students)
        const payload = { id: parent.id, parent};
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
        console.log("cntrlr cmpltd")
    },

    fetchStudents: async(req,res,next)=>{
        try{
            console.log("cntrl begin")
            console.log("req user is",req.user)
            const students = await Student.find({fatherMobileNumber:req.user.parentMobileNumber})
            if(students)
            return res.status(200).json({children:students})
            else
            return res.status(400).json({message:"No student found"})
        }
        catch(err){
            console.log("err in fecthing students",err.message)
        }
    },

    checkAttendence1: async (req, res, next) => {
        try {
            console.log("cntrl begin")
            const {registrationNumber} = req.body
            console.log("reg num is",registrationNumber)
            const student = await Student.findOne({registrationNumber:registrationNumber})
            const studentId = student._id
            console.log("student is",student)
            console.log("name is",student.name)
            const attendence = await Attendence.find({ student: studentId }).populate('subject')
            if (!attendence) {
                res.status(400).json({ message: "Attendence not found" })
            }
            res.status(200).json({
                result: attendence.map(att => {
                    let res = {};
                    res.attendence = ((att.lectureAttended / att.totalLecturesByFaculty) * 100).toFixed(2)
                    res.subjectCode = att.subject.subjectCode
                    res.subjectName = att.subject.subjectName
                    res.maxHours = att.subject.totalLectures
                    res.absentHours = att.totalLecturesByFaculty - att.lectureAttended
                    res.lectureAttended = att.lectureAttended
                    res.totalLecturesByFaculty = att.totalLecturesByFaculty
                    return res
                })
            })
        }
        catch (err) {
            console.log("Error in fetching attendence",err.message)
        }
        
    },
    getAllStudents: async (req, res, next) => {
        try {
            console.log("get all students cntrlr entered")
            const { parentMobileNumber} = req.body;
            console.log("get all students cntrlr entered1")
            const students = await Student.find({ parentMobileNumber})
            console.log("children details",students)
            if (students.length === 0) {
                console.log("no child found")
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ success:true,result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateStudentUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewpassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const student = await Student.findOne({ registrationNumber })
            const isCorrect = await bcrypt.compare(oldPassword, student.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            student.password = hashedPassword;
            await student.save()
            res.status(200).json({ message: "Password Updated" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const student = await Student.findOne({ email })
            if (!student) {
                errors.email = "Email Not found, Provide registered email"
                return res.status(400).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            student.otp = OTP
            await student.save()
            await sendEmail(student.email, OTP, "OTP")
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                student.otp = ""
                await student.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Error in sending email", err.message)
        }
    },
   
    updateProfile: async (req, res, next) => {
        try {
            const {email, gender, studentMobileNumber, fatherName,
                fatherMobileNumber, aadharCard} = req.body
            const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(userPostImg)
            const student = await Student.findOne({ email })
            if (gender) {
                student.gender = gender
                await student.save()
            }
            if (studentMobileNumber) {
                student.studentMobileNumber = studentMobileNumber
                await student.save()
            }
            if (fatherName) {
                student.fatherName = fatherName
                await student.save()
            }
            if (fatherMobileNumber) {
                student.fatherMobileNumber = fatherMobileNumber
                await student.save()
            }
            if (aadharCard) {
                student.aadharCard = aadharCard
                await student.save()
            }
                student.avatar = imgResponse.secure_url
                await student.save()
                res.status(200).json(student)
        }
        catch (err) {
            console.log("Error in updating Profile", err.message)
        }
    },
   
    getMarks: async (req, res, next) => {
        try {
            console.log("get marks cntrllr")
            const {registrationNumber} = req.body
            const student = await Student.findOne({registrationNumber:registrationNumber})
            const id = student._id
            const department = student.department
            const studentName = student.name
            const getMarks = await Mark.find({ department, student: id }).populate('subject')
            console.log("getMarks",getMarks)
          
            const Mid1 = getMarks.filter((obj) => {
                return obj.exam === "Mid 1"
            })
            const Mid2 = getMarks.filter((obj) => {
                return obj.exam === "Mid 2"
            })
            const Semester = getMarks.filter((obj) => {
                return obj.exam === "Semester"
            })
            res.status(200).json({
                result: {
                    studentName,
                    Mid1,
                    Mid2,
                    Semester
                    
            }})
        }
        catch (err) {
            return res.status(400).json({ "Error in getting marks": err.message })
        }
    }
}
