var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
var moment = require('moment');
const Op = db.Sequelize.Op;
var cron = require('cron');
var transporter = require('../helpers/email');
const fs = require('fs')
var path = require('path');
var root = path.dirname(require.main.filename);
const csvFilePath =  root + '/../csv_files/Professors.csv' // or any file format

/*
    *** API LIST ***
    GET -> /api/teachers -> restituisce la lista degli insegnanti -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/teachers/:id -> restituisce il singolo insegnante
    DELETE -> /api/teachers/:id -> elimina il singolo insegnante
    PUT -> /api/teachers/:id -> modifica dettagli dello insegnante
    POST -> /api/teachers -> body:{campi della tabella} -> crea un insegnante

    GET -> /api/teachers/:id/nextLecture -> restituisce la prossima lezione dell'insegnante con il numero degli studenti prenotati in "studentsBookedNumber"
*/ 
function reminderTodayLecture() { // 00:01

    db['lectures'].findAll({
        where: {date: {[Op.between]: [moment().set("hours",0).set("minutes",0).set("seconds",0).toDate(),moment().set("hours",23).set("minutes",59).set("seconds",59).toDate()] } },
        include: [{model: db.subjects, as: 'subject',include:[{model: db.users,as: 'teacher',attributes:['name','surname','email']} ]},{model: db.users,as:'lecture_bookings'}]
    })
    .then((lectures)=>{
        lectures.forEach((lecture)=>{
            var mailOptions = {
                from: "pulsbsnoreply@gmail.com",
                subject: 'Reminder today lecture',
                text: 'Dear teacher '+lecture.subject.teacher.name+' '+lecture.subject.teacher.surname+',\n\ryou will take a lecture '+moment(lecture.date).calendar()+".\n\rThe number of students booked for the lecture, is: "+lecture.lecture_bookings.length+".\n\rRegards"
            }
            // set the teacher email
            mailOptions.to = lecture.subject.teacher.email;
    
            // send the email to the student
            transporter.sendEmail(mailOptions);
        })
        console.log("Mandate notifiche ai teachers per le lezioni di oggi")
    })
    .catch((err)=>{
        if(err)
            console.log(err);
    })
}

/**************TEST**************/
if(process.env.NODE_ENV == "test")
    reminderTodayLecture()
/**************TEST**************/


//seconds, minutes, hours, DayOfMonth, Month, DayOfWeek, Year
const job = new cron.CronJob('0 1 0 * * *', reminderTodayLecture);
job.start(); // avvio il job

module.exports = function () {

    router.get('/csv', (req, res) => {

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
        
    })

    router.get('/:teacher_id/nextLecture', function (req, res) {
        if (req.params && req.params.teacher_id) {
            db['lectures'].findOne({
                include: [{
                    model: db.subjects,
                    as: 'subject',
                    where: { teacher_id: req.params.teacher_id }
                },{model: db.users,as:'lecture_bookings'}],
                where: { date: { [Op.gte]: moment() } },
                order: [['date']]
            })
                .then((lecture) => {
                    if(lecture){
                        lecture.dataValues.studentsBookedNumber = lecture.dataValues.lecture_bookings.length;
                        res.status(200).send(lecture);
                    }
                    else{
                        res.status(500).end();
                    }
                    
                })
        }
        else {
            console.log("Some params missing requesting teacher's next lecture!");
            res.status(500).end();
        }
    })
    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
        model: db.users,
        endpoints: ['/', '/:id'], //MANAGE GET, POST, PUT, DELETE
        excludeAttributes: [
            "password"
        ],
        // controls if the user is a TEACHER
        include: [{
            model: db.roles,
            where: { role: 'Teacher' },
            as: 'role',
            attributes: []
        }]
    });
    
    return router;
}