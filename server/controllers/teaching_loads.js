var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;

module.exports = function () {

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    var bookingsResource = finale.resource({
        model: db.teaching_loads,
        endpoints: ['/','/users/:user_id/subjects/:subject_id'], //all teaching_loads
    });

    return router;
}