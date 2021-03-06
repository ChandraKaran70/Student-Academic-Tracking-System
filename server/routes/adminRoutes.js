const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../utils/multer')

const { adminLogin, addFaculty, addStudent,
    addSubject, getAllFaculty, getAllStudents, getAllSubjects,
    addAdmin, 
    getAllStudent,
    getAllSubject,addParent,addTimetable,assignFaculty,getAllFacultyAndSubject} = require('../controller/adminController')

router.post('/login', adminLogin)
router.post('/addAdmin', addAdmin )
router.post('/getAllFaculty', passport.authenticate('jwt', { session: false }),getAllFaculty)
router.get('/getAllFacultyAndSubject', passport.authenticate('jwt', { session: false }),getAllFacultyAndSubject)
router.post('/getAllStudent', passport.authenticate('jwt', { session: false }), getAllStudent)
router.post('/getAllSubject', passport.authenticate('jwt', { session: false }), getAllSubject)
router.post('/addFaculty', passport.authenticate('jwt', { session: false }), addFaculty)
router.post('/addParent', passport.authenticate('jwt', { session: false }), addParent)
router.post('/addTimetable', passport.authenticate('jwt', { session: false }),
    upload.single("avatar"), addTimetable)
router.get('/getFaculties', passport.authenticate('jwt', { session: false }), getAllFaculty)
router.post('/addStudent', passport.authenticate('jwt', { session: false }),addStudent)
router.get('/getStudents', passport.authenticate('jwt', { session: false }), getAllStudents)
router.post('/addSubject', passport.authenticate('jwt', { session: false }), addSubject)
router.post('/assignFaculty', passport.authenticate('jwt', { session: false }), assignFaculty)
router.get('/getSubjects', passport.authenticate('jwt', { session: false }),getAllSubjects)

module.exports = router