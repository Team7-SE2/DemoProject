async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password: password }),
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((obj) => { resolve(obj); })
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout() {
    //Fake API, parlare con Gaetano
    return new Promise((resolve, reject) => {
        resolve(null);
    });
    /*
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });
    */
}

async function getStudentCourses(studentId) {
    if (studentId) {
        let url = "/api/teaching_loads/students/" + studentId;
        const response = await fetch(url);
        const studentCoursesJson = await response.json();

        if (response.ok) {
            return (studentCoursesJson.map((course) => course));  // have to do parsing
        }
        else {
            console.log("studentCoursesJson Error");
            let err = { status: response.status, errObj: studentCoursesJson };
            throw err;
        }
    }

}

async function getSubject(subjectId) {

    let url = "/api/subjects?id=" + subjectId;
    const response = await fetch(url);
    const studentCoursesJson = await response.json();

    if (response.ok) {
        return (studentCoursesJson.map((course) => course));  // have to do parsing
    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: studentCoursesJson };
        throw err;
    }

}

async function getSubjects() {
    
    let url = "/api/subjects"
    console.log(url)
    const response = await fetch(url);
    const studentCoursesJson = await response.json();

    if (response.ok) {
        return (studentCoursesJson.map((course) => course));  // have to do parsing
    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: studentCoursesJson };
        throw err;
    }

}

async function getStudentBookings(studentId) {

    let url = "/api/bookings?user_id=" + studentId;
    const response = await fetch(url);
    const studentBookingsJson = await response.json();
    let id = 1;
    if (response.ok) {
        
        let array = studentBookingsJson.map(async (book) => {

            let startDate = new Date(book.lecture.date);

            let endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + book.lecture.duration)

            let subjectDescription = '';

            await getSubject(book.lecture.subject_id).then((subject) => {
                subjectDescription = subject[0].description;
            })

            return {
                courseId: book.lecture.subject_id,
                id: id++,
                title: subjectDescription,
                startDate: startDate,
                endDate: endDate,
                ownerId: book.user_id,
                roomId: 1,
                room: 'Room 1',
                teacher: 'Teacher Vetrò',
                teacherId: 1
            }
        });


        return await Promise.all(array);

    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: studentBookingsJson };
        throw err;
    }

}

async function getStudentBookingsexcludeLecturesCanceled(studentId) {

    let url = "/api/bookings/excludeLecturesCanceled?user_id=" + studentId;
    const response = await fetch(url);
    const studentBookingsJson = await response.json();
    let id = 1;
    if (response.ok) {
        
        let array = studentBookingsJson.map(async (book) => {

            let startDate = new Date(book.lecture.date);

            let endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + book.lecture.duration)

            let subjectDescription = '';

            await getSubject(book.lecture.subject_id).then((subject) => {
                subjectDescription = subject[0].description;
            })

            return {
                courseId: book.lecture.subject_id,
                id: id++,
                title: subjectDescription,
                startDate: startDate,
                endDate: endDate,
                ownerId: book.user_id,
                roomId: 1,
                room: 'Room 1',
                teacher: 'Teacher Vetrò',
                teacherId: 1
            }
        });

        

        return await Promise.all(array);

    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: studentBookingsJson };
        throw err;
    }

}

async function getStudentCourseLectures(courseID) {
    let url = "/api/lectures/includeDeleted?subject_id=" + courseID;
    const response = await fetch(url);
    const studentCourseLecturesJson = await response.json();
    
    if (response.ok) {
        return (studentCourseLecturesJson.map((lecture) => lecture));
    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: studentCourseLecturesJson };
        throw err;
    }
}

async function getCourseLectures(params) {
    let paramsString = '';
    Object.keys(params).forEach((k, index) => {
        if(index == 0)
            paramsString = '?' + k + '=' + params[k]
        else 
            paramsString += '&' + k + '=' + params[k]

    });

    let url = "/api/lectures/includeDeleted"+paramsString;
  
    const response = await fetch(url);
    const studentCourseLecturesJson = await response.json();
    
    if (response.ok) {
        return (studentCourseLecturesJson.map((lecture) => lecture));
    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: studentCourseLecturesJson };
        throw err;
    }
}

async function getStudentListforLecture(lectureId) {
    let url = "/api/bookings?lecture_id=" + lectureId + "&user.role_id=5";
    const response = await fetch(url);
    const studentListJson = await response.json();

    if (response.ok) {
        return (studentListJson.map((student) => student));
    }
    else {
        console.log("studentListJson Error");
        let err = { status: response.status, errObj: studentListJson };
        throw err;
    }
}

async function bookLecture(user_id, lecture_id, email) {
    let obj = {
        user_id: user_id,
        lecture_id: lecture_id,
        email: email
    };
    const url = `/api/bookings/student`;
    //const url = "/api/bookings";
    return new Promise((resolve, reject) => {
        fetch(url, {             //Set correct URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            body: JSON.stringify(obj),
        }).then((response) => {
            if (response.ok) {
                resolve(response.text());

            } else {
                // analyze the cause of error
                console.log(response);
                response.json()
                    .then((ob) => { reject(ob); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function deleteBookedLecture(user_id, lecture_id) {

    const url = `/api/bookings/students/${user_id}/lectures/${lecture_id}`;
    return new Promise((resolve, reject) => {
        fetch(url, {             //Set correct URL
            method: 'DElETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }).then((response) => {
            if (response.ok) {
                resolve(response.text());

            } else {
                // analyze the cause of error
                console.log(response);
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function getBookedLectures(user_id) {
    let url = "/api/bookings?user_id=" + user_id;
    const response = await fetch(url);
    const BookedLecturesJson = await response.json();
    if (response.ok) {
        return (BookedLecturesJson.map((l) => l));
    }
    else {
        console.log("GetBookedLectures Error");
        let err = { status: response.status, errObj: BookedLecturesJson };
        throw err;
    }
}

async function getLectures(user_id) {
    let url = "/api/teaching_loads/students/" + user_id + '/lectures';
    const response = await fetch(url);
    const coursesJson = await response.json();
    let lectureId = 1;
    let courseId = 0;
    if (response.ok) {
        let array = [];
        coursesJson.forEach((course) => {

            let lectures = course.lectures.map((lecture) => {

                let startDate = new Date(lecture.date);

                let endDate = new Date(startDate);
                endDate.setHours(startDate.getHours() + lecture.duration)


                return {
                    courseId: course.id,
                    id: lectureId++,
                    title: course.description,
                    startDate: startDate,
                    endDate: endDate,
                    ownerId: user_id,
                    roomId: 1,
                    room: 'Room 1',
                    teacher: 'Teacher Vetrò',
                    teacherId: course.teacher_id
                }

            })
            lectures.forEach((l) => array.push(l))
            courseId++;
        });

        return await Promise.all(array);

    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: coursesJson };
        throw err;
    }
}

async function getTeacherLectures(user_id) {
    let url = `/api/lectures/users/${user_id}`;
    const response = await fetch(url);
    const lecturesJson = await response.json();
    let id = 1;
    if (response.ok) {
        let array = [];
        lecturesJson.forEach((lecture) => {
            let startDate = new Date(lecture.date);

            let endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + lecture.duration)
            array.push({
                /*location: lecture.subject_id,
                id: id++,
                title: lecture.subject.description,
                startDate: startDate,
                endDate: endDate,
                ownerId: user_id,*/

                courseId: lecture.subject_id,
                id: id++,
                title: lecture.subject.description,
                startDate: startDate,
                endDate: endDate,
                ownerId: user_id,
                roomId: 1,
                room: 'Room 1'
            })
        });

        return await Promise.all(array);

    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: lecturesJson };
        throw err;
    }
}

async function getTeacherLecturesWithParams(user_id, params) {
    let paramsString = '';
    Object.keys(params).forEach((k, index) => {
        if(index == 0)
            paramsString = '?' + k + '=' + params[k]
        else 
            paramsString += '&' + k + '=' + params[k]

    })
    let url = `/api/lectures/users/${user_id}` + paramsString;
    const response = await fetch(url);
    //let lectures = []
    const lecturesJson = await response.json();

    for (const lecture of lecturesJson) {
        await getStudentListforLecture(lecture.id).then((students) => {
            //let newLecture = lecture;
            lecture.studentsCount = students.length;
            //lectures.push(students.length)

        });
    }

    if (response.ok) {
        return await Promise.all(lecturesJson);
    }
    else {
        console.log("studentCoursesJson Error");
        let err = { status: response.status, errObj: lecturesJson };
        throw err;
    }
}

async function getTeacherSubjects(teacher_id) {
    let url = "/api/subjects?teacher_id=" + teacher_id; //CI MANCA L?URL 
    const response = await fetch(url);
    const teacherSubjectsJson = await response.json();

    if (response.ok) {
        return (teacherSubjectsJson.map((subject) => subject));
    }
    else {
        console.log("teacherSubjectsJson Error");
        let err = { status: response.status, errObj: teacherSubjectsJson };
        throw err;
    }
}

async function getbookings(LectureId) {

    let url = "/api/bookings?lecture_id=" + LectureId;
    const response = await fetch(url);
    const bookingsJson = await response.json();

    if (response.ok) {

        return bookingsJson;  // have to do parsing
    }
    else {
        console.log("getStudentsforLectures Error");
        let err = { status: response.status, errObj: bookingsJson };
        throw err;
    }

}

async function getStatisticsBookings(params) {

    let paramsString = '';
    Object.keys(params).forEach((k, index) => {
        if(index == 0)
            paramsString = '?' + k + '=' + params[k]
        else 
            paramsString += '&' + k + '=' + params[k]

    })

    let url = "/api/bookings/statistics"+paramsString;
    const response = await fetch(url);
    const bookingsJson = await response.json();

    if (response.ok) {

        return bookingsJson;  // have to do parsing
    }
    else {
        console.log("getStudentsforLectures Error");
        let err = { status: response.status, errObj: bookingsJson };
        throw err;
    }

}

async function deleteLecture(lecture_id) {
    const url = `/api/lectures/${lecture_id}`;
    return new Promise((resolve, reject) => {
        fetch(url, {             //Set correct URL
            method: 'DElETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }).then((response) => {
            if (response.ok) {
                resolve(response.text());

            } else {
                // analyze the cause of error
                console.log(response);
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


async function turnOnRemote(lecture_id) {
    const url = `/api/lectures/${lecture_id}`;
    return new Promise((resolve, reject) => {
        fetch(url, {             //Set correct URL
            method: 'PUT',
            body: JSON.stringify({remote: true}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }).then((response) => {
            if (response.ok) {
                resolve(response.text());

            } else {
                // analyze the cause of error
                console.log(response);
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else

            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

const API = { getSubjects, getSubject, getStatisticsBookings, getCourseLectures, getTeacherLecturesWithParams, getStudentBookingsexcludeLecturesCanceled, turnOnRemote, deleteLecture, getStudentListforLecture, getStudentCourses, getStudentCourseLectures, getBookedLectures, getLectures, getTeacherLectures, deleteBookedLecture, getTeacherSubjects, bookLecture, userLogin, userLogout, getStudentBookings, getbookings };
export default API;