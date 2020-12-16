var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
//var moment = require('moment');
//const Op = db.Sequelize.Op;
//const FS = require('fs')
//var path = require('path');
//var root = path.dirname(require.main.filename);
//const csvFilePath =  root + '/../csv_files/Courses.csv' // or any file format

/*
    *** API LIST ***
    GET -> /api/subjects -> restituisce la lista delle lezioni -> se si aggiunge al path ?startDate=blablabla&endDate=blablabla filtra per data
    GET -> /api/subjects/:id -> restituisce la singola materia
    DELETE -> /api/subjects/:id -> elimina la singola prenotazione
    PUT -> /api/subjects/:id -> modifica dettagli della materia
    POST -> /api/subjects -> body:{campi della tabella} -> crea una materia
*/  

module.exports = function () {

    /*router.get('/csv', (req, res) => {

        console.log(csvFilePath)
        // Check if file specified by the filePath exists 
        FS.exists(csvFilePath, function(exists){
            if (exists) {  
                
                res.download(csvFilePath)
                
            } else {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("ERROR File does not exist");
            }
        });
        
    })*/

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
        model: db.subjects,
        endpoints: ['/','/:id'], //MANAGE GET, POST, PUT, DELETE
        include: [{
            model:db.lectures, as:'lectures'
        }]
    });
    
    return router;
}