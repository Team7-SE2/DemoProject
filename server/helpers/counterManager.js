var counterConfiguration = require('../config/counters.json');
var queueManager = require('./queueManager.js')();
var c = require('./counter.js');

var counterMan;
var counterManInitialized = false;

// initialize the counter manager in order to read all the request Types
var _initialize = function (){

    try{

        // iterate over counter type JSON
        counterConfiguration.forEach((counter) => {

            _addCounter(counter.counterName, counter.counterCode, counter.requestTypes);

        })

        console.log("[COUNTER MANAGER]: initialized correctly");

    } catch (err) {

        console.log("[COUNTER MANAGER]: an error occured during initialization -> " + err)
        return false;

    }

    return true;

}
    
// create a new counter for a specific counter type
// return a counter reference or undefined if the counter type is invalid
var _addCounter = function (counterName, counterCode, requestTypes) {

    // check if the counterCode is valid or not -> search inside JSON file
    var counterIndex = counterConfiguration.findIndex((counter) => {

        return counter.counterCode === counterCode;

    });

    // the counter type wasn't configured in the JSON file
    if(counterIndex === -1)
        return undefined;

    // check if the counter was configured previously
    counterIndex = counterMan.counterList.findIndex((counter) => {

        return counter.counterCode === counterCode;

    });

    if (counterIndex > -1)
        return counterMan.counterList[counterIndex];

    // from request types array obtain queues object array 
    var queues = [];

    requestTypes.forEach((request) => {

        var queue = queueManager.getQueue(request);
        queues.push(queue);

    });

    var counter = c (counterName, counterCode, queues, requestTypes);

    // add the counter inside the manager 
    counterMan.counterList.push(counter);

    return counter;

}

module.exports = function () {

    // if not created yet, create the counter management object -> SINGLETON
    if (!counterMan){

        counterMan = {};
        counterMan.counterList = []; // the list of queue -> one queue corresponds to on request type

        console.log("[COUNTER MANAGER]: created counter manager");

    }

    // get all the counters inside the office
    counterMan.getCounters = function () {

        return counterMan.counterList;

    }

    // get the number of counters inside the office
    counterMan.getCountersNumber = function () {

        return counterMan.counterList.length;

    }

    // return the counter configured for that code
    // return undefined if the counter type isn't valid or the counter wasn't created yet
    counterMan.getCounter = function (counterCode) {
       
        // check if the counterCode is valid or not
        var counterIndex = counterConfiguration.findIndex((counter) => {

            return counter.counterCode === counterCode;

        });

        // the counter type wasn't configured in the JSON file
        if(counterIndex === -1)
            return undefined;

        // check if the counter was already configured for the counterCode received
        counterIndex = counterMan.counterList.findIndex((counter) => {

            return counter.counterCode === counterCode;

        });

        if (counterIndex > -1)
            return counterMan.counterList[counterIndex];
        else
            return undefined;
        
    }

    // check if the counter manager was initialized correctly
    counterMan.isInitialized = function (){

        return counterManInitialized;

    }

    // initialize the counter manager only once
    if(!counterManInitialized){

        if(_initialize())
            counterManInitialized = true;

    }
    
    return counterMan;
}