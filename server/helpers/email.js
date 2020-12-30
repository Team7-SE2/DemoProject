var nodemailer = require('nodemailer');

var emailHelper = {};
emailHelper.transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: /*"pulsbs.noreply@gmail.com",*/"pulsbs.noreply2020@gmail.com",

        pass: "provanoreply1"
    }, tls: {
        rejectUnauthorized: false
    }
});

emailHelper.sendEmail = async function (mailOptions, callback) {
    emailHelper.transporter.sendMail(mailOptions, function(error, info){
        if(error)
            console.log(error)
        if(callback)
            callback();
    })
}

module.exports = emailHelper;