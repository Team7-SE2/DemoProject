var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
//const fs = require('fs')
//var path = require('path');
//var root = path.dirname(require.main.filename);
//const Op = db.Sequelize.Op;
//const csvFilePath =  root + '/../csv_files/Students.csv' // or any file format

/*
    *** API LIST ***
    GET -> /api/students -> restituisce la lista degli studenti -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/students/:id -> restituisce il singolo studente
    DELETE -> /api/students/:id -> elimina il singolo studente
    PUT -> /api/students/:id -> modifica dettagli dello studente
    POST -> /api/students -> body:{campi della tabella} -> crea uno studente
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

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });
    
    // Create REST resource
    finale.resource({
        model: db.users,
        endpoints: ['/','/:id'], //MANAGE GET, POST, PUT, DELETE
        excludeAttributes: [
            "password"
        ],
        // controls if the user is a STUDENT
        include: [{
            model: db.roles,
            where: { role: 'Student' },
            as: 'role',
            attributes: []
        }]
    });


    return router;
}