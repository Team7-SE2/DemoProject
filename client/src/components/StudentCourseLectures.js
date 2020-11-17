import React, { useState, useCallback } from 'react'
import moment from 'moment';
import Button from "react-bootstrap/Button";
import Paper from '@material-ui/core/Paper';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import Card from "react-bootstrap/Card"

const StudentCourseLectures = (props) => {
  
    let { lectures, course, bookLecture, deleteBookedLecture,bookedLectures  } = props;
  
    function checkPrenotation (bookedLectures, lectureID){

        console.log(bookedLectures);
        return bookedLectures.find((bl) => bl.lecture_id==lectureID); 

    }
    const test = lectures.map((lecture) => {
        return {
        id: lecture.id,
        lectureDate: moment(new Date(lecture.date)).format("LLL"),
        ' ':   <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        {checkPrenotation(bookedLectures, lecture.id) ? <Button variant="danger" onClick={() => deleteBookedLecture(lecture.id)}> UNBOOK </Button>: <Button variant="success" onClick={() => bookLecture(lecture.id)}> BOOK </Button>}
                    </div>
        }
    })

    const compareDate = (a, b) => {

        console.log(a,b)
        const millisA = new Date(a).getTime();
        const millisB = new Date(b).getTime();
  
        return millisA - millisB;
  
    };
    
    const [integratedSortingColumnExtensions] = useState([
        { columnName: 'lectureDate', compare: compareDate },
    ]);

    const [pageSizes] = useState([5, 10, 15, 0]);

    const [columns] = useState([
        //{ name: 'id', title: 'ID'},
        { name: 'lectureDate',title: 'Lecture Date'},
        { name: ' '}
    ]);
    
    const [sortingStateColumnExtensions] = useState([
        { columnName: ' ', sortingEnabled: false },
    ]);

    return (
        <>
        <Card className="CardClass">
            <Card.Header className="text-center">
                <h4><b>{course.description} - lectures</b></h4>
            </Card.Header>
            <Card.Body>
                <Paper>
                    <Grid
                        rows={test}
                        columns={columns}
                    >
                        <PagingState
                        defaultCurrentPage={0}
                        pageSize={10}
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
            </Card.Body>
        </Card>
        </>
    );
}

export default StudentCourseLectures;