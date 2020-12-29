var express = require('express');
var router = express.Router();
var db = require('../models/index');
const Op = db.Sequelize.Op;
var formidable = require('formidable');
var bodyParser = require('body-parser');
var multer = require ('multer');
const fastcsv = require("fast-csv");
var csvHelper = require('../helpers/csv_parser')
var fs = require('fs');

var upload_middleware = multer({dest: './csv_files/uploads/',limits: {
    fileSize: 8000000 // Compliant: 8MB
 } });

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
            default:
                { console.log("nel default")
                res.status(500).end();
                }
        }
        try{

            fs.rename(req.file.path, destPath, function (err) {
                if (err) {
                    console.log("Rename : "+ err);
                    res.status(500).end();
                } else {
                    csvHelper.parse(requestType, function (err){
                        if(err)
                            res.status(505).end();
                        else
                            res.status(201).end();
                    });
                }
            });

        } catch (err) {
            console.log("Nel catch " + err);
            res.status(505).end();
        }

    })

    return router;
}