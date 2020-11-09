var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;

/*
    *** API LIST ***
    GET -> /api/students -> restituisce la lista degli studenti -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/students/:id -> restituisce il singolo studente
    DELETE -> /api/students/:id -> elimina il singolo studente
    PUT -> /api/students/:id -> modifica dettagli dello studente
    POST -> /api/students -> body:{campi della tabella} -> crea uno studente
*/  

module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });
    
    // Create REST resource
    var studentResource = finale.resource({
        model: db.users,
        endpoints: ['/','/:id'], //MANAGE GET, POST, PUT, DELETE
        excludeAttributes: [
            "password","salt"
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