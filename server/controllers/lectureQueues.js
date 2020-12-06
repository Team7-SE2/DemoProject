var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;
var transporter = require('../helpers/email');
var moment = require("moment")
/*
    *** API LIST ***
    GET -> /api/bookings -> restituisce la lista delle prenotazioni con il dettaglio degli utenti e delle lezioni -> se si aggiunge al path ?user_id= o ?lecture_id= filtra
    GET -> /api/bookings/students/:user_id/lectures/:lecture_id -> restituisce la singola prenotazione con il dettaglio degli utenti e delle lezioni
    DELETE -> /api/bookings/students/:user_id/lectures/:lecture_id -> elimina la singola prenotazione
    PUT -> /api/bookings/students/:user_id/lectures/:lecture_id -> modifica un dettaglio della prenotazione (future implementazioni)
    POST -> /api/bookings -> body:{user_id,lecture_id} -> crea una prenotazione (manda in automatico una mail all'utente che si prenota)
*/
module.exports = function () {

    /*router.get('/excludeLecturesCanceled', (req,res)=>{
        var paramsQuery = {}
        paramsQuery = req.query;
        db['bookings'].findAll({where:paramsQuery,include: [
            { model: db.users, as: 'user' },
            { model: db.lectures, as: 'lecture'}
        ]}).then((bookings)=>{
            bookings.forEach((booking,index)=>{
                if(!booking.lecture)
                    bookings.splice(index, 1);
            })
            res.send(bookings);
        })
    })

    router.get('/statistics', (req,res)=>{
        var paramsQueryLecture = {}
        var paramsQuerySubject = {}
        var paramsQuery = {}
        paramsQuery = req.query;
        if (req.query.startDate){
            paramsQueryLecture.date = {[Op.gt]: moment(req.query.startDate).toDate()}
        }
        if (req.query.endDate){
            paramsQueryLecture.date = {[Op.lt]: moment(req.query.endDate).toDate()}
        }
        if (req.query.startDate && req.query.endDate){
            paramsQueryLecture.date = {
                [Op.gt]: moment(req.query.startDate).toDate(),
                [Op.lt]: moment(req.query.endDate).toDate()
            }
        }
        if (req.query.subject_id){
            paramsQueryLecture.subject_id = req.query.subject_id;
            delete paramsQuery.subject_id;
        }
        if (req.query.teacher_id){
            paramsQuerySubject.teacher_id = req.query.teacher_id;
            delete paramsQuery.teacher_id;
        }

        delete paramsQuery.startDate;
        delete paramsQuery.endDate;

        db['bookings'].findAll({where: paramsQuery, include: [

            { model: db.users, as: 'user',attributes:['email'] },
            { model: db.lectures, as: 'lecture', where: paramsQueryLecture, include:[{model: db.subjects, as: 'subject', attributes:['subjectID'], where: paramsQuerySubject}] }

        ]}).then(( bookings ) => {
            
            bookings.forEach((booking, index) => {

                if(!booking.lecture)
                    bookings.splice(index, 1);
            })

            res.send(bookings);
        })
    })*/
    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
        model: db.lectureQueues,
        endpoints: ['/', '/students/:user_id/lectures/:lecture_id'], //MANAGE GET, POST, PUT, DELETE
        include: [
            { model: db.users, as: 'user' },
            { model: db.lectures, as: 'lecture'}
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
    /*router.post('/student', function (req, res) {

        // save the student email
        if (req.body.email && req.body.user_id && req.body.lecture_id) {
            let email = req.body.email;

            // add the booking and send the mail
            db['lectureQueues'].create({

                user_id: req.body.user_id,
                lecture_id: req.body.lecture_id

            })
                .then(() => {
                    var mailOptions = {

                        from: "pulsbsnoreply@gmail.com",
                        subject: 'Lecture Booking',
                        text: 'Ti sei iscritto correttamente alla lezione'

                    }

                    // API get lesson info 
                    db['lectures'].findOne({
                        include: [{
                            model: db.subjects,
                            as: 'subject',
                        }],
                        where: {
                            id: req.body.lecture_id
                        },
                    })
                        .then((lecture) => {

                            // set the student email
                            mailOptions.to = email;
                            mailOptions.text = "Dear student, you correctly booked for the \"" + (lecture.subject ? lecture.subject.description : '...') + "\" course-lesson.\nIt will take on date: " + lecture.date + ".\n\nRegards"
                            // respond to the caller
                            transporter.sendEmail(mailOptions);
                            res.status(201).end();
                            
                        })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).end();
                })
        }
        else {
            res.status(500).end()
        }
    })*/

    return router;
}