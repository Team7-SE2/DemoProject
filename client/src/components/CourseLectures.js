import React, { useState } from 'react'
import moment from 'moment';
import Button from "react-bootstrap/Button";
import PaperInsideCard from './PaperInsideCard';
import { FaUsers, FaTrashAlt, FaTv } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import { red } from '@material-ui/core/colors';

const CourseLectures = (props) => {

    let { lectures, course, bookLecture, deleteBookedLecture, bookedLectures, role_id, getListStudents, deleteLecture, turnOnRemote } = props;

    function checkPrenotation(bookedLectures2, lectureID) {

        console.log(bookedLectures2);
        return bookedLectures2.find((bl) => bl.lecture_id === lectureID);

    }

    const compareDate = (a, b) => {

        console.log(a, b)
        const millisA = new Date(a).getTime();
        const millisB = new Date(b).getTime();

        return millisA - millisB;

    };

    const [integratedSortingColumnExtensions] = useState([
        { columnName: 'lectureDate', compare: compareDate }

    ]);



    const [columns] = useState(
        role_id === 4 ?
            [
                //{ name: 'id', title: 'ID'},
                { name: 'lectureDate', title: 'Lecture Date' },
                { name: 'View list of students', title: 'View list of students' },
                { name: 'Switch to remote', title: 'Switch to remote' },
                { name: 'Delete the lecture', title: 'Delete the lecture' }
            ]
            :
            [{ name: 'lectureDate', title: 'Lecture Date' },
            { name: 'book', title: ' ' }]
    );

    const [sortingStateColumnExtensions] = useState([
        { columnName: 'Delete the lecture', sortingEnabled: false },
        { columnName: 'Switch to remote', sortingEnabled: false },
        { columnName: 'View list of students', sortingEnabled: false }
    ]);

    const test = lectures.map((lecture) => {
        console.log("lecture deleted at" + lecture.deleted_at)


        if (role_id == 4) {
            return {
                id: lecture.id,
                lectureDate: lecture.deleted_at == null ? 
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}> 
                {moment(new Date(lecture.date)).format("LLL")}
                </div> 
                :
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "line-through red"
                }}> 
                {moment(new Date(lecture.date)).format("LLL")}
                </div>
                ,
                'View list of students': <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {lecture.deleted_at == null ? <Button onClick={() => getListStudents(lecture)} ><FaUsers size={20} > </FaUsers></Button> : <Button disabled><FaUsers size={20} > </FaUsers></Button>}
                </div>,
                'Switch to remote':
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                           {lecture.deleted_at == null && moment(lecture.date).isAfter(moment().add(30,'minutes')) ? <Button disabled = {lecture.remote} onClick={() => {turnOnRemote(lecture)}}> <FaTv size ={20}></FaTv></Button> :  <Button disabled> <FaTv  size ={20}></FaTv></Button>}
                    </div>,
                'Delete the lecture': <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {lecture.deleted_at == null ? <Button variant="danger" onClick={() => { deleteLecture(lecture) }}><FaTrashAlt size={20} ></FaTrashAlt></Button> : <Button disabled variant="danger"><FaTrashAlt size={20} ></FaTrashAlt></Button>}
                </div>
            }
        }

        if (role_id == 5) {
            return {
                id: lecture.id,
                lectureDate: moment(new Date(lecture.date)).format("LLL"),
                book: <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {lecture.deleted_at == null ? checkPrenotation(bookedLectures, lecture.id) ? <Button variant="danger" onClick={() => deleteBookedLecture(lecture.id)}> UNBOOK </Button> : <Button variant="success" onClick={() => bookLecture(lecture.id)}> BOOK </Button>:<h5 style={{color: "red", fontWeight: "bold"}}>Canceled</h5>}
                </div>,
            }
        }
    })


    return (
        <>
            <PaperInsideCard
                CardHeader={course.description + " lectures"}
                columns={columns}
                sortingStateColumnExtensions={sortingStateColumnExtensions}
                integratedSortingColumnExtensions={integratedSortingColumnExtensions}
                test={test}


            ></PaperInsideCard>
        </>
    );
}

export default CourseLectures;