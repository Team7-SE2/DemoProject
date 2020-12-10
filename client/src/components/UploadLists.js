import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
class UploadLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file_selected: "", submitted: false, errorS: false, errorC: false, errorT: false, errorL: false, errorCl: false,
            fileS: null, fileC: null, fileT: null, fileL: null, fileCl: null
        };
    }

    closeError = (error) => {
        switch (error) {
            case 1: this.setState({ errorS: false }); break;
            case 2: this.setState({ errorC: false }); break;
            case 3: this.setState({ errorT: false }); break;
            case 4: this.setState({ errorL: false }); break;
            case 5: this.setState({ errorCl: false }); break;
        }
    }



    updateFields = (name, value, error, f) => {

        let file = value.split(".");
        let ext = file[file.length - 1];
        const formData = new FormData();
        if (ext != "csv") {
            switch (error) {
                case 1:
                    
                    Object.defineProperty(f, 'name', {
                        writable: true,
                        value: "Students.csv"
                      });
                    this.setState({ errorS: true, fileS: f });
                    break;
                case 2:
                    Object.defineProperty(f, 'name', {
                        writable: true,
                        value: "Courses.csv"
                      });
                    this.setState({ errorC: true, fileC: f });
                    break;
                case 3:
                    Object.defineProperty(f, 'name', {
                        writable: true,
                        value: "Professors.csv"
                      });
                    this.setState({ errorT: true, fileT: f });
                    break;
                case 4:
                    Object.defineProperty(f, 'name', {
                        writable: true,
                        value: "Schedule1s.csv"
                      });
                    this.setState({ errorL: true, fileL: f });
                    break;
                case 5:
                    Object.defineProperty(f, 'name', {
                        writable: true,
                        value: "Enrollment.csv"
                      });
                    this.setState({ errorCl: true, fileCl: f });                    
                    break;
            }

        }
        else {
            switch (error) {
                case 1: this.setState({ errorS: false }); break;
                case 2: this.setState({ errorC: false }); break;
                case 3: this.setState({ errorT: false }); break;
                case 4: this.setState({ errorL: false }); break;
                case 5: this.setState({ errorCl: false }); break;
            }
        }
    }

    handleSubmit = (file) => {

        switch (file) {

            case 1:
                this.props.uploadFile(this.state.fileS);

                break;

            case 2:
                this.props.uploadFile(this.state.fileC);
                break;

            case 3:
                this.props.uploadFile(this.state.fileT);
                break;

            case 4:
                this.props.uploadFile(this.state.fileL);
                break;

            case 5:
                this.props.uploadFile(this.state.fileCl);
                break;

        }
    }


    render() {
        return <>
            <br /> <br /> <br />

            <Row>
                <Col sm={3} />
                <Col sm={6}>
                    <UploadStudentsList handleSubmit={this.handleSubmit} updateFields={this.updateFields} error={this.state.errorS} closeError={this.closeError} />
                </Col>
            </Row>
            <br />

            <Row>
                <Col sm={3} />
                <Col sm={6}>
                    <UploadCoursesList handleSubmit={this.handleSubmit} updateFields={this.updateFields} error={this.state.errorC} closeError={this.closeError} />
                </Col>
            </Row>
            <br />

            <Row>
                <Col sm={3} />
                <Col sm={6}>
                    <UploadTeachersList handleSubmit={this.handleSubmit} updateFields={this.updateFields} error={this.state.errorT} closeError={this.closeError} />
                </Col>
            </Row>
            <br />

            <Row>
                <Col sm={3} />
                <Col sm={6}>
                    <UploadLecturesList handleSubmit={this.handleSubmit} updateFields={this.updateFields} error={this.state.errorL} closeError={this.closeError} />
                </Col>
            </Row>

            <br />
            <Row>
                <Col sm={3} />
                <Col sm={6}>
                    <UploadClassesList handleSubmit={this.handleSubmit} updateFields={this.updateFields} error={this.state.errorCl} closeError={this.closeError} />
                </Col>
            </Row>
        </>
    }
}



function UploadStudentsList(props) {
    let { handleSubmit, updateFields, error, closeError } = props;
    return <>

        <Card>
            <Card.Header><b>Upload student list</b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={1} />}
                <Form>
                    <Form.Group>
                        <Form.File id="StudentList" label="Input file" onChange={(ev) => updateFields("courseList", ev.target.value, 1, ev.target.files[0])} />
                        <br />
                        <Button disabled={error} onClick={() => handleSubmit(1)}> Send File </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
}

function UploadCoursesList(props) {
    let { handleSubmit, updateFields, error, closeError } = props;
    return <>
        <Card>
            <Card.Header> <b>Upload courses list </b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={2} />}
                <Form>
                    <Form.Group>
                        <Form.File id="CourseList" label="Input file" onChange={(ev) => updateFields("courseList", ev.target.value, 2, ev.target.files[0])} />
                        <br />
                        <Button onClick={() => handleSubmit(2)}> Send File </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
}

function UploadTeachersList(props) {

    let { handleSubmit, updateFields, error, closeError } = props;
    return <>
        <Card>
            <Card.Header><b>Upload teachers list</b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={3} />}
                <Form>
                    <Form.Group>
                        <Form.File id="TheachersList" label="Input file" onChange={(ev) => updateFields("teachersList", ev.target.value, 3,ev.target.files[0])} />
                        <br />
                        <Button onClick={() => handleSubmit(3)} > Send File </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
}

function UploadLecturesList(props) {

    let { handleSubmit, updateFields, error, closeError } = props;
    return <>
        <Card>
            <Card.Header><b>Upload lectures list </b> </Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={4} />}
                <Form>
                    <Form.Group>
                        <Form.File id="LecturesList" label="Input file" onChange={(ev) => updateFields("lecturesList", ev.target.value, 4,ev.target.files[0])} />
                        <Button onClick={() => handleSubmit(4)} > Send File </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
}

function UploadClassesList(props) {
    let { handleSubmit, updateFields, error, closeError } = props;
    return <>
        <Card>
            <Card.Header><b>Upload classes list </b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={5} />}
                <Form>
                    <Form.Group>
                        <Form.File id="ClassesList" label="Input file" onChange={(ev) => updateFields("classesList", ev.target.value, 5, ev.target.files[0])} />
                        <br />
                        <Button  onClick={() => handleSubmit(5)} > Send File </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
}


function ExError(props) {
    let { updateFields, error, closeError } = props;
    const [show, setShow] = useState(true);
    const handleClose = () => { setShow(false); closeError(error); }
    if (show) {
        return (
            <Alert variant="danger" onClose={() => handleClose()} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Sorry, insert only csv files.
          </p>
            </Alert>
        );
    }

}

export default UploadLists;