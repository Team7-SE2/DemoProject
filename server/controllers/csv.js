var express = require('express');
var router = express.Router();
var db = require('../models/index');
const Op = db.Sequelize.Op;
var formidable = require('formidable');
var bodyParser = require('body-parser');
var multer = require ('multer');
const fastcsv = require("fast-csv");
const fs = require("fs");
var csvHelper = require('../helpers/csv_parser')

var upload_middleware = multer({dest: './csv_files/uploads/'});

module.exports = function () {

    router.post("/", upload_middleware.single('file'),(req, res) => {
        console.log("TYPE:" + req.query.type);
        let requestType = req.query.type;
        let destPath = ''
        switch(requestType){

            case 'Students':
                destPath = './csv_files/Students.csv'
                break;
            
            case 'Courses':
                destPath = './csv_files/Courses.csv'
                break;

            case 'Enrollment':
                destPath = './csv_files/Enrollment.csv'
                break;
            
            case 'Professors':
                destPath = './csv_files/Professors.csv'
                break;
                
            case 'Schedule1s':
                destPath = './csv_files/Schedule1s.csv'
                break;
        }
        fs.rename(req.file.path, destPath, function (err) {
            if (err) {
                return;
            } else {
                csvHelper.parse(requestType);
            }
        });

    })

    return router;
}