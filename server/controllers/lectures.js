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
    var lecturesResource = finale.resource({
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
    });
    
    return router;
}