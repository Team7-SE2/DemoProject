var express = require('express');
var router = express.Router();
var requestTypes = require("../config/request_types.json");
var queueManager = require("../helpers/queueManager.js")();
var counterManager = require("../helpers/counterManager.js")();

module.exports = function () {

    //Send all requestType
    router.get('/', function (req, res) {
        var tmp = [];
        
        if(requestTypes && requestTypes.length > 0){
            requestTypes.forEach(element => {
                element.waitingTime=getWaitingTime(element);
                tmp.push(element);
            });
        }

        res.send(tmp);

    });

    router.post('/addNumberInQueue',  function (req, res)  {
        if(req.body.requestTypeId){
            console.log("Received API POST /addNumberInQueue for requestType: "+ req.body.requestTypeId);
            var queue = queueManager.getQueue(req.body.requestTypeId);
            if(!queue)
                res.status(500).send("Error: Any queue found with this requestTypeId");
            else{
                res.send(queue.push())
            }
        }
        else{
            res.status(500).send("Error: MISSING requestTypeId");
        }
    })
    
    function getWaitingTime(requestType){
        var WaitingTime=0;
        var servTime=requestType.serviceTime;
        var queue =queueManager.getQueue(requestType.typeCode);
        var numperson=queue.size();
        
        if(!numperson)
        return 0;

        var countersList=counterManager.getCounters().filter((c)=>(c.requestTypes.includes(requestType.typeCode)));
        var count =0;
        var numTypeReq=countersList.map((c)=>count+=c.requestTypes.length);
        WaitingTime=servTime*((numperson/(1/count))+0.5)
        return WaitingTime;
    };

    return router;
}