var queueMan = require('../helpers/queueManager.js')()

test('check if the request_type.json file exists and it was configured ', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    // if the dimension of the JSON object is greater than 0, it means that the JSON file exists
    expect(requestTypeJSON.length).toBeGreaterThan(0);

});

test('check if all the requests have got a numeric Type Code', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    // if the code isn't defined the value IS FALSY
    var index = requestTypeJSON.findIndex((request) => {
        return !request.typeCode || typeof request.typeCode  != 'number'
    })
    
    expect(index).toBe(-1);

});

test('check if all the requests have got a Name', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    // if the name isn't defined the value IS FALSY
    var index = requestTypeJSON.findIndex((request) => {
        return !request.typeName
    })
    
    expect(index).toBe(-1);

});

test('check if all the requests have got a QueueID', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    // if the name isn't defined the value IS FALSY
    var index = requestTypeJSON.findIndex((request) => {
        return !request.queueID
    })
    
    expect(index).toBe(-1);

});

test('check if all the requests have got a numeric Service Time', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    // if the service time isn't defined the value IS FALSY
    var index = requestTypeJSON.findIndex((request) => {
        return !request.serviceTime || typeof request.serviceTime  != 'number'
    })
    
    expect(index).toBe(-1);

});

test('check if the requests refers to different types', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    var requestCodes = requestTypeJSON.map((request) => {
        return request.typeCode
    })
    
    // if there are some repetitions, the Set will remove them
    var checkUnique = (new Set(requestCodes)).size === requestTypeJSON.length;

    expect(checkUnique).toBe(true);

});

test('check if the requests refers to different queueID', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    var queueIDs = requestTypeJSON.map((request) => {
        return request.queueID
    })
    
    // if there are some repetitions, the Set will remove them
    var checkUnique = (new Set(queueIDs)).size === requestTypeJSON.length;

    expect(checkUnique).toBe(true);

});

test('check if Queue Manager initialization was correctly done', () => {

    // if it returns true no error was found during initialization
    expect(queueMan.isInitialized()).toBe(true);

});

test('check if QueueManager queues number is greater than zero', () => {

    // if the QueueManager is correctly initialized, and the JSON file was filled,
    // the queues number must be greater than zero
    expect(queueMan.getQueuesNumber()).toBeGreaterThan(0);

});

test('check if QueueManager Queue OBJECTS number is greater than zero', () => {

    // if the QueueManager is correctly initialized, and the JSON file was filled,
    // the queues number must be greater than zero
    expect(queueMan.getQueues().length).toBeGreaterThan(0);

});

test('check if QueueManager Queue OBJECTS number is the same as the JSON file', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    // if the QueueManager is correctly initialized, and the JSON file was filled,
    // the queues number must be the same as the length of the JSON array
    expect(queueMan.getQueues().length === requestTypeJSON.length).toBe(true);

});

test('check if QueueManager returns the correct QUEUE objects', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    requestTypeJSON.forEach((request) => {

        var typeCode = request.typeCode;
        var typeName = request.typeName;
        var serviceTime = request.serviceTime;

        var queue = queueMan.getQueue(typeCode);

        // compare the object fields with the JSON object fields
        expect(queue.getRequestType()).toBe(typeCode);
        expect(queue.getRequestName()).toBe(typeName);
        expect(queue.getServiceTime()).toBe(serviceTime);

    })

});

test('check if QUEUE objects pop and push correctly items', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var requestTypeJSON = require('../config/request_types.json')

    requestTypeJSON.forEach((request) => {

        var typeCode = request.typeCode;
        var typeName = request.typeName;
        var serviceTime = request.serviceTime;
        var queueID = request.queueID;

        var queue = queueMan.getQueue(typeCode);

        // compare the object fields with the JSON object fields
        expect(queue.getRequestType()).toBe(typeCode);
        expect(queue.getRequestName()).toBe(typeName);
        expect(queue.getServiceTime()).toBe(serviceTime);
        expect(queue.getQueueID()).toBe(queueID);

    })

    var queues = queueMan.getQueues();

    queues.forEach((queue) => {

        var queueID = queue.getQueueID();

        // check isEmpty method
        expect(queue.isEmpty()).toBe(true);

        // push the first item
        queue.push();
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
        
        // push the second item
        queue.push();
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(2);

        // pop the item1
        expect(queue.pop()).toBe(queueID+0)
        expect(queue.size()).toBe(1);

        // pop the item2
        expect(queue.pop()).toBe(queueID+1)
        expect(queue.size()).toBe(0);

        expect(queue.isEmpty()).toBe(true);

        // check clear method
        queue.push();
        queue.push();
        
        expect(queue.isEmpty()).toBe(false);

        queue.reset();
        expect(queue.isEmpty()).toBe(true);

    });

});
