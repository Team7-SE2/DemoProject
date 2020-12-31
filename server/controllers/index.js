var express = require('express');
var router = express.Router();
var db = require('../models/index');
// autentication token dependencies
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const expireTime = 1800; //seconds
const fs = require('fs');
const async = require('async');
const Op = db.Sequelize.Op;
const moment = require('moment');

module.exports = function (app) {

    // Process body content
    router.use(express.json());

    // used to check login password
    var apiCheckPassword = function (dbHash, password) {

        var check = bcrypt.compareSync(password, dbHash);

        console.log(check)

        return check;

    }

    router.post('/api/login', function (req, res) {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;

            db['users'].findOne({

                where: {
                    email: email
                }

            }).then((user) => {
                if (!user) {
                    res.status(404).end(); // Invalid e-mail
                }
                else {
                    // check password hash encrypt
                    if (!apiCheckPassword(user.dataValues.password, password)) {

                        res.status(404).end(); // Invalid password

                    } else {

                        //AUTHENTICATION SUCCESS
                        const token = jsonwebtoken.sign({ user: user.dataValues.id, email: user.dataValues.email }, jwtSecret, { expiresIn: 1000 * expireTime });
                        res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000 * expireTime });
                        res.send({ id: user.dataValues.id, name: user.dataValues.name, email: user.dataValues.email, role_id: user.dataValues.role_id });

                    }
                }
            })
        }
        else {
            res.status(500).send("Some paramas missing");
        }
    })

    router.post('/bookingRules', function (req, res) {

        //var previousJSON = JSON.parse(fs.readFileSync('../config/bookingsRules.json').toString());
        var actualJSON = req.body;
        fs.writeFileSync('./config/bookingsRules.json', JSON.stringify(actualJSON)/*, (result) => {
            console.log(result)
        }*/);
        db['lectures'].findAll({ 
            where: { date: { [Op.gt]: moment() } }, 
            include: [{ model: db.rooms, as: 'room' },{ model: db.subjects, as: 'subject'}] 
        })
            .then((lectures) => {
                async.eachLimit(lectures, 5, function (l, callback) { 
                    l.remote = false;
                    l.save()
                        .then(()=>{ callback(); })
                        .catch((err)=>{console.log(err); callback();})
                }, function (err) {
                    if (err)
                        console.log(err)
                    Object.keys(actualJSON).forEach((k) => {
                        if (actualJSON[k]) {
                            var lectures_to_update = [];
                            switch (k) {
                                case 'first_year': {
                                    //Only lessons for the first year can be booked
                                    //setto in remote tutte le lezioni con materia con year != 1 
                                    lectures_to_update = lectures.filter((l) => {
                                        return (l.subject.year != 1)
                                    })
                                    lectures_to_update.forEach((l) => {
                                        l.remote = true;
                                    })
                                    async.eachLimit(lectures_to_update, 2, function (l, callback) {
                                        l.save()
                                            .then(()=>{ callback(); })
                                            .catch((err)=>{console.log(err); callback();})
                                    })
                                } break;
                                case 'capiency': {
                                    if (actualJSON['capiency_value']) {
                                        //Only lessons that are scheduled in a room with at least a certain capiency are bookable
                                        //setto in remote tutte le lezioni con aula meno capiente di capiency_value
                                        lectures_to_update = lectures.filter((l) => {
                                            return (l.room.capacity < actualJSON['capiency_value'])
                                        })
                                        lectures_to_update.forEach((l) => {
                                            l.remote = true;
                                        })
                                        async.eachLimit(lectures_to_update, 2, function (l, callback) {
                                            l.save()
                                                .then(()=>{ callback(); })
                                                .catch((err)=>{console.log(err); callback();})
                                        })
                                    }
                                } break;
                                case 'morning': {
                                    //Only mornign lessons are bookable
                                    //setto in remote tutte le lezioni dalle 12:00
                                    lectures_to_update = lectures.filter((l) => {
                                        return (moment(l.date).hours() >= 12)
                                    })
                                    lectures_to_update.forEach((l) => {
                                        l.remote = true;
                                    })
                                    async.eachLimit(lectures_to_update, 2, function (l, callback) {
                                        l.save()
                                            .then(()=>{ callback(); })
                                            .catch((err)=>{console.log(err); callback();})
                                    })

                                } break;
                                case 'afternoon': {
                                    //Only afternoon lessons are bookable
                                    //setto in remote tutte le lezioni fino 11:59
                                    lectures_to_update = lectures.filter((l) => {
                                        return (moment(l.date).hours() <= 11)
                                    })
                                    lectures_to_update.forEach((l) => {
                                        l.remote = true;
                                    })
                                    async.eachLimit(lectures_to_update, 2, function (l, callback) {
                                        l.save()
                                            .then(()=>{ callback(); })
                                            .catch((err)=>{console.log(err); callback();})
                                    })
                                } break;
                                default: { } break;
                            }
                        }
                    })
                    res.end();
                })
            })
    })

    router.get('/bookingRules', function (req, res) {
        var previousJSON = JSON.parse(fs.readFileSync('./config/bookingsRules.json').toString());
        res.send(previousJSON);
    })

    router.use(cookieParser());

    // For the rest of the code, all APIs require authentication
    if (process.env.NODE_ENV != "test") {
        // router.use(
        //     jwt({
        //         secret: jwtSecret,
        //         getToken: req => req.cookies.token,
        //         algorithms: ['HS256']
        //     })
        // );
    }
    router.use('/api/users', require('./users.js')());
    router.use('/api/rooms', require('./rooms.js')());
    router.use('/api/bookings', require('./bookings.js')());
    router.use('/api/teaching_loads', require('./teaching_loads.js')());
    router.use('/api/teachers', require('./teachers.js')());
    router.use('/api/lectures', require('./lectures.js')());
    router.use('/api/subjects', require('./subjects.js')());
    router.use('/api/students', require('./students.js')());
    router.use('/api/csv', require('./csv.js')());
    // /* GET home page. */
    // router.get('/', function (req, res) {
    //     res.render('pages/index.html');
    // });
    //csvParser.parse('Students');
    return router;
}