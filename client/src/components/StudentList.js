import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Nav from 'react-bootstrap/Nav';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import moment from'moment';
import API from '../api/api';
const StudentList = (props) => {

 


  let { students,lecture,getStudentList} = props;


  const test = students.map((student) => {
    return {
      id: student.user.userID,
      name: student.user.name,
      surname: student.user.surname
    }
  });

  

  /*const compareKey = (a, b) => {

      const keyA = a.key;
      const keyB = b.key;

      return keyA.localeCompare(keyB);

  };*/
  const [pageSizes] = useState([5, 10, 15, 0]);

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
    <h6><b>Date: {moment(lecture.date).format("DD-MM-YYYY hh:mm").toString()}</b></h6>
        <br></br>
    <Paper>
      <Grid
        rows={test}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          //pageSize={10}
        />
        <SortingState
            columnExtensions={sortingStateColumnExtensions}
        />
        <IntegratedSorting
          columnExtensions={integratedSortingColumnExtensions}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes}/>
      </Grid>
    </Paper>
    </>
  );
}

export default StudentList;