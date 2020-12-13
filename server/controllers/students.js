var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const fs = require('fs')
var path = require('path');
var root = path.dirname(require.main.filename);
const Op = db.Sequelize.Op;
const csvFilePath =  root + '/../csv_files/Students.csv' // or any file format

/*
    *** API LIST ***
    GET -> /api/students -> restituisce la lista degli studenti -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/students/:id -> restituisce il singolo studente
    DELETE -> /api/students/:id -> elimina il singolo studente
    PUT -> /api/students/:id -> modifica dettagli dello studente
    POST -> /api/students -> body:{campi della tabella} -> crea uno studente
*/  

module.exports = function () {

    
    router.get('/csv', (req, res) => {

        console.log(csvFilePath)
        // Check if file specified by the filePath exists 
        fs.exists(csvFilePath, function(exists){
            if (exists) {  
                
                /*var file = fs.readFile(filePath, 'binary');
                var stat = fs.statSync(filePath);

                res.setHeader('Content-Length', stat.size);
                res.setHeader('Content-Type', 'audio/mpeg');
                res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
                res.write(file, 'binary');
                res.end();*/

                res.download(csvFilePath)
                
                // Content-type is very interesting part that guarantee that
                // Web browser will handle response in an appropriate manner.
                /*res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + filePath
                });
                fs.createReadStream(filePath).pipe(res);*/
            } else {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("ERROR File does not exist");
            }
        });
        
    })

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