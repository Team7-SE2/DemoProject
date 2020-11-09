var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;
var transporter = require('../helpers/email');
/*
    *** API LIST ***
    GET -> /api/bookings -> restituisce la lista delle prenotazioni con il dettaglio degli utenti e delle lezioni -> se si aggiunge al path ?user_id= o ?lecture_id= filtra
    GET -> /api/bookings/students/:user_id/lectures/:lecture_id -> restituisce la singola prenotazione con il dettaglio degli utenti e delle lezioni
    DELETE -> /api/bookings/students/:user_id/lectures/:lecture_id -> elimina la singola prenotazione
    PUT -> /api/bookings/students/:user_id/lectures/:lecture_id -> modifica un dettaglio della prenotazione (future implementazioni)
    POST -> /api/bookings -> body:{user_id,lecture_id} -> crea una prenotazione (manda in automatico una mail all'utente che si prenota)
*/  
module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    var bookingsResource = finale.resource({
        model: db.bookings,
        endpoints: ['/','/students/:user_id/lectures/:lecture_id'], //MANAGE GET, POST, PUT, DELETE
        include: [
            {model:db.users, as:'user'},
            {model:db.lectures, as:'lecture'}
        ]
    });

    // bookingsResource.create.fetch(function(req,res,context){
    //     if(req.body.user_id && req.body.lecture_id){
    //         db['users'].findByPk(req.body.user_id).then((user)=>{
    //             //TODO
    //             //controllare che lo user in questione sia uno students

    //             // save the student email
    //             let email = user.email;
    //             console.log(email);
    //             var mailOptions = {

    //                 from: "pulsbsnoreply@gmail.com",
    //                 subject: 'using Node.js',
    //                 text: 'Ti sei iscritto correttamente alla lezione'
                
    //             }
    //             // set the student email
    //             mailOptions.to = email;
    //             // respond to the caller
                
    //             // send the email to the student
    //             transporter.sendMail(mailOptions, function (error, info) {
    //                 if (error) {
    //                     console.log(error);
    //                 } else {
    //                     console.log('Email sent: ' + info.response);
    //                 }
    //             })
    //             context.continue();
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //             context.continue();
    //         })
    //     }
    //     else
    //         context.continue();
    // })

    // // API ADD booking for student
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
            var mailOptions = {

                from: "pulsbsnoreply@gmail.com",
                subject: 'using Node.js',
                text: 'Ti sei iscritto correttamente alla lezione'
            
            }
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
     
    return router;
}