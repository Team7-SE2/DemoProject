import React, { useState} from 'react'
import moment from 'moment';
import Button from "react-bootstrap/Button";
import Paper from '@material-ui/core/Paper';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import Card from "react-bootstrap/Card"
import PaperInsideCard from './PaperInsideCard';

const CourseLectures = (props) => {
  
    let { lectures, course, bookLecture, deleteBookedLecture,bookedLectures, role_id, getListStudents  } = props;
  
    function checkPrenotation (bookedLectures2, lectureID){

        console.log(bookedLectures2);
        return bookedLectures2.find((bl) => bl.lecture_id===lectureID); 

    }

    const compareDate = (a, b) => {

        console.log(a,b)
        const millisA = new Date(a).getTime();
        const millisB = new Date(b).getTime();
    
        return millisA - millisB;
    
    };
    
    const [integratedSortingColumnExtensions] = useState([
        { columnName: 'lectureDate', compare: compareDate },
    ]);
    
    
    const [columns] = useState([
        //{ name: 'id', title: 'ID'},
        { name: 'lectureDate',title: 'Lecture Date'},
        { name: ' '}
    ]);
    
    const [sortingStateColumnExtensions] = useState([
        { columnName: ' ', sortingEnabled: false },
    ]);

    const test = lectures.map((lecture) => {
        
        return {
        id: lecture.id,
        lectureDate: moment(new Date(lecture.date)).format("LLL"),
        ' ':   <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        {role_id===5 && <>{checkPrenotation(bookedLectures, lecture.id) ? <Button variant="danger" onClick={() => deleteBookedLecture(lecture.id)}> UNBOOK </Button>: <Button variant="success" onClick={() => bookLecture(lecture.id)}> BOOK </Button>}</>}
                        {role_id===4 && <Button color="primary" onClick={() => getListStudents(lecture)}> View list of students </Button>}
                    </div>
        }
    })


    return (
        <>
        <PaperInsideCard
        CardHeader = {course.description + " lectures"}
        columns = {columns}
        sortingStateColumnExtensions = {sortingStateColumnExtensions}
        integratedSortingColumnExtensions = {integratedSortingColumnExtensions}
        test = {test}
        
        
        ></PaperInsideCard>
        </>
    );
}

export default CourseLectures;