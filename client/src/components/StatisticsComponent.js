import React from 'react';
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaUsers } from 'react-icons/fa';


const StatisticsComponent = (props) => {
    let { statistics } = props;
    return <>
        <Col sm={1} />
        <Col sm={3}>
            <Card>
                <Card.Title>
                    <b>Average students for each lesson</b>
                </Card.Title>
                <Card.Body>
                    <Row>
                        <Col sm={4} />
                        <Col sm={6}>
                            {statistics && statistics.studentsCounts / statistics.nummberOfLessonPresence}
                        </Col>

                        <Col sm={2}>
                            <FaUsers></FaUsers>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>


        <Col sm={2}>
            <Card>
                <Card.Header>
                    Number of students booked
            </Card.Header>
                <Card.Body>
                    <Row>
                        <Col sm={4} />
                        <Col sm={6}>
                            {statistics && statistics.studentsCounts}
                        </Col>
                        <Col sm={2}>

                        </Col>
 </Row>
            </Card.Body>
            </Card>
        </Col>

            <Col sm={3}>
                <Card>
                    <Card.Header>
                        Number of lessons
            </Card.Header>
                    <Card.Body>
                        {statistics && "Number of lessons: "+statistics.numberOfLessons} <br></br>
                        {statistics && "Number of lessons cancelled: "+statistics.numberOfLessonsCancelled}
                        
            </Card.Body>
                </Card>
            </Col>

            <Col sm={2}>
                <Card>
                    <Card.Header>
                        Statistica 1
            </Card.Header>
                    <Card.Body>
                        Alcune statistiche
            </Card.Body>
                </Card>
            </Col>
            <br></br>
    </>

}

export default StatisticsComponent;
