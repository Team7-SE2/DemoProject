import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Button from "react-bootstrap/Button";
import { SortingState, PagingState, SearchState, FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, Toolbar, SearchPanel } from '@devexpress/dx-react-grid-material-ui';

const SupportOfficerListCourses = (props) => {

  let { courses ,showLectures, showLecturesSchedule, role_id} = props;
  
  const test = courses.map((course) => {
    return {
      id: course.id,
      subjectID: course.subjectID,
      description: course.description,
      teacherID: course.teacher_id,
      //teacher: course.teacher,
      year: course.year,
      semester: course.semester,
      lecturesList: <div key={course.subjectID} onClick={() => showLectures(course)} style = {{textAlign : "center"}}> 
      
        <Button variant="primary">View lectures</Button>

      </div>,
      lecturesSchedule: <div key={course.subjectID} onClick={() => showLecturesSchedule(course)} style = {{textAlign : "center"}}> 
      
        <Button variant="primary">Schedule lectures</Button>

      </div>
    }
  })

  const [pageSizes] = useState([5, 10, 15, 0]);

  const [columns] = useState([
    { name: 'subjectID', title: 'Subject ID'},
    { name: 'description', title: 'Description'},
    { name: 'teacherID', title: 'Teacher ID'},
    //{ name: 'teacher', title: 'teacher'},
    { name: 'year', title: 'year'},
    { name: 'semester', title: 'semester'},
    { name: 'lecturesList', title: "Lectures List"},
    { name: 'lecturesSchedule', title: "Lectures Schedule"}
  ]);
  const [integratedSortingColumnExtensions] = useState([
    //{ columnName: 'subjectID', compare: compareKey },
  ]);

  const [sortingStateColumnExtensions] = useState([
    { columnName: 'lecturesList', sortingEnabled: false },
    { columnName: 'lecturesSchedule', sortingEnabled: false },
  ]);

  const [filteringStateColumnExtensions] = useState([
    { columnName: 'lecturesList', filteringEnabled: false },
    { columnName: 'lecturesSchedule', filteringEnabled: false },
  ]);

  return (
    <>
    
    <Paper>
      <Grid
        rows={test}
        columns={columns}
      >
        <SearchState/>
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
          //pageSize={10}
        />
        <SortingState
            columnExtensions={sortingStateColumnExtensions}
        />
        <IntegratedSorting
          columnExtensions={integratedSortingColumnExtensions}
        />
        <FilteringState 
          defaultFilters={[]}
          columnExtensions={filteringStateColumnExtensions}
        />
        <IntegratedFiltering />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <PagingPanel pageSizes={pageSizes}/>
      </Grid>
    </Paper>
    </>
  );
}

export default SupportOfficerListCourses;