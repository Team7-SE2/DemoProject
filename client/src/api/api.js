
/*async function getRequestTypes(){

    let url = "/api/requestTypes"; //todo: waiting for Giosue's Endpoints
    const response = await fetch(url); 
    const requestTypesJson = await response.json(); 

    if (response.ok) {
        
        return requestTypesJson;  // have to do parsing
    }
    else {
        console.log("getRequestType Error"); 
        let err = {status: response.status, errObj: requestTypesJson};
        throw err; 
    }

}*/
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
    return new Promise((resolve, reject) =>  {
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

async function getStudentCourses(studentId){

    let url = "/api/teaching_loads/students/" + studentId; 
    const response = await fetch(url); 
    const studentCoursesJson = await response.json(); 

    if (response.ok) {
        console.log(studentCoursesJson);
        return( studentCoursesJson.map((course)=>course));  // have to do parsing
    }
    else {
        console.log("studentCoursesJson Error"); 
        let err = {status: response.status, errObj: studentCoursesJson};
        throw err; 
    }

}

async function getSubject(subjectId){

    let url = "/api/subjects?id=" + subjectId; 
    const response = await fetch(url); 
    const studentCoursesJson = await response.json(); 

    if (response.ok) {
        console.log(studentCoursesJson);
        return( studentCoursesJson.map((course)=>course));  // have to do parsing
    }
    else {
        console.log("studentCoursesJson Error"); 
        let err = {status: response.status, errObj: studentCoursesJson};
        throw err; 
    }

}

async function getStudentBookings(studentId){

    let url = "/api/bookings?user_id=" + studentId; 
    console.log(url)
    const response = await fetch(url); 
    const studentBookingsJson = await response.json(); 
    let id = 1;
    if (response.ok) {
        console.log(studentBookingsJson);
        let array = studentBookingsJson.map( async (book) => {
            
            let startDate = new Date(book.lecture.date);

            let endDate = new Date(startDate);
            endDate.setHours( startDate.getHours() + book.lecture.duration )

            let subjectDescription = '';

            await getSubject(book.lecture.subject_id).then((subject) => {
                subjectDescription = subject[0].description;
            })
            
            return {
                location: book.lecture.subject_id,
                id: id++,
                title: subjectDescription,
                startDate: startDate,
                endDate: endDate,
                ownerId: book.user_id,
            }
        }); 

        return await Promise.all(array);

    }
    else {
        console.log("studentCoursesJson Error"); 
        let err = {status: response.status, errObj: studentBookingsJson};
        throw err; 
    }

}

async function getStudentCourseLectures (courseID){
    let url = "/api/lectures?subject_id=" + courseID; 
    console.log(courseID);
    const response = await fetch(url); 
    const studentCourseLecturesJson = await response.json(); 

    if (response.ok) {
        console.log(studentCourseLecturesJson);
        return(studentCourseLecturesJson.map((lecture)=>lecture));  
    }
    else {
        console.log("studentCoursesJson Error"); 
        let err = {status: response.status, errObj: studentCourseLecturesJson};
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


// If Giosuè send me only one object, this function can be deleted.
async function getExpectedWaitingTimes() {
    let url = ""; //todo: waiting for Giosue's Endpoints
    const response = await fetch(url);
    const requestExpectedWaitingTime = await response.json();

    if (response.ok) {
        return requestExpectedWaitingTime; // have to do parsing
    }

    else {
        console.log("getExpectedWaitingTime error");
        let err = { status: response.status, errObj: requestExpectedWaitingTime };
        throw err;
    }
}


// invio al server l'id del counter che si è appena liberato e è pronto
//per ricevere un nuovo cliente
async function setCounterFree(idCounter) {
    return new Promise((resolve, reject) => {
        fetch("", {                             // url da decidere
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idCounter),
        }).then((response) => {
            if (response.ok) {
                response.json().then((idCounter) => {
                    resolve(idCounter);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


// invio al server il tipo della richiesta che è stata prenotata da un cliente appena entrato
async function bookRequestType(ReqType) {
    let obj = {
        requestTypeId: ReqType
    };

    return new Promise((resolve, reject) => {
        fetch("/api/requestTypes/addNumberInQueue", {                             // url da decidere
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
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


const API = {/*getRequestTypes,*/ getStudentCourses,getStudentCourseLectures, userLogin,userLogout, getStudentBookings, getbookings, getExpectedWaitingTimes, setCounterFree, bookRequestType };
export default API;