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
    /*var studentResource = finale.resource({
        model: db.users,
        endpoints: ['/', ],
        excludeAttributes: [
            "password","salt"
        ],
        // include: [{
        //     model: db.lectures,
        // }]
    });*/

    // API GET all students
    router.get('/', function (req, res) 
    {
        db['users'].findAll({ 
            // get only students from users table
            include:[{
                model: db.roles,
                where:{ role : 'Student' }, 
                as : 'role',
                attributes : []
            }],
            attributes : ['userID', 'name', 'surname', 'email']
        })
        .then((students) => {
            res.send(students);
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    })

    // API GET one student 
    router.get('/:student_id', function (req, res)
    {
        // filter only the users with role_id : 5
        if (req.params && req.params.student_id) 
        {
            db['users'].findAll({ 
                where: { id: req.params.student_id }, 
                // get only students from users table
                include:[{
                    model: db.roles,
                    where:{ role : 'Student' }, 
                    as : 'role',
                    attributes : []
                }],
                attributes : ['userID', 'name', 'surname', 'email']
            })
            .then((student) => {
                res.send(student);
            })
            .catch((err) => {
                console.log(err);
                res.end();
            })
        }
        else
            res.end();
    })

    // API GET student TEACHING LOADS 
    router.get('/:student_id/teaching_loads', function (req, res)
    {
        // filter only the users with role_id linked to STUDENT
        if (req.params && req.params.student_id) 
        {
            db['users'].findAll({ 
                where: { id: req.params.student_id }, 
                // get only students from users table
                include:[{
                    model: db.roles,
                    where:{ role : 'Student' }, 
                    as : 'role',
                    attributes : []
                },{
                    model: db.subjects,
                }],
                attributes: []
            })
            .then((student) => {
                res.send(student[0].dataValues.subjects);
            })
            .catch((err) => {
                console.log(err);
                res.end();
            })
        }
        else
            res.end();
    })

    // API ADD booking for student
    router.post('/:student_id/bookings/:lecture_id',function(req,res){

        db['bookings'].findOrCreate(
        {
            where:{
                user_id: req.params.student_id,
                lecture_id: req.params.lecture_id
            },
            defaults:{
                user_id: req.params.student_id,
                lecture_id: req.params.lecture_id
            }
        }).then(() => {
            res.send();
        }).catch((err) => {
            console.log(err)
            res.end();
        })

    })

    // API DELETE booking for student
    router.delete('/:student_id/bookings/:lecture_id',function(req,res){
        if(req.params && req.params.student_id && req.params.lecture_id){
            db['bookings'].destroy(
                {
                    where:{
                        user_id: req.params.student_id,
                        lecture_id: req.params.lecture_id
                    }
                }).then(() => {
                    res.status(200).end();
                }).catch((err) => {
                    console.log(err)
                    res.status(500).end();
                })
        }
        else{
            console.log("Some params missing to delete a booking!");
            res.status(500).end();
        }

    })
    return router;
}