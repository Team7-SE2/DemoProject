var nodemailer = require('nodemailer');

// Nodemailer transporter settings
var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: "pulsbsnoreply@gmail.com",
        pass: "provanoreply1"
    }, tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;