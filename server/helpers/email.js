var nodemailer = require('nodemailer');

var emailHelper = {};
emailHelper.transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: "pulsbs.noreply@gmail.com",  //"pulsbs.noreply2020@gmail.com"

        pass: "provanoreply1"
    }, tls: {
        rejectUnauthorized: false
    }
});

emailHelper.sendEmail = async function (mailOptions) {
    emailHelper.transporter.sendMail(mailOptions)
}

module.exports = emailHelper;