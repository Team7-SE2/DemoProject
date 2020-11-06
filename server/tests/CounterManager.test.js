var counterMan = require('../helpers/counterManager.js')()

test('check if the counter.json file exists and it was configured ', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    // if the dimension of the JSON object is greater than 0, it means that the JSON file exists
    expect(counterJSON.length).toBeGreaterThan(0);

});

test('check if all the counters have got a numeric Counter Code', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    // if the code isn't defined the value IS FALSY
    var index = counterJSON.findIndex((counter) => {
        return !counter.counterCode || typeof counter.counterCode  != 'number'
    })
    
    expect(index).toBe(-1);

});

test('check if all the counters have got a Name', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    // if the name isn't defined the value IS FALSY
    var index = counterJSON.findIndex((counter) => {
        return !counter.counterName
    })
    
    expect(index).toBe(-1);

});

test('check if all the counters have got an array of request types', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    // if the service time isn't defined the value IS FALSY
    var index = counterJSON.findIndex((counter) => {
        return !counter.requestTypes || counter.requestTypes.length === 0
    })
    
    expect(index).toBe(-1);

});

test('check if the counters refers to different counter codes', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    var counterCodes = counterJSON.map((counter) => {
        return counter.counterCode
    })
    
    // if there are some repetitions, the Set will remove them
    var checkUnique = (new Set(counterCodes)).size === counterJSON.length;

    expect(checkUnique).toBe(true);

});

test('check if Counter Manager initialization was correctly done', () => {

    // if it returns true no error was found during initialization
    expect(counterMan.isInitialized()).toBe(true);

});

test('check if CounterManager counters number is greater than zero', () => {

    // if the QueueManager is correctly initialized, and the JSON file was filled,
    // the queues number must be greater than zero
    expect(counterMan.getCountersNumber()).toBeGreaterThan(0);

});

test('check if CounterManager Counter OBJECTS number is greater than zero', () => {

    // if the QueueManager is correctly initialized, and the JSON file was filled,
    // the queues number must be greater than zero
    expect(counterMan.getCounters().length).toBeGreaterThan(0);

});

test('check if CounterManager Counter OBJECTS number is the same as the JSON file', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    // if the QueueManager is correctly initialized, and the JSON file was filled,
    // the queues number must be the same as the length of the JSON array
    expect(counterMan.getCounters().length === counterJSON.length).toBe(true);

});

test('check if CounterManager returns the correct COUNTER objects', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var counterJSON = require('../config/counters.json')

    counterJSON.forEach((counter) => {

        var counterCode = counter.counterCode;
        var counterName = counter.counterName;
        var requestTypes = counter.requestTypes;

        var counterObj = counterMan.getCounter(counterCode);

        // compare the object fields with the JSON object fields
        expect(counterObj.getCounterCode()).toBe(counterCode);
        expect(counterObj.getCounterName()).toBe(counterName);

        // check if getQueue let to obtain the same counter of requestTypes
        requestTypes.forEach((request) => {
            var queue = counterObj.getQueue(request)
            expect(queue).toBeTruthy();
        })

        // check if getAllRequestTypes is the same of requestTypes
        var objRequestTypes = counterObj.getAllRequestTypes();
        expect(objRequestTypes.sort().join(',')).toBe(requestTypes.sort().join(','));

        // check if getAllQueues is the same of requestTypes
        var objQueues = counterObj.getAllQueues();
        expect(objQueues.map((queue) => queue.getRequestType()).sort().join(',')).toBe(requestTypes.sort().join(','));

    })

});