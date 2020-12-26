import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaUsers, FaTrashAlt, FaList, FaCogs, FaCheck } from 'react-icons/fa';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Checkbox } from '@material-ui/core';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";


class supportOfficerLecturesRules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_year: null,
            capiency: null,
            capiency_value: null,
            morning: null,
            afternoon: null,
        }

/*
        this.setState({
            first_year: rules.first_year,
            capiency: rules.capiency,
            capiency_value: rules.capiency_value,
            morning: rules.morning,
            afternoon: rules.afternoon,
        })
    }
    */
}
    updateField(name, value) {
        this.setState({ [name]: value } );
    }




    render() {

        return <Row>
            <Col sm={1}/>
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
                                        <td className="text-center"> {this.state.first_year && <FaCheck  />}</td>
                                    </tr>
                                    <tr>
                                        <td>Only lectures that are scheduled in a room with at least a certain capiency are bookable  </td>
                                        <td><Form.Control as="select" >
                                            <option>50</option>
                                            <option>100</option>
                                            <option>150</option>
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
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.morining} disabled = {this.state.afternoon}
                                            name="morning"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.morning)}></Form.Check></td>
                                        <td className="text-center"> {this.state.morning && <FaCheck />}</td>
                                    </tr>
                                    <tr>
                                        <td>Only afternoon lectures are bookable</td>
                                        <td></td>
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.afternoon} disabled = {this.state.morning}
                                            name="afternoon"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.afternoon)}></Form.Check></td>

                                        <td className="text-center"> {this.state.afternoon && <FaCheck />}</td>
                                    </tr>
                                </tbody>


                            </Table>




                        </Card.Body>

                    </Card>



                </Form>

            </Col>
            <Col sm={1}/>



        </Row>


    }
}





export default supportOfficerLecturesRules;