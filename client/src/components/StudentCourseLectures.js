import React from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import moment from 'moment';
import Button from "react-bootstrap/Button";
const StudentCourseLectures = (props) => {

    let { lectures, course, bookLecture, deleteBookedLecture,bookedLectures } = props;

    return <>

        <AuthContext.Consumer>
            {(context) => (
                context.authUser ? <>

                    <h3> {course.description}</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> Lecture Date </th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lectures.map(lecture => <LecturesTableRow
                                    key={lecture.id}
                                    lecture={lecture}
                                    bookLecture={bookLecture}
                                    bookedLectures = {bookedLectures}
                                    deleteBookedLecture = {deleteBookedLecture}
                                />)

                            }
                        </tbody>
                    </Table>

                </> : <Redirect to="./login" />
            )}
        </AuthContext.Consumer>
    </>

}


function LecturesTableRow(props) {
    let { lecture, bookLecture, bookedLectures,deleteBookedLecture } = props;

    return <tr>
        <td>{moment(new Date(lecture.date)).format("LLL")}</td>
        {checkPrenotation(bookedLectures, lecture.id) ? 
        <td><Button variant="danger" onClick={() => deleteBookedLecture(lecture.id)}> UNBOOK </Button></td>
       : <td><Button variant="success" onClick={() => bookLecture(lecture.id)}> BOOK </Button></td>
        
}
    </tr>
}

function checkPrenotation (bookedLectures, lectureID){


    console.log(bookedLectures);
    return bookedLectures.find((bl) => bl.lecture_id==lectureID); 

}

export default StudentCourseLectures;