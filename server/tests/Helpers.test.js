var transporter = require('../helpers/email');
var csvPARSER = require('../helpers/csv_parser')
var fs = require('fs');

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

test('check mail mechanism NOK', () => {

    var mailOptions = {
        from: "pulsbsnoreply@gmail.com",
        subject: 'Lecture Booking',
        text: 'Ti sei iscritto correttamente alla lezione',
    }
    expect(transporter).not.toBeNull();
    try {
        transporter.sendEmail(mailOptions, function(){
            console.log("NOK");
        })
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

//============ CSV PARSER =============//
test('check helper csv_parser.js Students', () => {

    csvPARSER.parse('Students')

})

test('check helper csv_parser.js Students data[]', () => {

    /*fs.readFile('csv_files/Students.csv', 'utf8', function(err, data) {
        if (err) throw err;

        csvPARSER.Students(data)

    });*/
    let data = [{
        id: '900000',
        birthday: '1991-11-04',
        SSN: 'MK97060783',
        city: 'Poggio Ferro',
        name: 'Ambra',
        surname: 'Ferri',
        //password: { type: DataTypes.STRING },
        email: 's900000@students.politu.it',
    }]
    csvPARSER.Students(data)

})

test('check helper csv_parser.js Professors', () => {

    csvPARSER.parse('Professors')

})

test('check helper csv_parser.js Professors data []', () => {

    /*fs.readFile('csv_files/Professors.csv', 'utf8', function(err, data) {
        if (err) throw err;

        csvPARSER.Professors(data)

    });*/
    /*Number,GivenName,Surname,OfficialEmail,SSN
d9000,Ines,Beneventi,Ines.Beneventi@politu.it,XT6141393*/
    let data = [{
        id: 'd9000',
        birthday: '',
        SSN: 'XT6141393',
        //city: { type: DataTypes.STRING},
        name: 'Ines',
        surname: 'Beneventi',
        //password: { type: DataTypes.STRING },
        email: 'Beneventi@politu.it',
    }]
    csvPARSER.Professors(data)

})

test('check helper csv_parser.js Courses', () => {

    csvPARSER.parse('Courses')

})

test('check helper csv_parser.js Courses data []', () => {

    /*fs.readFile('csv_files_test/Courses.csv', 'utf8', function(err, data) {
        if (err) throw err;

        csvPARSER.Courses(data)

    });*/
    
    let data = [{
        code: 'XY4911',
        year: 1,
        semester: 1,
        description: 'Chimica',
        teacher: 'd9001'
    }]
    csvPARSER.Courses(data)

})

test('check helper csv_parser.js Enrollment', () => {

    csvPARSER.parse('Enrollment')

})

test('check helper csv_parser.js Enrollment data []', () => {

    /*fs.readFile('csv_files/Enrollment.csv', 'utf8', function(err, data) {
        if (err) throw err;

        csvPARSER.Enrollment(data)

    });*/

    let data = [{
        code: 'XY1211',
        student: '902800'
    }]
    csvPARSER.Enrollment(data)

})

test('check helper csv_parser.js Schedule1s', () => {

    csvPARSER.parse('Schedule1s')

})

test('check helper csv_parser.js Schedule1s data []', () => {

    /*fs.readFile('csv_files_test/Schedule1s.csv', 'utf8', function(err, data) {
        if (err) throw err;

        csvPARSER.Schedule1s(data)

    });*/
    
    let data = [{
        code: 'XY1211',
        room: 1,
        day: 'Mon',
        seats: 120,
        time: '8:30-11:30'
    }]
    csvPARSER.Schedule1s(data)

})

test('check helper csv_parser.js Error', () => {

    csvPARSER.parse('Error')

})