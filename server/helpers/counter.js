
const { request } = require('express');

function createCounter (name, code, queues, requestTypes) {

    var counter = {
        
        counterName : name,             // Counter NAME
        counterCode : code,             // Counter CODE
        queues  : queues,               // A list of QUEUE OBJECTS managed by the counter
        requestTypes : requestTypes     // A list of QUEUE TYPES CODE

    };

    // return the queue with the requestCode passed
    // return undefined if the queue is not setted for the current counter
    counter.getQueue = function (requestCode){

        // check if the requestCode is valid or not
        var requestIndex = counter.queues.findIndex((queue) => {

            return queue.typeCode === requestCode;

        });

        // the request type wasn't configured in the JSON file
        if(requestIndex === -1)
            return undefined;

        return counter.queues[requestIndex];

    }

    // return the references to all the queues managed by the counter
    counter.getAllQueues = function () {

        return counter.queues;

    }

    // return all the types of requests managed by the counter
    counter.getAllRequestTypes = function () {

        return counter.requestTypes;

    }

    // return the number of queues configured for the current counter
    counter.getQueuesNumber = function (){

        return counter.queues.length;

    }

    // return the name of the counter
    counter.getCounterName = function () {

        return counter.counterName;

    }

    // return the id of the counter 
    counter.getCounterCode = function () {

        return counter.counterCode;

    }

    return counter;

}
module.exports = createCounter;