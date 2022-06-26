const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS:true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
})

const sendAttendanceMail = async (email, attendanceData, mode) => {
    try {
        if (mode == 'OTP') {
            
            return await transport.sendMail({
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: "Class Attendance",
                html: `
        <h1>You are marked as ${attendanceData.attendanceStatus} for the ongoing class</h1>
        <p> Here is your current attendance stats</p>
        <p>Subject: ${attendanceData.subjectName}</p>
        <p>Classes Attended till now: ${attendanceData.lecturesAttended}</p>
        <p>Total Classes taken by faculty: ${attendanceData.totalLecturesByFaculty}</p>
      `
            })
        }
    } catch (err) {
        console.log("err in sending attendance mail")
        console.log(err);
        throw err;
    }
};

module.exports = sendAttendanceMail  