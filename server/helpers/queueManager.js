var requestTypeConfiguration = require('../config/request_types.json');
var cq = require('./queue.js');

var queueMan;
var queueManInitialized = false;

// initialize the queue manager in order to read all the request Types
var _initialize = function (){

    try {

        // iterate over request type JSON
        requestTypeConfiguration.forEach((request) => {

            _addQueue(request.typeName, request.typeCode, request.queueID, request.serviceTime );

        })

        console.log("[QUEUE MANAGER]: initialized correctly");

    } catch (err) {

        console.log("[QUEUE MANAGER]: an error occured during initialization -> " + err)
        return false;

    }

     return true;

}
    
// create a new queue for a specific request type
// return a queue reference or undefined if the request type is invalid
var _addQueue = function (typeName, typeCode, queueID, serviceTime) {

    // check if the typeCode is valid or not
    var requestIndex = requestTypeConfiguration.findIndex((request) => {

        return request.typeCode === typeCode;

    });

    // the request type wasn't configured in the JSON file
    if(requestIndex === -1)
        return undefined;

    // check if the queue was already configured for the typeCode received
    var queueIndex = queueMan.queueList.findIndex((queue) => {

        return queue.typeCode === typeCode;

    });

    if (queueIndex > -1)
        return queueMan.queueList[queueIndex];

    // the queue is recognized by the request type and the queue of tickets
    var queue = cq(typeName, typeCode, queueID, serviceTime);

    // add the created queue inside the list of queue
    queueMan.queueList.push(queue);

    return queue;

}

module.exports = function () {

    // if not created yet, create the queue management object -> SINGLETON
    if (!queueMan){

        queueMan = {};
        queueMan.queueList = []; // the list of queue -> one queue corresponds to on request type

        console.log("[QUEUE MANAGER]: created queue manager");

    }

    // get all the queues inside the office
    queueMan.getQueues = function () {

        return queueMan.queueList;

    }

    // get the number of queues inside the office
    //
    // RETURNS: 
    // [value]  if the JSON file was filled with the request types
    // [0]      if the JSON file is empty
    // [-1]     if an error occured getting queuesNumber value
    queueMan.getQueuesNumber = function () {

        try {

            return queueMan.queueList.length;

        }
        catch (err) {

            Console.log("an error occured getting the QueuesNumber -> " + err)
            return -1;

        }

    }

    // return the queue configured for that request type
    // return undefined if the request type isn't valid or the queue wasn't created yet
    queueMan.getQueue = function (typeCode) {
        
        // check if the requestType is valid or not
        var requestIndex = requestTypeConfiguration.findIndex((request) => {

            return request.typeCode === typeCode;

        });

        // the request type wasn't configured in the JSON file
        if(requestIndex === -1)
            return undefined;

        // check if the queue was already configured for the requestType received
        var queueIndex = queueMan.queueList.findIndex((queue) => {

            return queue.typeCode === typeCode;

        });

        if (queueIndex > -1)
            return queueMan.queueList[queueIndex];
        else
            return undefined;
        
    }

    // check if the queue manager was initialized correctly
    queueMan.isInitialized = function (){

        return queueManInitialized;

    }

    // initialize the queue manager only once
    if(!queueManInitialized){

        if(_initialize())
            queueManInitialized = true;

    }

    return queueMan;
}