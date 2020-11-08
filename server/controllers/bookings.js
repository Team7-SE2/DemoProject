var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;

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
var mailOptions = {

    from: "pulsbsnoreply@gmail.com",
    subject: 'using Node.js',
    text: 'Ti sei iscritto correttamente alla lezione'

}

module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    var bookingsResource = finale.resource({
        model: db.bookings,
        endpoints: ['/','/students/:user_id/lectures/:lecture_id'], //all bookings
    });

    // API ADD booking for student
    router.post('/students/:user_id/lectures/:lecture_id', function (req, res) {

        // save the student email
        let email = req.body.email;
        console.log(email);

        // add the booking and send the mail
        db['bookings'].create({

            user_id: req.body.user_id,
            lecture_id: req.body.lecture_id
            
        })
        .then(() => {

            // set the student email
            mailOptions.to = email;
            // respond to the caller
            res.send();
            // send the email to the student
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })

        })
        .catch((err) => {
            console.log(err)
            res.end();
        })

    })

    // API DELETE booking for student
    // DELETE request on /students/:user_id/lectures/:lecture_id
     
    return router;
}