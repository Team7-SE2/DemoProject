import React, { useState } from 'react'
import moment from'moment';
import PaperInsideCard from "./PaperInsideCard"
import {FaArrowCircleLeft} from 'react-icons/fa';
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentList = (props) => {

  let {students, course, lecture, switchRoute} = props;


  const test = students.map((student) => {
    return {
      id: student.user.id,
      name: student.user.name,
      surname: student.user.surname
    }
  });

  
  const [columns] = useState([
    { name: 'id', title: 'ID'},
    { name: 'name', title: 'Name'},
    {name: 'surname', title: 'Surname'}
  ]);
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
              <Button variant="dark" onClick={() => {switchRoute("/teacher/courses/"+course.subjectID+"/lectures")}}><FaArrowCircleLeft style={{'marginBottom': '20%'}} /> </Button>
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