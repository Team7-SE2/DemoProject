import React from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import moment from 'moment';
import Button from "react-bootstrap/Button";
const StudentCourseLectures = (props) => {
    
    let { lectures,course } = props;
    console.log(lectures);
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
    let {lecture} = props; 

    return <tr>
<td>{moment(new Date(lecture.date)).format("LLL")}</td>
<td><Button  variant="success"> BOOK </Button></td>

    </tr>
}

export default StudentCourseLectures;