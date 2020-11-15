import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Nav from 'react-bootstrap/Nav';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';

const ListTeachersCourses = (props) => {

  let { courses ,showStudentsLectures} = props;
  const test = courses.map((course) => {
    return {
      id: course.id,
      subjectID: course.subjectID,
      description: course.description,
    }
  })

  /*const compareKey = (a, b) => {

      const keyA = a.key;
      const keyB = b.key;

      return keyA.localeCompare(keyB);

  };*/
  const [pageSizes] = useState([5, 10, 15, 0]);

  const [columns] = useState([
    { name: 'subjectID', title: 'Subject ID'},
    { name: 'description', title: 'Description'}
  ]);
  const [integratedSortingColumnExtensions] = useState([
    //{ columnName: 'subjectID', compare: compareKey },
  ]);

  const [sortingStateColumnExtensions] = useState([
    //{ columnName: 'book', sortingEnabled: false }
  ]);

  return (
    <>
    
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

export default ListTeachersCourses;