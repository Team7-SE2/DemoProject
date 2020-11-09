var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
var moment = require('moment');
const Op = db.Sequelize.Op;

/*
    *** API LIST ***
    GET -> /api/teachers -> restituisce la lista degli insegnanti -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/teachers/:id -> restituisce il singolo insegnante
    DELETE -> /api/teachers/:id -> elimina il singolo insegnante
    PUT -> /api/teachers/:id -> modifica dettagli dello insegnante
    POST -> /api/teachers -> body:{campi della tabella} -> crea un insegnante

    GET -> /api/teachers/:id/nextLecture -> restituisce la prossima lezione dell'insegnante con il numero degli studenti prenotati in "studentsBookedNumber"
*/ 

module.exports = function () {


    router.get('/:teacher_id/nextLecture', function (req, res) {
        if (req.params && req.params.teacher_id) {
            db['lectures'].findOne({
                include: [{
                    model: db.subjects,
                    as: 'subject',
                    where: { teacher_id: req.params.teacher_id }
                },
                {
                    model: db.users,
                    attribute:['id']
                },
                ],
                where: { date: { [Op.gte]: moment() } },
                order: [['date']]
            })
                .then((lecture) => {
                    lecture.dataValues.studentsBookedNumber = lecture.dataValues.users.length;
                    delete lecture.dataValues.users;
                    res.send(lecture);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).end();
                })
        }
        else {
            console.log("Some params missing requesting teacher's next lecture!");
            res.status(500).end();
        }
    })
    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    var teacherResource = finale.resource({
        model: db.users,
        endpoints: ['/', '/:id'], //MANAGE GET, POST, PUT, DELETE
        excludeAttributes: [
            "password", "salt"
        ],
        // controls if the user is a TEACHER
        include: [{
            model: db.roles,
            where: { role: 'Teacher' },
            as: 'role',
            attributes: []
        }]
    });

    return router;
}