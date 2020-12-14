var express = require('express');
var router = express.Router();
var db = require('../models/index');
const Op = db.Sequelize.Op;
var formidable = require('formidable');
var bodyParser = require('body-parser');
var multer = require ('multer');
const fastcsv = require("fast-csv");
const fs = require("fs");

var upload_middleware = multer({dest: './csv_files/uploads/'});

module.exports = function () {

    router.post("/", upload_middleware.single('file'),(req, res) => {
       console.log(req.file.path);
       
        

    })

    return router;
}