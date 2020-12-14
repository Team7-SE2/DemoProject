import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import API from '../api/api';
import Modal from "react-bootstrap/Modal"
class ContactTracingReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentID: '',
            name : '',
            surname: '',
            role_id: null,
            show: false
            
        };
    }

    


    updateField = (name, value) => {
        this.setState({ [name]: value }, () => {
    
        });
      }

    confirm = (event) => {
        event.preventDefault();
        API.getStudentInfo(this.state.studentID)
        .then((studentinfo) =>{this.setState({name: studentinfo.name, surname: studentinfo.surname, role_id: studentinfo.role_id})})
        .catch(() =>{ /* faccio spuntare l'alert */})
        this.showModal();
        

        
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false, name: '', surname: '', role_id: null});
      };

      generateReport = () => {
          console.log("GENERATE REPORT")
        API.generateContactTracingReport(this.state.studentID)
        .then(() =>
            console.log("AAAAAAAAAAAAAAAA")
        )
        .catch(()=> {console.log("ERROR");})
      }
    


    render() {
        return <>
        <br></br>  <br></br> 
            <Form >
                            <Form.Row >
                                <Form.Group controlId="studentID" >
                                    <Form.Label><h5>Please insert student's identification number which contracted Covid-19</h5></Form.Label>
                                    <Row>
                                    <Col sm={4}></Col>
                                    <Col sm={4}>
                                    <Form.Control type="text" placeholder="Student id" size
                                        name='studentID'
                                        value={this.state.studentID}
                                        onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} />
                                    </Col>
                                    <Col sm={4}></Col>
                                    </Row>

                                </Form.Group>
                            </Form.Row>
                        
                            <br></br>
                                <div className = "text-center" controlId = "Submit">
                                    <Button onClick={this.confirm} variant="dark" type="submit">Generate report</Button>

                                </div>
              
            </Form>
            <br></br>






            <Modal show={this.state.show} handleClose={this.hideModal} backdrop="static" keyboard={false}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pay attention! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { (this.state.name && this.state.role_id ==5) ?
                     <> Do you want to confirm that <b> {this.state.name} {this.state.surname} </b> contracted Covid-19? </>
                     :
                     <> Student ID is not correct! Please retry with another student ID </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {  (this.state.name && this.state.role_id ==5) ?
                       <Button variant="success" onClick={() => {this.generateReport(); this.hideModal();}} > Generate Report </Button>
                       :
                       <Button variant="success" onClick={() => {this.hideModal();}} > OK </Button>
                    }

                    {  (this.state.name && this.state.role_id ==5) && <>
                            <Button variant="danger" onClick={() => {this.hideModal();}} > Go Back </Button> </>
                    }
                </Modal.Footer>
            </Modal>

     
        
        </>
         
    }
}



export default ContactTracingReport;