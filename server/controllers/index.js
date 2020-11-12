﻿var express = require('express');
var router = express.Router();
var io = require('../helpers/socketIo')();
var db = require('../models/index');

// autentication token dependencies
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const expireTime = 300; //seconds

var { Validator, ValidationError } = require('express-json-validator-middleware');

module.exports = function (app) {

    // Initialize a Validator instance first
    var validator = new Validator({allErrors: true}); // pass in options to the Ajv instance
    
    // Define a shortcut function
    var validate = validator.validate;

    // Process body content
    router.use(express.json());

    // used to check login password
    var apiCheckPassword = function(dbHash, password) {
  
        console.log("hash of: " + password);
        var check = bcrypt.compareSync(password, dbHash);
      
        console.log(check)
      
        return check;
      
    }

    router.post('/api/login', function(req,res){

        const email = req.body.email;
        const password = req.body.password;

        db['users'].findOne({

            where:{
                email: email
            }

        }).then((user) => {

            // check if user was correctly retrieved
            if(user === undefined){
                res.status(404).end(); // Invalid e-mail
            }

            // check password hash encrypt
            if(!apiCheckPassword(user.dataValues.password, password)){

                res.status(404).end(); // Invalid password

            } else {

                //AUTHENTICATION SUCCESS
                const token = jsonwebtoken.sign({ user: user.dataValues.id }, jwtSecret, { expiresIn: expireTime});
                res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
                res.send({id: user.dataValues.id, name: user.dataValues.name, email: user.dataValues.email});

            }

        })
        
    })

    router.use(cookieParser());

    // For the rest of the code, all APIs require authentication
   /* router.use(
        jwt({
            secret: jwtSecret,
            getToken: req => req.cookies.token,
            algorithms: ['HS256'] 
        })
    );*/

    router.use('/api/users', require('./users.js')());
    router.use('/api/bookings', require('./bookings.js')());
    router.use('/api/teaching_loads', require('./teaching_loads.js')());
    router.use('/api/teachers', require('./teachers.js')());
    router.use('/api/lectures', require('./lectures.js')());
    router.use('/api/subjects', require('./subjects.js')());
    router.use('/api/students', require('./students.js')());
    // /* GET home page. */
    // router.get('/', function (req, res) {
    //     res.render('pages/index.html');
    // });

    return router;
}