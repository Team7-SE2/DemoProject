var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
var moment = require('moment');
const Op = db.Sequelize.Op;

/*
    *** API LIST ***
    GET -> /api/lectures -> restituisce la lista delle lezioni -> se si aggiunge al path ?startDate=blablabla&endDate=blablabla filtra per data
    GET -> /api/lectures/:id -> restituisce la singola lezione
    DELETE -> /api/lectures/:id -> elimina la singola prenotazione
    PUT -> /api/lectures/:id -> modifica dettagli della lezione
    POST -> /api/lectures -> body:{campi della tabella} -> crea una lezione
*/  

module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
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
        ]
    });

    // API teacher LECTURES LOADS 
    router.get('/users/:user_id', function (req, res) {
        
        // get only users with ROLE-STUDENT
        if (req.params && Number(req.params.user_id)) {
            db['lectures'].findAll({
                include: [{
                    model: db.subjects,
                    as: 'subject',
                    where: { 
                        teacher_id: req.params.user_id 
                    },
                }]
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
    
    return router;
}