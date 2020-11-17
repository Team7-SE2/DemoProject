import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import moment from'moment';
import Card from "react-bootstrap/Card"
import PaperInsideCard from "./PaperInsideCard"
const StudentList = (props) => {

  let { role_id,students, course, lecture} = props;


  const test = students.map((student) => {
    return {
      id: student.user.userID,
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
        CardHeader = {course.description +" - Lecture Date: "+ moment(lecture.date).format("DD-MM-YYYY hh:mm").toString()}
        columns = {columns}
        sortingStateColumnExtensions = {sortingStateColumnExtensions}
        integratedSortingColumnExtensions = {integratedSortingColumnExtensions}
        test = {test}
       
        
        ></PaperInsideCard>
    </>
  );
}

export default StudentList;