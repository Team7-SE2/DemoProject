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
    var teachingLoadsResource = finale.resource({
        model: db.teaching_loads,
        endpoints: ['/'] //all teaching_loads
    });

    // API GET student TEACHING LOADS 
    router.get('/students/:user_id', function (req, res) {
        
        // get only users with ROLE-STUDENT
        if (req.params && req.params.user_id) {
            db['users'].findOne({
                where: { 
                    id: req.params.user_id 
                },
                include: [{
                    model: db.subjects,
                }],
                attributes: []
            })
            .then((student) => {
                // send the student's teaching load
                res.send(student.dataValues.subjects);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).end();
            })
        }
        else {
            console.log("Some params missing requesting sudent's load!");
            res.status(500).end();
        }

    })

    return router;
}