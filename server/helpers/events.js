//TODO questa soluzione non è il massimo,  si potrebbe integrare l'event emitter nei singoli oggetti invece di usarne uno
//global, sono da investigare i pro e i contro
var events = require('events');
var eventEmitter;

function createEventEmitter() {
    if (!eventEmitter)
        eventEmitter = new events.EventEmitter();
    return eventEmitter;
}
module.exports = createEventEmitter;