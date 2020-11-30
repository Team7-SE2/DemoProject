import React from 'react';
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaChalkboardTeacher, FaUser, FaUsers, FaBook } from 'react-icons/fa';


const StatisticsComponent = (props) => {
    let { statistics } = props;
    let studentAVG;
    if(statistics){

        studentAVG = Number(parseFloat( statistics.studentsBookings / (statistics.numberOfLessons - statistics.numberOfLessonsCancelled)).toFixed(2));
        studentAVG = Number.isNaN(studentAVG) ? '' : studentAVG

    }
    return <>
        <Col sm={1} />
        <Col sm={3}>
            <Card className="statisticCard">
                <Card.Body>
                    <Row>
                            <Col sm={4}>

                                <h6 className="titleStatisticsCard" >REMOTE LESSONS</h6>
                                <b><h3 className="contentStaticsCard" >{statistics && statistics.numberOfLessonsRemote}</h3></b>
                                
                            </Col>
                            <Col sm={4}>
                                
                                <h6 className="titleStatisticsCard" >PRESENCE LESSONS</h6>
                                <b><h3 className="contentStaticsCard" >{statistics && statistics.numberOfLessonPresence}</h3></b>
                            </Col>

                        <Col sm={4}>
                            <h6></h6>
                            <div className="statIcon1"><FaChalkboardTeacher style={{
                                    
                                    "minHeight": "30px",
                                    "maxWidth": "30px",
                                    "height": "30px",
                                    "width": "30px"
                                }}></FaChalkboardTeacher></div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>

            <Col sm={3}>
                <Card className="statisticCard">
                    <Card.Body>
                        <Row>
                            <Col sm={4}>

                                <h6 className="titleStatisticsCard" >LESSONS COUNT</h6>
                                <b><h3 className="contentStaticsCard" >{statistics && statistics.numberOfLessons}</h3></b>
                                
                            </Col>
                            <Col sm={4}>
                                
                                <h6 className="titleStatisticsCard" >LESSONS DELETED</h6>
                                <b><h3 className="contentStaticsCard" >{statistics && statistics.numberOfLessonsCancelled}</h3></b>
                            </Col>

                            <Col sm={4}>
                                <h6></h6>
                                <div className="statIcon3"><FaBook style={{
                                    
                                    "minHeight": "30px",
                                    "maxWidth": "30px",
                                    "height": "30px",
                                    "width": "30px"
                                }}></FaBook></div>
                                
                                
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm={4}>
                <Card className="statisticCard">
                    <Card.Body>
                        <Row>
                            <Col sm={4}>

                                <h6 className="titleStatisticsCard" >STUDENT BOOKINGS</h6>
                                <b><h3 className="contentStaticsCard" >{statistics && statistics.studentsBookings}</h3></b>
                                
                            </Col>
                            <Col sm={5}>

                                <h6 className="titleStatisticsCard" >STUDENTS PER LECTURE</h6>
                                <b><h3 className="contentStaticsCard" >{statistics && studentAVG}</h3></b>
                                
                            </Col>


                            <Col sm={3}>
                                <h6></h6>
                                <div className="statIcon4"><FaUsers style={{
                                        
                                        "minHeight": "30px",
                                        "maxWidth": "30px",
                                        "height": "30px",
                                        "width": "30px"
                                    }}></FaUsers></div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <br></br>
    </>

}

export default StatisticsComponent;
