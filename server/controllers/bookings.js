var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;
var transporter = require('../helpers/email');
var moment = require("moment")
const { jsPDF } = require("jspdf");
var path = require('path');
const { create } = require('domain');
//const fs = require('fs')
//var path = require('path');
//var root = path.dirname(require.main.filename);
//const csvFilePath =  root + '/../csv_files/Enrollment.csv' // or any file format

const ObjectsToCsv = require('objects-to-csv');

/*
    *** API LIST ***
    GET -> /api/bookings -> restituisce la lista delle prenotazioni con il dettaglio degli utenti e delle lezioni -> se si aggiunge al path ?user_id= o ?lecture_id= filtra
    GET -> /api/bookings/students/:user_id/lectures/:lecture_id -> restituisce la singola prenotazione con il dettaglio degli utenti e delle lezioni
    DELETE -> /api/bookings/students/:user_id/lectures/:lecture_id -> elimina la singola prenotazione
    PUT -> /api/bookings/students/:user_id/lectures/:lecture_id -> modifica un dettaglio della prenotazione (future implementazioni)
    POST -> /api/bookings -> body:{user_id,lecture_id} -> crea una prenotazione (manda in automatico una mail all'utente che si prenota)
*/
module.exports = function () {

    /*router.get('/csv', (req, res) => {

        console.log(csvFilePath)
        // Check if file specified by the filePath exists 
        fs.exists(csvFilePath, function(exists){
            if (exists) {  
                
                res.download(csvFilePath)
                
            } else {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("ERROR File does not exist");
            }
        });
        
    })*/

//http://localhost:3100/api/bookings/getStudentWaitingList?lecture_id=1027
    router.get('/getStudentWaitingList', (req, res) => {

        db['bookings'].min('updated_at', {
            where: {
                lecture_id: { [Op.eq]: req.query.lecture_id },
                waiting:{ [Op.eq]: 1 }


            }
        }).then((mindate) => {


            db['bookings'].findOne({
                where: {
                    updated_at: { [Op.eq]: mindate }, 
                    lecture_id: { [Op.eq]: req.query.lecture_id },
                    waiting:{ [Op.eq]: 1 }


                }, include: [
                    { model: db.users, as: 'user' },
                    {
                        model: db.lectures, as: 'lecture', include: [
                            { model: db.subjects, as: 'subject' },
                            { model: db.rooms, as: 'room' }
                        ]
                    }
                ]
            }).then((user) => {

                var mailOptions = {
                    from: "pulsbsnoreply@gmail.com",
                    subject: 'Picked from the waiting list',
                    text: 'Dear ' + user.user.name + ",\nyou are picked from the waiting list for the lecture of " + user.lecture.subject.description + " of " + moment(user.lecture.date).format("DD-MM-YYYY hh:mm") + ".\nRegards"
                }
                // set the teacher email
                mailOptions.to =user.user.email;
                // send the email to the student
                transporter.sendEmail(mailOptions);
                res.send(user);

            }).catch((err) => {
                res.send(err);
              })
        }).catch((err) => {
            res.send(err);
          })

    })











    //http://localhost:3100/api/bookings/tracingReport?user_id=3&type='PDF'
    router.get('/tracingReport', (req, res) => {
        var lecturesListIds = [];

        db['bookings'].findAll({
            where: {
                user_id: { [Op.eq]: req.query.user_id },
                waiting:{ [Op.eq]: 0 }


            }, distinct: true, include: [
                { model: db.lectures, as: 'lecture', where: { date: { [Op.gte]: moment().add(-14, "days").toDate() } } }
            ]
        }).then((bookings) => {
            bookings.forEach((b) => {
                lecturesListIds.push(b.lecture.id)
            });


            db['bookings'].findAll({
                where: {
                    lecture_id: { [Op.in]: lecturesListIds }
                }, include: [
                    { model: db.users, as: 'user', attributes: [ "id", "name", "surname", "email"] }]
            }).then((bookings2) => {
                var users = [];
                var usersObj = {};
                let studpos={};

                bookings2.forEach((b) => {
                    let user = b.dataValues.user.dataValues;
                    if (user.id != req.query.user_id) { usersObj[user.id] = user; }
                    else{
                        studpos=user;
                    }
                });
                Object.keys(usersObj).forEach((k) => {
                    users.push(usersObj[k]);
                })
                if(req.query.type === 'PDF')
                    createPDF(users, res,studpos);
                else if(req.query.type === 'CSV')
                    createCSV(users, res);
            }
            );


        });


    })
    function createPDF(users, res,studpos) {
        var doc = new jsPDF();
        var fontSize = 16;
        var offsetY = 4.797777777777778;
        var lineHeight = 6.49111111111111;

        doc.setFontSize(fontSize);
        doc.text(10, 10 + lineHeight * 0 + offsetY, 'Tracing Report for '+studpos.name+" "+studpos.surname);
        doc.text(175, 10 + lineHeight * 0 + offsetY, moment().format("DD-MM-YYYY"));

        var data = [];
        users.map(u => data.push(u));

        var header = createHeaders(["id", "name", "surname", "email"]);
        doc.table(5, 10 + lineHeight * 1 + offsetY, data, header)
        doc.save('TracingReport.pdf');
        res.sendFile(path.resolve('../server/TracingReport.pdf'));
    }

    function createCSV(users, res){
        
        var data = [];
        users.map(u => data.push(u));
        
        // If you use "await", code must be inside an asynchronous function:
        (async () => {
            const csv = new ObjectsToCsv(data);
        
            // Save to file:
            await csv.toDisk('./TracingReport.csv');
        
            // Return the CSV file as string:
            console.log(await csv.toString());
            
            res.sendFile(path.resolve('../server/TracingReport.csv'));
        })();

    }

    function createHeaders(keys) {
        return keys.map(key => ({
            'name': key,
            'prompt': key,
            'width': 65,
            'align': 'center',
            'padding': 0
        }));
    }

    router.get('/excludeLecturesCanceled', (req, res) => {
        var paramsQuery = {}
        paramsQuery = req.query;
        db['bookings'].findAll({
            where: paramsQuery, include: [
                { model: db.users, as: 'user' },
                { model: db.lectures, as: 'lecture', include: [{model:db.rooms, as: 'room'}, {model:db.subjects, as:'subject', include: [{model: db.users, as:'teacher'}]}] }
            ]
        }).then((bookings) => {
            bookings.forEach((booking, index) => {
                if (!booking.lecture)
                    bookings.splice(index, 1);
            })
            res.send(bookings);
        })
    })

    router.get('/statistics', (req, res) => {
        var paramsQueryLecture = {}
        var paramsQuerySubject = {}
        var paramsQuery = {}
        paramsQuery = req.query;
        if (req.query.startDate) {
            paramsQueryLecture.date = { [Op.gt]: moment(req.query.startDate).toDate() }
        }
        if (req.query.endDate) {
            paramsQueryLecture.date = { [Op.lt]: moment(req.query.endDate).toDate() }
        }
        if (req.query.startDate && req.query.endDate) {
            paramsQueryLecture.date = {
                [Op.gt]: moment(req.query.startDate).toDate(),
                [Op.lt]: moment(req.query.endDate).toDate()
            }
        }
        if (req.query.subject_id) {
            paramsQueryLecture.subject_id = req.query.subject_id;
            delete paramsQuery.subject_id;
        }
        if (req.query.teacher_id) {
            paramsQuerySubject.teacher_id = req.query.teacher_id;
            delete paramsQuery.teacher_id;
        }

        delete paramsQuery.startDate;
        delete paramsQuery.endDate;

        db['bookings'].findAll({
            where: paramsQuery, include: [

                { model: db.users, as: 'user', attributes: ['email'] },
                { model: db.lectures, as: 'lecture', where: paramsQueryLecture, include: [{ model: db.subjects, as: 'subject', attributes: ['subjectID'], where: paramsQuerySubject }] }

            ]
        }).then((bookings) => {

            bookings.forEach((booking, index) => {

                if (!booking.lecture)
                    bookings.splice(index, 1);
            })

            res.send(bookings);
        })
    })
    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    
    // Create REST resource
    var bookingsResource =   finale.resource({
        model: db.bookings,
        endpoints: ['/', '/students/:user_id/lectures/:lecture_id'], //MANAGE GET, POST, PUT, DELETE
        include: [
            { model: db.users, as: 'user' },
            { model: db.lectures, as: 'lecture',include: [
                { model: db.subjects, as: 'subject' },
                { model: db.rooms, as: 'room' }]}
        ]
    });

    bookingsResource.delete.fetch((req, res, context) =>{
        console.log("params" + JSON.stringify(req.params))
        console.log("query" + JSON.stringify(req.query))
        console.log("body" + JSON.stringify(req.body))

        db['bookings'].min('updated_at', {
            where: {
                lecture_id: { [Op.eq]: req.params.lecture_id },
                waiting:{ [Op.eq]: 1 }


            }
        }).then((mindate) => {


            db['bookings'].findOne({
                where: {
                    updated_at: { [Op.eq]: mindate }, 
                    lecture_id: { [Op.eq]: req.params.lecture_id },
                    waiting:{ [Op.eq]: 1 }


                }, include: [
                    { model: db.users, as: 'user' },
                    {
                        model: db.lectures, as: 'lecture', include: [
                            { model: db.subjects, as: 'subject' },
                            { model: db.rooms, as: 'room' }
                        ]
                    }
                ]
            }).then((user) => {
                user.waiting = 0;
                user.save();
                var mailOptions = {
                    from: "pulsbsnoreply@gmail.com",
                    subject: 'Picked from the waiting list',
                    text: 'Dear ' + user.user.name + ",\nyou are picked from the waiting list for the lecture of " + user.lecture.subject.description + " of " + moment(user.lecture.date).format("DD-MM-YYYY hh:mm") + ".\nRegards"
                }
                // set the teacher email
                mailOptions.to =user.user.email;
                // send the email to the student
                transporter.sendEmail(mailOptions);
                //res.send(user);
                context.continue()

            }).catch((err) => {
                //res.send(err);
                context.continue()
              })
        }).catch((err) => {
            //res.send(err);
            context.continue()
          })

    })

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
    router.post('/student', function (req, res) {

        // save the student email
        if (req.body.email && req.body.user_id && req.body.lecture_id) {
            let email = req.body.email;
            var createObj= { user_id: req.body.user_id,
                           lecture_id: req.body.lecture_id};

            if(req.body.waiting != null){
                createObj.waiting = req.body.waiting;
            }
            // add the booking and send the mail
            db['bookings'].create(createObj)
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
                            mailOptions.text = "Dear student, you correctly" + req.body.waiting ? "added in waiting list" : "booked" + "for the \"" + (lecture.subject ? lecture.subject.description : '...') + "\" course-lesson.\nIt will take on date: " + lecture.date + ".\n\nRegards"
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
    })

    return router;
}