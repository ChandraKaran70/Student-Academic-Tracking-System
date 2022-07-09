const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multer')

const {parentLogin,getAllStudents,checkAttendence1,updatePassword,updateProfile,getMarks,fetchStudents} =require('../controller/parentController')
router.post('/login', parentLogin)
router.post('/updateProfile', passport.authenticate('jwt', { session: false }),
    upload.single("avatar"), updateProfile)
router.get('/getChildren', passport.authenticate('jwt',{session:false}),fetchStudents)
router.post('/getAllStudents', passport.authenticate('jwt',{session:false}),getAllStudents)
router.post('/checkAttendence1', passport.authenticate('jwt',{session:false}),checkAttendence1)
router.post('/updatePassword', passport.authenticate('jwt',{session:false}),updatePassword)
router.post('/getMarks', passport.authenticate('jwt',{session:false}),getMarks)

module.exports = router