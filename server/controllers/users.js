var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;

/*
    *** API LIST ***
    GET -> /api/users -> restituisce la lista degli users -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/users/:id -> restituisce il singolo user
    DELETE -> /api/users/:id -> elimina il singolo user
    PUT -> /api/users/:id -> modifica dettagli dello user
    POST -> /api/users -> body:{campi della tabella} -> crea uno user
*/  

module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    }); 

    // Create REST resource
    finale.resource({
        model: db.users,
        endpoints: ['/', '/:id'],   //MANAGE GET, POST, PUT, DELETE
        excludeAttributes: [
            "password","salt"
        ]
    });
    
    return router;
}