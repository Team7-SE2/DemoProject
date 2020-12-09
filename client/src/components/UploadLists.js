import React, {useState} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
class UploadLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = { file_selected: "", submitted: false, error: false };
    }

    closeError = () => {
        this.setState({error: false});
    }

    updateFields = (name, value) => {
        let file = value.split(".");
        let ext = file[file.length - 1];
        if (ext != "csv")
            this.setState({error: true})
        else
            this.setState({error:false, [name]: value });
    }

    render() {
        return <>
            <br /> <br /> <br />
            <Form>
                <Row>
                    <Col sm={3} />
                    <Col sm={6}>
                        <UploadStudentsList updateFields={this.updateFields} error = {this.state.error} closeError = {this.closeError} />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={3} />
                    <Col sm={6}>
                        <UploadCoursesList updateFields={this.updateFields} />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={3} />
                    <Col sm={6}>
                        <UploadTeachersList updateFields={this.updateFields} />
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col sm={3} />
                    <Col sm={6}>
                        <UploadLecturesList updateFields={this.updateFields} />
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col sm={3} />
                    <Col sm={6}>
                        <UploadClassesList updateFields={this.updateFields} />
                    </Col>
                </Row>
            </Form>
        </>
    }
}


function UploadStudentsList(props) {
    let { updateFields,error, closeError } = props;
    return <>

        <Card>
            <Card.Header><b>Upload student list</b></Card.Header>
            <Card.Body>
                {error&& <ExError closeError ={closeError} />}
                <Form>
                    <Form.Group>
                        <Form.File  custom id="CourseList" label="Input file" onChange={(ev) => updateFields("courseList", ev.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>

        </Card>

    </>
}


function UploadCoursesList(props) {
    let { updateFields } = props;
    return <>

        <Card>
            <Card.Header> <b>Upload courses list </b></Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.File id="CourseList" label="Input file" onChange={(ev) => updateFields("courseList", ev.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>

        </Card>

    </>
}

function UploadTeachersList(props) {

    let { updateFields } = props;
    return <>

        <Card>
            <Card.Header><b>Upload teachers list</b></Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.File id="TheachersList" label="Input file" onChange={(ev) => updateFields("teachersList", ev.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>

        </Card>

    </>
}

function UploadLecturesList(props) {

    let { updateFields } = props;
    return <>

        <Card>
            <Card.Header><b>Upload lectures list </b> </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.File id="LecturesList" label="Input file" onChange={(ev) => updateFields("lecturesList", ev.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>

        </Card>

    </>
}

function UploadClassesList(props) {
    let { updateFields } = props;
    return <>

        <Card>
            <Card.Header><b>Upload classes list </b></Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.File id="ClassesList" label="Input file" onChange={(ev) => updateFields("classesList", ev.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>

        </Card>

    </>
}


function ExError(props) {
    let {closeError} = props;
    const [show, setShow] = useState(true);
    const handleClose = () => { setShow(false); closeError();}
    if(show) {
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