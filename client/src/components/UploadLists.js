import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import API from '../api/api.js';
import Modal from "react-bootstrap/Modal"

class UploadLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file_selected: "", submitted: false, errorS: false, errorC: false, errorT: false, errorL: false, errorCl: false,
            fileS: null, fileC: null, fileT: null, fileL: null, fileCl: null,
            upload_ok: false
        };
    }
    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

    closeError = (error) => {
        switch (error) {
            case 1: this.setState({ errorS: false }); break;
            case 2: this.setState({ errorC: false }); break;
            case 3: this.setState({ errorT: false }); break;
            case 4: this.setState({ errorL: false }); break;
            case 5: this.setState({ errorCl: false }); break;
        }
    }

    uploadFile = (file, type) => {
        console.log(file, type);
          API.uploadFile(file, type)
          .then ( ()=> {
            console.log(file);
              console.log("Upload avvenuto con successo");
              this.setState({upload_ok: true})
            
          })
          .catch(()=>{
            console.log(file);
            this.showModal();
            console.log("Errore nell'upload del file");
          })
         
      }



    updateFields = (name, value, error, f) => {

        let file = value.split(".");
        let ext = file[file.length - 1];
        //const formData = new FormData();
        if (ext != "csv") {
            switch (error) {
                case 1:
                    this.setState({ errorS: true });
                    break;
                case 2:
                    this.setState({ errorC: true });
                    break;
                case 3:
                    this.setState({ errorT: true });
                    break;
                case 4:
                    this.setState({ errorL: true });
                    break;
                case 5:
                    this.setState({ errorCl: true });
                    break;
            }

        }
        else {
            switch (error) {
                case 1:
                    {
                    this.setState({ errorS: false, fileS: f }, () =>{
                        // if (this.state.fileS.name !== "Students.csv")
                        //         this.setState({ errorS: true });
                        //     else {
                                Object.defineProperty(f, 'name', {
                                writable: true,
                                value: "Students.csv"
                                });
                            //}     
                    });
                    break;
                    }
                case 2:
                    {
                        this.setState({ errorC: false, fileC: f }, () =>{
                            // if (this.state.fileC.name !== "Courses.csv")
                            //         this.setState({ errorC: true });
                            //     else {
                                    Object.defineProperty(f, 'name', {
                                    writable: true,
                                    value: "Courses.csv"
                                    });
                                //}     
                        });
                        break;
                    }
                case 3:
                    {
                        this.setState({ errorT: false, fileT: f }, () =>{
                            // if (this.state.fileT.name !== "Professors.csv")
                            //         this.setState({ errorT: true });
                            //     else {
                                    Object.defineProperty(f, 'name', {
                                    writable: true,
                                    value: "Professors.csv"
                                    });
                                //}     
                        });
                        break;
                    }

                case 4:
                    {
                        this.setState({ errorL: false, fileL: f }, () =>{
                            // if (this.state.fileL.name !== "Schedule1s.csv")
                            //         this.setState({ errorL: true });
                            //     else {
                                    Object.defineProperty(f, 'name', {
                                    writable: true,
                                    value: "Schedule1s.csv"
                                    });
                                //}     
                        });
                        break;
                    }

                case 5:
                    {
                        this.setState({ errorCl: false, fileCl: f }, () =>{
                            // if (this.state.fileCl.name !== "Enrollment.csv")
                            //         this.setState({ errorCl: true });
                            //     else {
                                    Object.defineProperty(f, 'name', {
                                    writable: true,
                                    value: "Enrollment.csv"
                                    });
                                //}     
                        });
                        break;
                    }
            }
        }
    }

    handleSubmit = (file) => {

        switch (file) {

            case 1:
                this.uploadFile(this.state.fileS, 'Students')
                break;

            case 2:
                this.uploadFile(this.state.fileC, 'Courses');
                break;

            case 3:
                this.uploadFile(this.state.fileT, 'Professors');
                break;

            case 4:
                this.uploadFile(this.state.fileL, 'Schedule1s');
                break;

            case 5:
                this.uploadFile(this.state.fileCl, 'Enrollment');
                break;

        }
    }


    render() {
        return <> {this.state.upload_ok &&
                        <Modal
                        className="my-modal"
                    show={this.state.upload_ok}
                    onHide={() => this.setState({upload_ok: false})}
                    backdrop="static" keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                    <Modal.Title >
                        Great!
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>
                        Your csv file has been correctly uploaded!
                    </p>
                    </Modal.Body>
                </Modal>
    }
            <Modal show={this.state.show} handleClose={this.hideModal} backdrop="static" keyboard={false}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header >
                    <Modal.Title>Pay attention! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <> <h4> Format of CSV file sent is not correct! </h4></>
                </Modal.Body>
                <Modal.Footer>
                       <> 
                       <Button variant="primary" onClick={() => {this.hideModal();}} > OK </Button>
                       </>

                </Modal.Footer>
            </Modal>
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
                    <UploadTeachersList handleSubmit={this.handleSubmit} updateFields={this.updateFields} error={this.state.errorT} closeError={this.closeError} />
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
            <Card.Header className="titleUploadCard"><b>UPLOAD STUDENT LIST</b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={1} />}
                <Form>
                    <Form.Group>
                        <Form.File id="StudentList" onChange={(ev) => updateFields("courseList", ev.target.value, 1, ev.target.files[0])} />
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
            <Card.Header className="titleUploadCard"> <b>UPLOAD COURSE LIST </b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={2} />}
                <Form>
                    <Form.Group>
                        <Form.File id="CourseList" onChange={(ev) => updateFields("courseList", ev.target.value, 2, ev.target.files[0])} />
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
            <Card.Header className="titleUploadCard"><b>UPLOAD TEACHER LIST</b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={3} />}
                <Form>
                    <Form.Group>
                        <Form.File id="TheachersList" onChange={(ev) => updateFields("teachersList", ev.target.value, 3, ev.target.files[0])} />
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
            <Card.Header className="titleUploadCard"><b>UPLOAD SCHEDULE LIST </b> </Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={4} />}
                <Form>
                    <Form.Group>
                        <Form.File id="LecturesList" onChange={(ev) => updateFields("lecturesList", ev.target.value, 4, ev.target.files[0])} />
                        <br />
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
            <Card.Header className="titleUploadCard"><b>UPLOAD ENROLLMENT LIST </b></Card.Header>
            <Card.Body>
                {error && <ExError closeError={closeError} error={5} />}
                <Form>
                    <Form.Group>
                        <Form.File id="ClassesList" onChange={(ev) => updateFields("classesList", ev.target.value, 5, ev.target.files[0])} />
                        <br />
                        <Button onClick={() => handleSubmit(5)} > Send File </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
}


function ExError(props) {
    let { error, closeError } = props;
    const [show, setShow] = useState(true);
    const handleClose = () => { setShow(false); closeError(error); }
    if (show) {
        return (
            <Alert variant="danger" onClose={() => handleClose()} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Please insert only right csv files.
          </p>
            </Alert>
        );
    }

}



export default UploadLists;