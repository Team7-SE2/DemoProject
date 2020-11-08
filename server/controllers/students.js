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
    var studentResource = finale.resource({
        model: db.users,
        endpoints: [
            '/',                                    // GET ALL STUDENTS
            '/:student_id',                         // GET ONE STUDENT
            '/:student_id/teaching_loads',          // GET STUDENT TEACHING LOAD
            '/:student_id/bookings/:lecture_id'     // POST/DELETE STUDENT BOOKING
        ],
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