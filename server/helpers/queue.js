const { request } = require('express');

function createQueue (typeName, typeCode, queueID, serviceTime) {
    
    var queue = {
        
        typeName : typeName,
        typeCode : typeCode,                        // REQUEST TYPE CODE
        queueID : queueID,                     
        serviceTime : serviceTime,
        ticketQueue : [],                           // QUEUE FOR TICKET
        counter : 0                                 // COUNTER FOR SERVED TICKETS

    };

    // add the element inside the queue
    queue.push = function(){

        var el = queue.queueID + queue.counter;
        queue.ticketQueue.push(queue.queueID + queue.counter);
        queue.counter++;
        return el;

    };

    // get the element from the queue
    queue.pop = function(){

        return queue.ticketQueue.shift();

    };

    // get the number of elements inside the queue
    queue.size = function(){

        return queue.ticketQueue.length;

    }

    // check if the queue is empty or not 
    queue.isEmpty = function () {

        if (queue.size() > 0)
            return false;

        else
            return true;

    }

    // get the request type linked to the queue
    queue.getRequestType = function () {

        return queue.typeCode;

    }

    // get the queue identifier
    queue.getQueueID = function () {

        return queue.queueID;

    }

    // get the request name linked to the queue
    queue.getRequestName = function () {

        return queue.typeName;

    }

    // get the service time linked to the queue
    queue.getServiceTime = function () {

        return queue.serviceTime;

    }

    // reset the queue
    queue.reset = function () {

        queue.counter = 0;
        queue.ticketQueue = [];

    }
    
    return queue;

}
module.exports = createQueue;