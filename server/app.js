global.__compiled_dirname = __dirname;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./models/index');
var index = require('./controllers/index');
const { fdatasync } = require('fs');


var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', index(app));

app.io = require('./helpers/socketIo')();
// create and initialize the QUEUE MANAGER
/*app.queueMan = require('./helpers/queueManager')();

// create and initialize the COUNTER MANAGER
app.counterMan = require('./helpers/counterManager')();*/

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise' + p + 'reason:' + reason);
    // application specific logging, throwing an error, or other logic here
});
module.exports = app;
