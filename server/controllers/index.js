var express = require('express');
var router = express.Router();
var io = require('../helpers/socketIo')();

module.exports = function (app) {


    router.use('/api/users', require('./users.js')());
    
    router.use('/api/students', require('./students.js')());
    // /* GET home page. */
    // router.get('/', function (req, res) {
    //     res.render('pages/index.html');
    // });

    return router;
}