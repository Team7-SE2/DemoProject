var express = require('express');
var router = express.Router();
var finale = require('finale-rest')
var db = require('../models/index');
const Op = db.Sequelize.Op;
var transporter = require('../helpers/email');
var moment = require("moment")

module.exports = function () {
//http://localhost:3100/api/lectureQueues/getStudent?lecture_id=5
    router.get('/getStudent', (req,res)=>{
      
        db['lectureQueues'].min('created_at',{where: {lecture_id: {[Op.eq]: req.query.lecture_id}
            

        }}).then(( mindate ) => {
          
           
            db['lectureQueues'].findOne({where: {created_at: {[Op.eq]: mindate},lecture_id:{[Op.eq]: req.query.lecture_id}
            

        },include: [
            { model: db.users, as: 'user' },
            { model: db.lectures, as: 'lecture'}
        ]}).then(( user ) => {
           
            res.send(user);
            
        })
    })
            
        })
    

    // Initialize finale
    finale.initialize({
        app: router,
        sequelize: db
    });

    // Create REST resource
    finale.resource({
        model: db.lectureQueues,
        endpoints: ['/', '/students/:user_id/lectures/:lecture_id'], //MANAGE GET, POST, PUT, DELETE
        include: [
            { model: db.users, as: 'user' },
            { model: db.lectures, as: 'lecture'}
        ]
    });

    return router;
}