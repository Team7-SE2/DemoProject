const db = require("../models/index")
const request = require('supertest')
const app = require('../app');
const moment = require('moment');
const fs = require("fs")


test('check if the model bookings is correctly istantiated', () => {
    expect(db['bookings']).not.toBeNull();
})
test('check if the model users is correctly istantiated', () => {
    expect(db['users']).not.toBeNull();
})
test('check if the model lectures is correctly istantiated', () => {
    expect(db['lectures']).not.toBeNull();
})







describe('API test', function () {

    //==================== LOGIN =============================
    it('LOGIN NOK', function (done) {
        request(app)
            .post('/api/login')
            .send({ password: "123" })
            .set('Accept', 'application/json')
            .expect(500, done);
    })
    it('LOGIN NOK 2', function (done) {
        request(app)
            .post('/api/login')
            .send({ email: "prova2@prova.it", password: "123" })
            .set('Accept', 'application/json')
            .expect(404, done);
    })
    it('LOGIN NOK 3', function (done) {
        request(app)
            .post('/api/login')
            .send({ email: "s900000@students.politu.it", password: "125" })
            .set('Accept', 'application/json')
            .expect(404, done);
    })
    it('LOGIN OK', function (done) {
        request(app)
            .post('/api/login')
            .send({ email: "s900000@students.politu.it", password: "123" })
            .set('Accept', 'application/json')
            .expect(200, done);
    })
    it('PUT lectures', function (done) {
        request(app)
            .put('/api/lectures/2')
            .send({ date: moment().add(1, "hours").toDate() })
            .set('Accept', 'application/json')
            .expect(200, done);
    })



    //==================== users API test ====================
    it('POST users', function (done) {
        request(app)
            .post('/api/users')
            .send({ name: "name_prova", surname: "surname_prova", id: 1 })
            .set('Accept', 'application/json')
            .expect(201, done);
    });
    it('GET users', function (done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id users', function (done) {
        request(app)
            .get('/api/users/1')
            .set('Accept', 'application/json')
            .expect(200, done);
    });


    //==================== lectures API test ====================

    it('POST lectures', function (done) {
        request(app)
            .post('/api/lectures')
            .send({ duration: 1.5, id: 1, subject_id: "XY1211", date: moment().add(1, "hours").toDate(), remote: 1, room_id: 1 })
            .set('Accept', 'application/json')
            .expect(201, done);
    });
    it('PUT lectures remote', function (done) {
        request(app)
            .put('/api/lectures/2')
            .send({ remote: true })
            .set('Accept', 'application/json')
            .expect(200, done);
    })
    
    it('PUT lectures changeSchedule', function (done) {
        request(app)
            .put('/api/lectures/changeSchedule/Course/XY1211/Day/Monday 08:30')
            .send({ new_day: "Friday", new_time: "16:00" })
            .set('Accept', 'application/json')
            .expect(200, done);
    })

    it('GET lectures', function (done) {
        request(app)
            .get('/api/lectures')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('GET getCourseSchedule', function (done) {
        request(app)
            .get('/api/lectures/getCourseSchedule/XY1211')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    /*it('GET lectures csv', function (done) {
        request(app)
            .get('/api/lectures/csv')
            .set('Accept', 'application/json')
            .expect(200, done);
    });*/
    it('GET lectures deleted', function (done) {
        request(app)
            .get('/api/lectures/includeDeleted')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET lectures deleted startDate end Date', function (done) {
        request(app)
            .get('/api/lectures/includeDeleted?startDate=2020-05-11&endDate=2021-01-22&teacher_id=2')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id lectures', function (done) {
        request(app)
            .get('/api/lectures/1')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET users/:userID FAIL EMPTY', function (done) {
        request(app)
            .get('/api/lectures/users/A')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('GET users/:userID ', function (done) {
        request(app)
            .get('/api/lectures/users/5?startDate=2020-05-11&endDate=2021-01-22')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    //==================== bookings API test ====================

    it('POST bookings', function (done) {
        request(app)
            .post('/api/bookings/student')
            .send({ user_id: 900001, lecture_id: 2, email: "prova@prova.it", waiting: 0 })
            .set('Accept', 'application/json')
            .expect(201, done);
    });
    it('POST bookings 2', function (done) {
        request(app)
            .post('/api/bookings/student')
            .send({ user_id: 900001, lecture_id: 1, email: "prova@prova.it", waiting: null })
            .set('Accept', 'application/json')
            .expect(201, done);
    });

    it('POST bookings FAIL', function (done) {
        request(app)
            .post('/api/bookings/student')
            .send({ user_id: 2, lecture_id: 2 })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
    it('POST bookings FAIL 2', function (done) {
        try {
            request(app)
                .post('/api/bookings/student')
                .send({ user_id: 5, lecture_id: 2, email: "prova@prova.it" })
                .set('Accept', 'application/json')
                .expect(500, done);
        } catch (error) {
            expect(error).not.toBeNull();
        }

    });
    it('GET bookings', function (done) {
        request(app)
            .get('/api/bookings')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('GET bookings excludedLecturesCanceled', function (done) {
        request(app)
            .get('/api/bookings/excludeLecturesCanceled')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id bookings', function (done) {
        request(app)
            .get('/api/bookings/students/900001/lectures/1')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    /*it('GET csv files bookings', function (done) {
        request(app)
            .get('/api/bookings/csv')
            .set('Accept', 'application/json')
            .expect(200, done);
    });*/

    it('GET csv files getStudentWaitingList', function (done) {
        request(app)
            .get('/api/bookings/getStudentWaitingList?lecture_id=1027')
            .set('Accept', 'application/json')
            .expect(200, done);
    });



    it('GET tracingReport PDF', function (done) {
        request(app)
            .get('/api/bookings/tracingReport?user_id=900001&type=PDF')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('GET tracingReport CSV', function (done) {
        request(app)
            .get('/api/bookings/tracingReport?user_id=900001&type=CSV')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    //==================== teaching_loads API test ====================

    it('POST teaching_loads', function (done) {
        request(app)
            .post('/api/teaching_loads')
            .send({ user_id: 900001, subject_id: "XY1211" })
            .set('Accept', 'application/json')
            .expect(201, done);
    });
    it('GET teaching_loads', function (done) {
        request(app)
            .get('/api/teaching_loads')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id teaching_loads', function (done) {
        request(app)
            .get('/api/teaching_loads/students/900001/subjects/XY1211')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id teaching_loads 2', function (done) {
        request(app)
            .get('/api/teaching_loads/students/900001')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id teaching_loads 3', function (done) {
        request(app)
            .get('/api/teaching_loads/students/900001/lectures')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id teaching_loads FAIL', function (done) {
        request(app)
            .get('/api/teaching_loads/students/0')
            .set('Accept', 'application/json')
            .expect([])
            .expect(200, done);

    });
    it('GET/:id teaching_loads FAIL 2', function (done) {
        request(app)
            .get('/api/teaching_loads/students/0/lectures')
            .set('Accept', 'application/json')
            .expect({})
            .expect(200, done);
    });
    it('GET/:id teaching_loads FAIL 3', function (done) {
        request(app)
            .get('/api/teaching_loads/students/5')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id teaching_loads FAIL 4', function (done) {
        request(app)
            .get('/api/teaching_loads/students/5/lectures')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET/:id teaching_loads FAIL 5', function (done) {
        request(app)
            .get('/api/teaching_loads/students/A')
            .set('Accept', 'application/json')
            .expect([])
            .expect(200, done);
    });
    it('GET/:id teaching_loads FAIL 6', function (done) {
        request(app)
            .get('/api/teaching_loads/students/A/lectures')
            .set('Accept', 'application/json')
            .expect({})
            .expect(200, done);
    });
    //=================== Statistics test =====================
    it('GET statistics with params', function (done) {
        request(app)
            .get('/api/bookings/statistics?startDate=2020-11-28&endDate=2020-11-12&subject_id=1&teacher_id=2')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('GET statistics', function (done) {
        request(app)
            .get('/api/bookings/statistics')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    //==================== subjects API test ====================
    /*it('GET subjects csv', function (done) {
        request(app)
            .get('/api/subjects/csv')
            .set('Accept', 'application/json')
            .expect(200, done);
    });*/
    //==================== teachers API test ====================

    it('GET teachers', function (done) {
        request(app)
            .get('/api/teachers')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    /*it('GET teachers csv', function (done) {
        request(app)
            .get('/api/teachers/csv')
            .set('Accept', 'application/json')
            .expect(200, done);
    });*/

    it('GET teachers/nextLecture', function (done) {
        request(app)
            .get('/api/teachers/d9999/nextLecture')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('GET teachers/nextLecture FAIL', function (done) {
        request(app)
            .get('/api/teachers/0/nextLecture')
            .set('Accept', 'application/json')
            .expect(500, done);
    });

    it('GET teachers/nextLecture FAIL 2', function (done) {
        request(app)
            .get('/api/teachers/1/nextLecture')
            .set('Accept', 'application/json')
            .expect(500, done);
    });



    //==================== students API test ====================

    it('GET students', function (done) {
        request(app)
            .get('/api/students')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    /*it('GET students csv', function (done) {
        request(app)
            .get('/api/students/csv')
            .set('Accept', 'application/json')
            .expect(200, done);
    });*/

    //==================== DELETE API test ====================

    it('DELETE bookings', function (done) {
        request(app)
            .del('/api/bookings/students/900001/lectures/1')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('DELETE bookings', function (done) {
        request(app)
            .del('/api/bookings/students/900001/lectures/2')
            .set('Accept', 'application/json')
            .expect(200, done);
    });



    it('DELETE lectures', function (done) {
        request(app)
            .del('/api/lectures/1')
            .set('Accept', 'application/json')
            .expect(200, done);

    });
    it('DELETE teaching_loads', function (done) {
        request(app)
            .del('/api/teaching_loads/students/900001/subjects/XY1211')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
    it('DELETE users', function (done) {
        request(app)
            .del('/api/users/1')
            .set('Accept', 'application/json')
            .expect(200, done);

    });

});

//==================== CSV API test =========================

it('POST csv check error', function (done) {
        
    request(app)
    .post('/api/csv')
    .set('Accept', 'application/json')
    .expect(500, done);

});

it('POST csv Students', function (done) {

    fs.readFile('csv_files/Students.csv', 'utf8', function(err, data) {
        if (err) throw err;

        let formData = {
            file: data
        }
        request(app)
            .post("/api/csv?type=Students")
            .send(formData)
            .set('Accept', 'application/json')
            .expect(500, done);

    });
});

it('POST csv Teachers', function (done) {
    
    fs.readFile('csv_files/Professors.csv', 'utf8', function(err, data) {
        if (err) throw err;

        let formData = {
            file: data
        }
        request(app)
            .post("/api/csv?type=Professors")
            .send(formData)
            .set('Accept', 'application/json')
            .expect(500, done);

    });
});

it('POST csv Courses', function (done) {
    
    fs.readFile('csv_files/Courses.csv', 'utf8', function(err, data) {
        if (err) throw err;

        let formData = {
            file: data
        }
        request(app)
            .post("/api/csv?type=Courses")
            .send(formData)
            .set('Accept', 'application/json')
            .expect(500, done);

    });
});
it('POST csv Schedule1s', function (done) {
    
    fs.readFile('csv_files/Schedule1s.csv', 'utf8', function(err, data) {
        if (err) throw err;

        let formData = {
            file: data
        }
        request(app)
            .post("/api/csv?type=Schedule1s")
            .send(formData)
            .set('Accept', 'application/json')
            .expect(500, done);

    });
});
it('POST csv Enrollment', function (done) {
    
    fs.readFile('csv_files/Enrollment.csv', 'utf8', function(err, data) {
        if (err) throw err;

        let formData = {
            file: data
        }
        request(app)
            .post("/api/csv?type=Enrollment")
            .send(formData)
            .set('Accept', 'application/json')
            .expect(500, done);

    });
});

