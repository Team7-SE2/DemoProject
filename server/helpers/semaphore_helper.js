//var sem = require('semaphore')(1);
var semaphoreObject = {};

function createSemaphore(nameSemaphore,capacity = 1) {
    if (nameSemaphore && !semaphoreObject.nameSemaphore)
        semaphoreObject[nameSemaphore] = require('semaphore')(capacity);
    return semaphoreObject;
}
module.exports = createSemaphore;