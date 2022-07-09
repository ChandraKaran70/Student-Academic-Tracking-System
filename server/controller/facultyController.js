const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/nodemailer')
const Student = require('../models/student')
const Subject = require('../models/subject')
const Faculty = require('../models/faculty')
const Attendence = require('../models/attendence')
const SubjectAttendance = require('../models/subjectattendance')
const Mark = require('../models/marks')
const keys = require('../config/key')
const sendAttendanceMail = require('../utils/attendanceMailer')
//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

const validateFacultyLoginInput = require('../validation/facultyLogin')
const validateFetchStudentsInput = require('../validation/facultyFetchStudent')
const validateFacultyUpdatePassword = require('../validation/FacultyUpdatePassword')
const validateForgotPassword = require('../validation/forgotPassword')
const validateOTP = require('../validation/otpValidation')
const validateFacultyUploadMarks = require('../validation/facultyUploadMarks')
const validateHodFetchStudentsInput = require('../validation/hodFetchStudent')

module.exports = {
    facultyLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyLoginInput(req.body);
            // Check Validation
            if (!isValid) {
              return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const faculty = await Faculty.findOne({ registrationNumber })
            if (!faculty) {
                errors.registrationNumber = 'Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, faculty.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = {
                id: faculty.id, faculty
            };
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
        }
        catch (err) {
            console.log("Error in faculty login", err.message)
        }
    },
    hodLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyLoginInput(req.body);
            // Check Validation
            if (!isValid) {
              return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const faculty = await Faculty.findOne({ registrationNumber,isHOD:true})
            if (!faculty) {
                errors.registrationNumber = 'HOD Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, faculty.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = {
                id: faculty.id, faculty
            };
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
        }
        catch (err) {
            console.log("Error in hod login", err.message)
        }
    },
    fetchStudents: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFetchStudentsInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { department, year, section,registrationNumber} = req.body;
            const subjectList = await Subject.find({ department, year,registrationNumber })
           
            if (subjectList.length === 0) {
                errors.department = 'No Subject found in given department';
                console.log("err: no sub in department")
                return res.status(404).json(errors);
            }
            const students = await Student.find({ department, year, section })
            if (students.length === 0) {
                errors.department = 'No Student found'
                console.log("err: no student in department")
                return res.status(404).json(errors);
            }
            res.status(200).json({
                result: students.map(student => {
                    var student = {
                        _id: student._id,
                        registrationNumber: student.registrationNumber,
                        name: student.name
                    }
                    return student
                }),
                subjectCode: subjectList.map(sub => {
                    return sub.subjectCode
                })
            })
        }
        catch (err) {
            console.log("error in faculty fetchStudents", err.message)
        }
    },
    hodFetchStudents: async (req, res, next) => {
        try {
            console.log("cntrl entered")
            const { errors, isValid } = validateHodFetchStudentsInput(req.body);
            console.log("valid")
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const {department, year, section} = req.body;

            const students = await Student.find({department, year, section })
            console.log("valid students",students)
            if (students.length === 0) {
                errors.department = 'No Student found'
                return res.status(404).json(errors);
            }
            let attendanceList = []
            for(let i=0;i<students.length;i++){   
                const student = students[i]   
                let res = {}
                res.subAtt = []
                res.studentName = student.name
                res.studentRegNumber = student.registrationNumber
                // let total_conducted_classes = 0
                // let total_attended_classes = 0
                const studentId = student._id
                // const attendence = await Attendence.find({ student: studentId }).populate('subject')
                const subjects = await Subject.find({year,department})

                for(let j=0;j<subjects.length;j++){
                    let total_conducted_classes = 0
                    let total_attended_classes = 0
                    let subjectAttendance = {subjectName:subjects[j].subjectName,percentage:'-'}
                    const attendance = await Attendence.find({student: studentId,subject:subjects[j]._id})
                    if(attendance){
                        attendance.map(att=>{
                            total_attended_classes+=att.lectureAttended
                            total_conducted_classes+=att.totalLecturesByFaculty
                            subjectAttendance.percentage = ((total_attended_classes / total_conducted_classes) * 100).toFixed(2)      
                        })
                    }
                    res.subAtt.push(subjectAttendance)
                }
                let totalPercentage = 0
                let n = 0
                for(let k=0;k<res.subAtt.length;k++){
                    if(parseFloat(res.subAtt[k].percentage)){
                    totalPercentage = totalPercentage + parseFloat(res.subAtt[k].percentage)
                    n+=1
                    }
                }

                res.attendancePercentage = parseFloat(totalPercentage/n).toFixed(2)
                console.log("att per is",res.attendancePercentage)

                // console.log("att is",attendence)
                // if (!attendence) {
                //     res.status(400).json({ message: "Attendance not found" })
                // }
                // attendence.map(att => {
                //     total_attended_classes+=att.lectureAttended
                //     total_conducted_classes+=att.totalLecturesByFaculty
                //     res.attendancePercentage = ((total_attended_classes / total_conducted_classes) * 100).toFixed(2)

                //     console.log("classes are",att.lectureAttended,att.totalLecturesByFaculty)
                // })
                console.log("res is",res)
                attendanceList.push(res)
                }
                console.log("att list ",attendanceList)
               await res.status(200).json({result:{
                   department,
                   year,
                   section,
                   attendanceList}})
        }
        catch (err) {
            console.log("error in faculty fetchStudents", err.message)
        }
    },
    hodGetAllStudent: async (req, res, next) => {
        try {
            const { department, year,section } = req.body
            const allStudents = await Student.find({ department, year,section })
            res.status(200).json({ result: allStudents })
        }
        catch (err) {
            console.log("Error in gettting all students", err.message)
        }
    },
    hodFetchMarks: async (req, res, next) => {
        try {
            console.log("cntrl entered")
            const { errors, isValid } = validateHodFetchStudentsInput(req.body);
            console.log("valid")
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const {department, year, section,semester,test} = req.body;

            const students = await Student.find({department, year, section })
            const subjects = await Subject.find({department,year})
            let subjectList = []
            for(let i=0;i<subjects.length;i++){
                const subName = subjects[i].subjectName
                subjectList.push(subName)
            }
            console.log("valid students",students)
            if (students.length === 0) {
                errors.department = 'No Student found'
                return res.status(404).json(errors);
            }
            let marksList = []
            for(let i=0;i<students.length;i++){   
                const student = students[i]   
                let res = {}
                res.studentName = student.name
                res.studentRegNumber = student.registrationNumber
                res.semester = semester
                res.year = year
                res.section = section
                const id = student._id
                console.log("test is",test)
                const marks = await Mark.find({student:id,exam:test}).populate('subject')
                console.log("marks",marks)
                if (!marks) {
                    res.status(400).json({ message: "Attendence not found" })
                }
                subjectAndmarks = []
                marks.map(testItem=>{
                   temp={}
                   temp.subjectName = testItem.subject.subjectName
                   res.exam = testItem.exam
                   temp.marks = testItem.marks
                   subjectAndmarks.push(temp)
                   res.subjectAndmarks = subjectAndmarks
                })
                marksList.push(res)
                }
                console.log("marks list ",marksList)
               await res.status(200).json({result:marksList,subjects:subjectList})
        }
        catch (err) {
            console.log("error in faculty fetchStudents", err.message)
        }

    },
    markAttendence: async (req, res, next) => {
        try {
            const { selectedStudents, subjectCode, department,
                year,
                section } = req.body
            
            const sub = await Subject.findOne({ subjectCode })
            const subjectName = sub.subjectName

            const dateNow = new Date()
            const today = dateNow.getDate()>9?dateNow.getDate():'0'+dateNow.getDate()
            const month = (dateNow.getMonth()+1)>9?(dateNow.getMonth()+1):'0'+(dateNow.getMonth()+1)
            const hours = dateNow.getHours()>9?dateNow.getHours():'0'+dateNow.getHours()
            const minutes = dateNow.getMinutes()>9?dateNow.getMinutes():'0'+dateNow.getMinutes()
            const currentyear = dateNow.getFullYear()

            //All Students
            const allStudents = await Student.find({ department, year, section })
            
            var filteredArr = allStudents.filter(function (item) {
                return selectedStudents.indexOf(item.id) === -1
            });
            
            for (let i = 0; i < filteredArr.length; i++) {
                const pre = await Attendence.findOne({ student: filteredArr[i]._id, subject: sub._id })
                if (!pre) {
                    const attendence = new Attendence({
                        student: filteredArr[i],
                        subject: sub._id
                    })
                    attendence.totalLecturesByFaculty += 1
                    await attendence.save()
                }
                else {
                    pre.totalLecturesByFaculty += 1
                    await pre.save()
                }
                
                const subjectAttendance = new SubjectAttendance({
                    student:filteredArr[i],
                    subjectCode:sub.subjectCode,
                    classtime: hours+":"+minutes,
                    classday:today+"-"+month+"-"+currentyear,
                    presentStatus:"absent"
                })

                await subjectAttendance.save()
                console.log("absent subAtt",subjectAttendance)

                console.log("hii in filtererd arr")
                const absentStudentEmail = filteredArr[i].email 
               
                const attendance = await Attendence.findOne( {student: filteredArr[i]._id, subject: sub._id })
                const attendanceData = {
                    attendanceStatus:"absent",
                    subjectName:subjectName,
                    lecturesAttended:attendance.lectureAttended,
                    totalLecturesByFaculty: attendance.totalLecturesByFaculty
                }
                console.log("student is",absentStudentEmail)
                await sendAttendanceMail(absentStudentEmail,attendanceData,"OTP")
                
                //smuskbesbzwhnzyq
               
            }
            console.log("selected",selectedStudents)
            for (var a = 0; a < selectedStudents.length; a++) {
                const pre = await Attendence.findOne({ student: selectedStudents[a], subject: sub._id })
                if (!pre) {
                    const attendence = new Attendence({
                        student: selectedStudents[a],
                        subject: sub._id
                    })
                    attendence.totalLecturesByFaculty += 1
                    attendence.lectureAttended += 1
                    await attendence.save()
                }
                else {
                    pre.totalLecturesByFaculty += 1
                    pre.lectureAttended += 1
                    await pre.save()
                }

                const subjectAttendance = new SubjectAttendance({
                    student:selectedStudents[a],
                    subjectCode:sub.subjectCode,
                    classtime: hours+":"+minutes,
                    classday:today+"-"+month+"-"+currentyear,
                    presentStatus:"present"
                })

                await subjectAttendance.save()
                console.log("present subAtt",subjectAttendance)

                const presentStudent = await Student.findOne({_id:selectedStudents[a]})
                const presentStudentEmail = presentStudent.email
                const attendance = await Attendence.findOne( {student: selectedStudents[a], subject: sub._id })
                const attendanceData = {
                    attendanceStatus:"present",
                    subjectName:subjectName,
                    lecturesAttended:attendance.lectureAttended,
                    totalLecturesByFaculty: attendance.totalLecturesByFaculty
                }
                console.log("student is",presentStudentEmail)
                await sendAttendanceMail(presentStudentEmail,attendanceData,"OTP")
               
            }
            res.status(200).json({ message: "done" })
        }
        catch (err) {
            console.log("error", err.message)
            return res.status(400).json({ message: `Error in marking attendence${err.message}` })
        }
    },
    uploadMarks: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyUploadMarks(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { subjectCode, exam, totalMarks, marks, department, year,
                section} = req.body
            const subject = await Subject.findOne({ subjectCode })
            console.log("sub is",subject)
            const isAlready = await Mark.find({ exam, department, section, subject:subject._id })
            console.log("exam subcde "+exam+" "+subject._id)
            console.log("Already marks ",isAlready)
            if (isAlready.length !== 0) {
                errors.exam = "You have already uploaded marks of given exam"
                return res.status(400).json(errors);
            }
            for (var i = 0; i < marks.length; i++) {
                const newMarks = await new Mark({
                    student: marks[i]._id,
                    subject: subject._id,
                    exam,
                    department,
                    section,        
                    marks: marks[i].value,
                    totalMarks
                })
                await newMarks.save()
            }
            res.status(200).json({message:"Marks uploaded successfully"})
        }
        catch (err) {
            console.log("Error in uploading marks",err.message)
        }
        
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const allSubjects = await Subject.find({})
            if (!allSubjects) {
                return res.status(404).json({ message: "You havent registered any subject yet." })
            }
            res.status(200).json({ allSubjects })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all Subjects", ${err.message}` })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(404).json(errors);
            }
            const faculty = await Faculty.findOne({ registrationNumber })
            const isCorrect = await bcrypt.compare(oldPassword, faculty.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            faculty.password = hashedPassword;
            await faculty.save()
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
            const faculty = await Faculty.findOne({ email })
            if (!faculty) {
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
            faculty.otp = OTP
            await faculty.save()
            await sendEmail(faculty.email, OTP, "OTP")
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                faculty.otp = ""
                await faculty.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Error in sending email", err.message)
        }
    },
    postOTP: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const faculty = await Faculty.findOne({ email });
            if (faculty.otp !== otp) {
                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            faculty.password = hashedPassword;
            await faculty.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            console.log("Error in submitting otp", err.message)
            return res.status(200)
        }

    },
    updateProfile: async (req, res, next) => {
        try {
            const { email, gender, facultyMobileNumber,
                aadharCard } = req.body
            const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(userPostImg)
            const faculty = await Faculty.findOne({ email })
            if (gender) {
                faculty.gender = gender
                await faculty.save()
            }
            if (facultyMobileNumber) {
                faculty.facultyMobileNumber = facultyMobileNumber
                await faculty.save()
            }
            if (aadharCard) {
                faculty.aadharCard = aadharCard
                await faculty.save()
            }
            faculty.avatar = imgResponse.secure_url
            await faculty.save()
            res.status(200).json(faculty)
        }
        catch (err) {
            console.log("Error in updating Profile", err.message)
        }
    }
}