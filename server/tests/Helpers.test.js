var transporter = require('../helpers/email');

test('check helper events.js ', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var events = require('../helpers/events')()
 
    expect(events).not.toBeNull();
});

test('check mail mechanism OK', () => {

    var mailOptions = {
        from: "pulsbsnoreply@gmail.com",
        subject: 'Lecture Booking',
        text: 'Ti sei iscritto correttamente alla lezione',
        to: "prova@prova.it",
    }
    expect(transporter).not.toBeNull();
    try {
        transporter.sendEmail(mailOptions)
    } catch (error) {
        expect(error).not.toBe();
    }
})

// test('check mail mechanism NOK', () => {
//     var mailOptions= null;
//     try {
//         transporter.sendEmail(mailOptions)
//     } catch (error) {
//         expect(error).toBe();
//     }
// })
test('check helper events.js 2 ', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var events = require('../helpers/events')()
 
    expect(events).not.toBeNull();
});