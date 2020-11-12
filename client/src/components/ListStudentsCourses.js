import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
const ListStudentsCourses = (props) => {

  let { courses ,showLectures} = props;

  return <>
    <AuthContext.Consumer>
      {(context) => (
        context.authUser ? <>


          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {
                courses.map(course => <CourseTableRow
                  key={course.id}
                  course={course}
                  showLectures = {showLectures} />)

              }
            </tbody>
          </Table>


       
        </>
          : <Redirect to="./login" />
      )}
    </AuthContext.Consumer>
  </>



}


function CourseTableRow(props) {
let {course, showLectures} = props; 
return <tr onClick={() => showLectures(course)}> 
<Nav className="mr-auto">
<Nav.Link  to="/abc" as={NavLink} >
<td>{course.subjectID}</td>
</Nav.Link> 
</Nav>
<td>{course.description}</td>
  
</tr>
}


export default ListStudentsCourses;
