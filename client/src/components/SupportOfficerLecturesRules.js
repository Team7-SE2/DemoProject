import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaUsers, FaTrashAlt, FaList, FaCogs, FaCheck } from 'react-icons/fa';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Checkbox } from '@material-ui/core';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';
import API from '../api/api.js';

class supportOfficerLecturesRules extends React.Component {

    constructor(props) {
        super(props);
        this.state = { //todo: caricare con il valore che si riceve dal json.
            first_year: false,
            capiency: false,
            capiency_value: 50,
            morning: false,
            afternoon: false,
            showSuccess: false,
        }
       
    }
    updateField = (name, value) => {
        this.setState({ [name]: value });
        this.setState({showSuccess:false});
    }
    onSubmit = (event) => {
        event.preventDefault();
        let new_rules = {
            first_year: this.state.first_year,
            capiency: this.state.capiency,
            capiency_value: this.state.capiency ? this.state.capiency_value: null,
            morning: this.state.morning,
            afternoon: this.state.afternoon,
        }
        API.updateRules(new_rules)
        .then(()=> {
            this.setState({showSuccess: true});
        })
        .catch(()=> {
            console.log("ERRORE IN UPDATE RULES");
        });
        
        
    }


    closeSuccess = () => {
        this.setState({showSuccess:false});
    }

    render() {

        return <Row>
            <Col sm={1} />
            <Col sm={10}>
                <Form>
                    <Card>
                        <Card.Header> <b>Restriction rules for bookable lectures</b></Card.Header>
                        <Card.Body >
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Rule</th>
                                        <th> </th>
                                        <th className="text-center">Enable this rule</th>
                                        <th className="text-center"> Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> Only lectures for the first year can be booked</td>
                                        <td></td>
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.first_year}
                                            name="first_year"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.first_year)}></Form.Check></td>
                                        <td className="text-center"> {this.state.first_year && <FaCheck />}</td>
                                    </tr>
                                    <tr>
                                        <td>Only lectures that are scheduled in a room with at least a certain capiency are bookable  </td>
                                        <td><Form.Control as="select" name="capiency_value" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}>
                                            <option value="50"> 50 </option>
                                            <option value="100" > 100 </option>
                                            <option value="150" > 150 </option>
                                        </Form.Control>
                                        </td>
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.capiency}
                                            name="capiency"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.capiency)}></Form.Check></td>
                                        <td className="text-center"> {this.state.capiency && <FaCheck />}</td>
                                    </tr>
                                    <tr>
                                        <td>Only morning lectures are bookable</td>
                                        <td></td>
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.morining} disabled={this.state.afternoon}
                                            name="morning"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.morning)}></Form.Check></td>
                                        <td className="text-center"> {this.state.morning && <FaCheck />}</td>
                                    </tr>
                                    <tr>
                                        <td>Only afternoon lectures are bookable</td>
                                        <td></td>
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.afternoon} disabled={this.state.morning}
                                            name="afternoon"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.afternoon)}></Form.Check></td>
                                        <td className="text-center"> {this.state.afternoon && <FaCheck />}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button variant="success" type="submit" onClick={this.onSubmit}> Apply new rules </Button>
                        </Card.Footer>
                    </Card>
                </Form>
                <br/>
                <Success first_year = {this.state.first_year} capiency={this.state.capiency } capiency_value={this.state.capiency_value} morning={this.state.morning} afternoon = {this.state.afternoon} showSuccess={this.state.showSuccess} closeSuccess={this.closeSuccess} />

            </Col>
            <Col sm={1} />
        </Row>
    }
}

function Success(props) {

    let {first_year, capiency,capiency_value,morning,afternoon,showSuccess,closeSuccess} = props;

    if (showSuccess) {
        return (
            <Alert variant="success" onClose={() => closeSuccess()} dismissible>
                <Alert.Heading>New rules applied!!!</Alert.Heading>
                <p>
                    The new rules are: <br/>
                    <ul>
                    <li>first year: {first_year?"yes":"no"}</li>
                    <li>capiency: {capiency?`yes, capiency value: ${capiency_value}`:"no"}   </li>
                    <li>morning {morning?"yes":"no"}</li>
                    <li>afternoon: {afternoon?"yes":"no"}</li>
                    </ul>
          </p>
            </Alert>
        );
        
    }
return <> </>
}



export default supportOfficerLecturesRules;