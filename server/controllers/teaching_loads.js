var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;

/*
    *** API LIST ***
    GET -> /api/teaching_loads -> restituisce la lista degli studenti con la lista delle materie nel loro carico didattico -> con i ?nomeCampoDb= si può filtrare
    GET -> /api/teaching_loads/students/:user_id/lectures -> restituisce la lista delle lezioni del carico didattico dello studente
    GET -> /api/teaching_loads/students/:id -> restituisce la lista delle materie nel carico didattico del signolo studente
    GET -> /api/teaching_loads/students/:user_id/subjects/:subject_id' -> restituisce la singola coppia studente materia
    DELETE -> /api/teaching_loads/students/:user_id/subjects/:subject_id' -> elimina una materia dal caricao didattico dello studente
    PUT -> /api/teaching_loads/students/:user_id/subjects/:subject_id' -> modifica dettagli della coppia user_id e subject_id (future implementazioni)
    POST -> /api/teaching_loads -> body:{campi della tabella} -> aggiunge un insegnamento nel carico didattico per uno studente
*/ 

module.exports = function () {

    // API GET student TEACHING LOADS lectures
    router.get('/students/:user_id/lectures', function (req, res) {
        
        // get only users with ROLE-STUDENT
        if (req.params && req.params.user_id) {
            db['users'].findOne({
                where: { 
                    id: req.params.user_id 
                },
                include: [{
                    model: db.subjects,
                    include: [{
                        model: db.lectures,
                        as: 'lectures'
                    }],
                }],
                attributes: []
            })
            .then((student) => {
                if(student){
                    // send the student's teaching load
                    res.send(student.dataValues.subjects);
                }
                else{
                    res.send({});
                }
                
            })
        }
        else {
            console.log("Some params missing requesting sudent's load lecture!");
            res.status(500).end();
        }

    })
    
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
                if(student){
                    // send the student's teaching load
                    res.send(student.dataValues.subjects);
                }
                else{
                    res.send([]);
                }

            })
        }
        else {
            console.log("Some params missing requesting sudent's load 2!");
            res.status(500).end();
        }

    })
    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
        model: db.teaching_loads,
        endpoints: ['/','/students/:user_id/subjects/:subject_id'],  //MANAGE GET, POST, PUT, DELETE
        include: [
            {model:db.users, as:'user'},
            {model:db.subjects, as:'subject'}
        ]
    });

    return router;
}