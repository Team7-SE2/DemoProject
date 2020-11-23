import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';

const ListCourses = (props) => {

  let { courses ,showLectures, role_id} = props;
  
  const test = courses.map((course) => {
    return {
      id: course.id,
      subjectID: course.subjectID,
      description: course.description,
      ' ':  <div key={course.subjectID} onClick={() => showLectures(course)} style = {{textAlign : "center"}}> 
      
      {role_id===5 && <Button variant="primary">Book your seat</Button>}
      {role_id===4 && <Button variant="primary">View details</Button>}

    </div>,
    }
  })

  const [pageSizes] = useState([5, 10, 15, 0]);

  const [columns] = useState([
    { name: 'subjectID', title: 'Subject ID'},
    { name: 'description', title: 'Description'},
    {name: ' ', title: " "}
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

export default ListCourses;