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
    var userResource = finale.resource({
        model: db.users,
        endpoints: ['/', '/:id'],
        excludeAttributes: [
            "password","salt"
        ],
        // include: [{
        //     model: db.lectures,
        // }]
    });

    router.get('/:user_id/userBookings',function(req,res){
        if(req.params && req.params.user_id && req.query && req.query.startDate && req.query.endDate){
            db['users'].findAll({where:{id:req.params.user_id},include:[{model: db.lectures,where:{date: {[Op.between]:[req.query.startDate, req.query.endDate]} } }]}).then((user)=>{
                if(user && user.lectures){
                    res.send(user.lectures);
                }
                else
                    res.end();
            })
            .catch((err)=>{
                console.log(err);
                res.end();
            })
        }
        else
            res.end;
    })
    

    // check the cache first
    // userResource.list.fetch.before(function(req, res, context) {
    //     var instance = cache.get(context.criteria);
    
    //     if (instance) {
    //         // keep a reference to the instance and skip the fetch
    //         context.instance = instance;
    //         return context.skip;
    //     } else {
    //         // cache miss; we continue on
    //         return context.continue;
    //     }
    // })
    
    return router;
}