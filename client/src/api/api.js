
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


const API = {/*getRequestTypes,*/ getbookings, getExpectedWaitingTimes, setCounterFree, bookRequestType };
export default API;