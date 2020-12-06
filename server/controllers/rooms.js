var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
var moment = require('moment');
const Op = db.Sequelize.Op;

module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
        model: db.rooms,
        endpoints: ['/','/:id'], //MANAGE GET, POST, PUT, DELETE
        /*include: [{
            model:db.lectures, as:'lectures'
        }]*/
    });
    
    return router;
}