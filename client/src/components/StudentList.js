import React, { useState } from 'react'
import moment from'moment';
import PaperInsideCard from "./PaperInsideCard"
import {FaArrowCircleLeft} from 'react-icons/fa';
import { ImCross, ImCheckmark } from "react-icons/im";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentList = (props) => {

  let {students, course, lecture, switchRoute, recordPresence} = props;


  const test = students.map((student) => {
    if(!recordPresence)
      return {
        id: student.user.id,
        name: student.user.name,
        surname: student.user.surname
      }
      else
      return {
        id: student.user.id,
        name: student.user.name,
        surname: student.user.surname,
        presence: <Button variant="danger"> <ImCross></ImCross> </Button>
      }

  });

  
  const [columns] = useState(
    !recordPresence ?
    [
    { name: 'id', title: 'ID'},
    { name: 'name', title: 'Name'},
    {name: 'surname', title: 'Surname'}
    ] 
    :
    [
      { name: 'id', title: 'ID'},
      { name: 'name', title: 'Name'},
      {name: 'surname', title: 'Surname'},
      {name: 'presence', title: 'Present?'}
      ] 

  );
  const [integratedSortingColumnExtensions] = useState([
    //{ columnName: 'subjectID', compare: compareKey },
  ]);

  const [sortingStateColumnExtensions] = useState([
    //{ columnName: 'book', sortingEnabled: false }
  ]);

  return (
    <>
     <PaperInsideCard
        CardHeader = {
          <Row>
            <Col sm={1}>
              <Button variant="dark" onClick={() => {switchRoute(recordPresence ? "/teacher/courses/"+course.subjectID+"/PastLectures": "/teacher/courses/"+course.subjectID+"/lectures")}}><FaArrowCircleLeft style={{'marginBottom': '20%'}} /> </Button>
            </Col>
            <Col sm={11}>
              <>{course.description} <br></br>Lecture Date:  {moment(lecture.date).format("DD-MM-YYYY hh:mm").toString()}</>
            </Col>
          </Row>
        }
        columns = {columns}
        sortingStateColumnExtensions = {sortingStateColumnExtensions}
        integratedSortingColumnExtensions = {integratedSortingColumnExtensions}
        test = {test}
        ></PaperInsideCard>
    </>
  );
}

export default StudentList;