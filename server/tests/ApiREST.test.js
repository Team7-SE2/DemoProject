const db = require("../models/index")
const request = require('supertest')
const app = require('../app');

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

    //==================== users API test ====================
    it('POST users', function (done) {
        request(app)
            .post('/api/users')
            .send({ name: "name_prova", surname: "surname_prova", id: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
    it('GET users', function (done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('GET/:id users', function (done) {
        request(app)
            .get('/api/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    //==================== lectures API test ====================

    it('POST lectures', function (done) {
        request(app)
            .post('/api/lectures')
            .send({ duration: 1.5, id: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
    it('GET lectures', function (done) {
        request(app)
            .get('/api/lectures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('GET/:id lectures', function (done) {
        request(app)
            .get('/api/lectures/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    //==================== bookings API test ====================

    it('POST bookings', function (done) {
        request(app)
            .post('/api/bookings')
            .send({ user_id: 1, lecture_id: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
    it('GET bookings', function (done) {
        request(app)
            .get('/api/bookings')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('GET/:id bookings', function (done) {
        request(app)
            .get('/api/bookings/students/1/lectures/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    //==================== teaching_loads API test ====================

    it('POST teaching_loads', function (done) {
        request(app)
            .post('/api/teaching_loads')
            .send({ user_id: 1, subject_id: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
    it('GET teaching_loads', function (done) {
        request(app)
            .get('/api/teaching_loads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('GET/:id teaching_loads', function (done) {
        request(app)
            .get('/api/teaching_loads/students/1/subjects/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    //==================== teachers API test ====================

    it('GET teachers', function (done) {
        request(app)
            .get('/api/teachers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    //==================== students API test ====================

    it('GET students', function (done) {
        request(app)
            .get('/api/students')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    //==================== DELETE API test ====================

    it('DELETE bookings', function (done) {
        request(app)
            .del('/api/bookings/students/1/lectures/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('DELETE teaching_loads', function (done) {
        request(app)
            .del('/api/teaching_loads/students/1/subjects/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('DELETE lectures', function (done) {
        request(app)
            .del('/api/lectures/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

    });
    it('DELETE users', function (done) {
        request(app)
            .del('/api/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

    });

});

