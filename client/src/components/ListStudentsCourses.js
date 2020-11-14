import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Nav from 'react-bootstrap/Nav';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';

const ListStudentsCourses = (props) => {

  let { courses ,showLectures} = props;
  const test = courses.map((course) => {
    return {
      id: course.id,
      subjectID: course.subjectID,
      description: course.description,
      book:  <tr key={course.subjectID} onClick={() => showLectures(course)}> 
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link className="active" >Book your seat</Nav.Link>
        </Nav.Item>
      </Nav>              
    </tr>,
    }
  })

  const compareKey = (a, b) => {

      const keyA = a.key;
      const keyB = b.key;

      return keyA.localeCompare(keyB);

  };
  const [pageSizes] = useState([5, 10, 15, 0]);

  const [columns] = useState([
    { name: 'subjectID', title: 'Subject ID'},
    { name: 'description', title: 'Description'},
    {name: 'book', title: "Booking"}
  ]);
  const [integratedSortingColumnExtensions] = useState([
    { columnName: 'subjectID', compare: compareKey },
  ]);

  const [sortingStateColumnExtensions] = useState([
    { columnName: 'subjectID', sortingEnabled: true }
  ]);

  return (
    <>
    <h4><b>My teaching load</b></h4>
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

export default ListStudentsCourses;