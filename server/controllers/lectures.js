var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
var moment = require('moment');
const Op = db.Sequelize.Op;
var transporter = require('../helpers/email');
const fs = require('fs')
var path = require('path');
var root = path.dirname(require.main.filename);
const csvFilePath =  root + '/../csv_files/Schedule1s.csv' // or any file format

/*
    *** API LIST ***
    GET -> /api/lectures -> restituisce la lista delle lezioni -> se si aggiunge al path ?startDate=blablabla&endDate=blablabla filtra per data
    GET -> /api/lectures/:id -> restituisce la singola lezione
    DELETE -> /api/lectures/:id -> elimina la singola prenotazione
    PUT -> /api/lectures/:id -> modifica dettagli della lezione
    POST -> /api/lectures -> body:{campi della tabella} -> crea una lezione
*/  

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
    
    router.get('/includeDeleted',function (req, res){
        var paramsQuery = {}
        var paramsQuerySubject = {}
        paramsQuery = req.query;
        if (req.query.startDate){
            paramsQuery.date = {[Op.gt]: moment(req.query.startDate).toDate()}
        }
        if (req.query.endDate){
            paramsQuery.date = {[Op.lt]: moment(req.query.endDate).toDate()}
        }
        if (req.query.startDate && req.query.endDate){
            paramsQuery.date = {
                [Op.gt]: moment(req.query.startDate).toDate(),
                [Op.lt]: moment(req.query.endDate).toDate()
            }
        }
        if (req.query.teacher_id){
            paramsQuerySubject.teacher_id = req.query.teacher_id;
            delete paramsQuery.teacher_id;
        }

        delete paramsQuery.startDate;
        delete paramsQuery.endDate;
        db['lectures'].findAll({where: paramsQuery,paranoid:false,include:[
            {model: db.subjects, as: 'subject', where: paramsQuerySubject},
            {model:db.rooms, as: 'room'},
            {model:db.users, as: 'lecture_bookings'}
        ]})
        .then((lectures)=>{
            res.send(lectures)
        })
    })
    // API teacher LECTURES LOADS 
    router.get('/users/:user_id', function (req, res) {
        var paramsQuery = {}
        paramsQuery = req.query;
        if (req.query.startDate){
            paramsQuery.date = {[Op.gt]: moment(req.query.startDate).toDate()}
        }
        if (req.query.endDate){
            paramsQuery.date = {[Op.lt]: moment(req.query.endDate).toDate()}
        }
        if (req.query.startDate && req.query.endDate){
            paramsQuery.date = {
                [Op.gt]: moment(req.query.startDate).toDate(),
                [Op.lt]: moment(req.query.endDate).toDate()
            }
        }
        delete paramsQuery.startDate;
        delete paramsQuery.endDate;
        // get only users with ROLE-STUDENT
        if (req.params && req.params.user_id) {
            db['lectures'].findAll({
                where: paramsQuery,
                include: [{
                    model: db.subjects,
                    as: 'subject',
                    where: { 
                        teacher_id: req.params.user_id 
                    },
                },
                {model:db.rooms, as: 'room'}]
            })
            .then((lectures) => {
                res.send(lectures);
            })
        }
        else {
            console.log("Some params missing requesting sudent's load 1!");
            res.status(500).end();
        }

    })
    
    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    var LecturesResource = finale.resource({
        model: db.lectures,
        endpoints: ['/','/:id'], //MANAGE GET, POST, PUT, DELETE
        search: [
            {
            operator: Op.gt,
            param: 'startDate',
            attributes: [ 'date' ]
          },
          {
            operator: Op.lt,
            param: 'endDate',
            attributes: [ 'date' ]
          }
        ],
        include:[{model:db.rooms, as: 'room'}],
        paranoid:false
        
    });
    
    LecturesResource.delete.fetch(function(req,res,context){
        if(req.params.id){
            //TODO
            //vanno cancellati anche i bookings per quella lezione?
            db['lectures'].findOne({where:{id:req.params.id},
                include:[{model:db.subjects,as:'subject',
                    include:[{model:db.users}]}
                ]})
                .then((lecture)=>{
                    if(lecture && lecture.subject && lecture.subject.users){
                        console.log("Invio una mail a tutti gli studenti che avevano la materia nel carico didattico");
                        lecture.subject.users.forEach((student)=>{
                            var mailOptions = {
                                from: "pulsbsnoreply@gmail.com",
                                subject: 'Canceled a lecture of '+lecture.subject.description,
                                text: 'Dear '+student.name+",\nthe lecture of "+lecture.subject.description+" scheduled for "+moment(lecture.date).format('LLL')+" was canceled.\nRegards"
                            }
                            // set the teacher email
                            mailOptions.to = student.email;
                    
                            // send the email to the student
                            transporter.sendEmail(mailOptions);
                        })
                    }
                    console.log("Cancellata lezione con id: "+req.params.id);
                    context.continue();
                })
            }
        else
            context.continue();
    })

    return router;
}