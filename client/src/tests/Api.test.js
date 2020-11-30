import API from '../api/api.js'
import moment from 'moment'
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

it('API UserLogin err', (done) => {
    API.userLogin('aaa')
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
    API.getStudentBookings(3)
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
    API.getStudentBookingsexcludeLecturesCanceled(3)
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
    API.getCourseLectures({
        startDate: moment().add(-3, "days").toISOString(),
        endDate:moment().toISOString(),
        teacher_id: 4
      })
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
it('API bookLecture', (done) => {
    API.bookLecture(68,68,"68@gimeil.com")
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
it('API deleteBookedLecture', (done) => {
    API.deleteBookedLecture(68,68)
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
    API.getTeacherLectures(4)
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
    API.getTeacherSubjects(4)
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
    API.getStatisticsBookings({
        startDate: moment().add(-3, "days").toISOString(),
        endDate:moment().toISOString(),
        teacher_id: 4
      })
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

it('API getbookings', (done) => {
    API.getbookings(10)
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

it('API deleteLecture', (done) => {
    API.deleteLecture(999)
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

it('API turnOnRemote', (done) => {
    API.turnOnRemote(999)
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