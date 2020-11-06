var express = require('express');
var router = express.Router();
var counters = require("../config/counters.json");
var counterManager = require("../helpers/counterManager.js")();

module.exports = function () {

    //Send all counters
    router.get('/', function (req, res) {
        var tmp = [];

        if(counters && counters.length > 0){
            counters.forEach(element => {
                tmp.push(element);
            });
        }
        res.send(tmp);
    });

    //Pop from right queue and send the number called
    router.post('/nextNumber', function (req, res) {
        if(req.body.counterId){
            var queue = rightQueue(req.body.counterId);
            if(!queue || !queue.size())
                res.status(500).send("Error: Any queue found with this counterId OR all queue are empty")
            else{
                res.send(queue.pop());
            }
        }
        else
            res.status(500).send("Error: MISSING counterId");
    })
    
    //RETURN RIGHT QUEUE WHERE POP
    function rightQueue (counterId) {
        let counter = counterManager.getCounter(counterId);
        if(!counter)
            return null;
        else{
            let counter_queues = counter.getAllQueues();
            if(counter_queues.length == 0)
                return null;
            else{

                if(counter_queues.length == 1)
                    return counter_queues[0];
                else{
                    var max = -1;
                    var maxQueue = [];
                    counter_queues.forEach(queue => {
                        if(queue.size()>max) 
                            max = queue.size(); 
                    });
                    counter_queues.forEach(queue => {
                        if (queue.size()==max) 
                            maxQueue.push(queue);
                    });
                    maxQueue.sort((a,b)=>{ return (a.getServiceTime() - b.getServiceTime()) });
                    
                    return maxQueue[0];
                }
            }
        }
    }

    return router;
}