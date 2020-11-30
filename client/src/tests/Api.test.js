import API from '../api/api.js'

it('API UserLogin', (done) => {
    API.userLogin('s202022@studenti.polito.it', '123')
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API userLogout', (done) => {
    API.userLogout()
        .then(() => {
            if (done)
                done();
        })
});
it('API getStudentCourses', (done) => {
    API.getStudentCourses(3)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getSubject', (done) => {
    API.getSubject(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getStudentBookings', (done) => {
    API.getStudentBookings(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getStudentBookingsexcludeLecturesCanceled', (done) => {
    API.getStudentBookingsexcludeLecturesCanceled(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getStudentCourseLectures', (done) => {
    API.getStudentCourseLectures(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getCourseLectures', (done) => {
    API.getCourseLectures({})
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getStudentListforLecture', (done) => {
    API.getStudentListforLecture(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getBookedLectures', (done) => {
    API.getBookedLectures(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getLectures', (done) => {
    API.getLectures(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getTeacherLectures', (done) => {
    API.getTeacherLectures(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getTeacherLecturesWithParams', (done) => {
    API.getTeacherLecturesWithParams(1,{})
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getTeacherSubjects', (done) => {
    API.getTeacherSubjects(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});
it('API getStatisticsBookings', (done) => {
    API.getStatisticsBookings(1)
        .then((usrObj) => {
            expect(usrObj).not.toBeNull();
            if (done)
                done();
        })
        .catch((err) => {
            expect(err).not.toBeNull();
            if (done)
                done();
        })
});