import React from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaCheck } from 'react-icons/fa';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
            start_date: null,
            end_date: null,
            enable_start: false,
            enable_end: false
        }
        API.getRules()
            .then((rules) => {
                console.log(rules);
                this.setState({
                    first_year: rules.first_year,
                    capiency: rules.capiency,
                    capiency_value: rules.capiency_value,
                    morning: rules.morning,
                    afternoon: rules.afternoon,
                    start_date: rules.start_date,
                    end_date: rules.end_date,
                    enable_start: rules.start_date ? true : false,
                    enable_end: rules.end_date? true : false, 
                    showSuccess: false,
                });
            });
    }
    updateField = (name, value) => {
        this.setState({ [name]: value });
        this.setState({ showSuccess: false });
    }
    onSubmit = (event) => {
        event.preventDefault();
        let new_rules = {
            first_year: this.state.first_year,
            capiency: this.state.capiency,
            capiency_value: this.state.capiency ? this.state.capiency_value : null,
            morning: this.state.morning,
            afternoon: this.state.afternoon,
            start_date: this.state.enable_start ? this.state.start_date : null,
            end_date: this.state.enable_end ? this.state.end_date: null
        }
        API.updateRules(new_rules)
            .then(() => {
                this.setState({ showSuccess: true });
            })
            .catch(() => {
                console.log("ERRORE IN UPDATE RULES");
            });
    }


    closeSuccess = () => {
        this.setState({ showSuccess: false });
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
                                        {this.state.capiency && <td>Only lectures that are scheduled in a room with at least <b>{this.state.capiency ? this.state.capiency_value ? this.state.capiency_value : "insert value" : "select the rule"} </b> seats are bookable  </td>}
                                        {!this.state.capiency && <td>Only lectures that are scheduled in a room with the selected capiency are bookable</td>}   
                                        <td><Form.Control as="select" data-testid="capiency_value" name="capiency_value" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} defaultValue="50" required={this.state.capiency}>
                                            <option default value="50"> 50 </option>
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
                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.morning} disabled={this.state.afternoon}
                                            name="morning"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.morning)}></Form.Check></td>
                                        <td className="text-center"> {this.state.morning && <FaCheck />}</td>
                                    </tr>
                                    <tr>

                                        <td>Only afternoon lectures are bookable</td>

                                        <td></td>

                                        <td> <Form.Check className="text-center" type="checkbox" checked={this.state.afternoon} disabled={this.state.morning}
                                            name="afternoon"
                                            onChange={(ev) => this.updateField(ev.target.name, !this.state.afternoon)}></Form.Check>
                                        </td>

                                        <td className="text-center"> {this.state.afternoon && <FaCheck />}</td>

                                    </tr>
                                    <tr>
                                        <td>
                                            Start date: <Form.Control type="date" name="start_date"  defaultValue = {this.state.start_date} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} />
                                        </td>
                                        <td />
                                        <td>
                                            <Form.Check style={{paddingTop : "20px"}} className="text-center" type="checkbox" checked={this.state.enable_start}
                                                name="enable_start"
                                                onChange={(ev) => this.updateField(ev.target.name, !this.state.enable_start)}></Form.Check>
                                        </td>

                                        <td style={{paddingTop : "28px"}} className="text-center"> {this.state.enable_start && <FaCheck  />}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            End date: <Form.Control type="date" name="end_date" defaultValue={this.state.end_date} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} />
                                        </td>
                                        <td />
                                        <td>
                                            <Form.Check style={{paddingTop : "20px"}} className="text-center" type="checkbox" checked={this.state.enable_end}
                                                name="enable_end"
                                                onChange={(ev) => this.updateField(ev.target.name, !this.state.enable_end)}></Form.Check>
                                        </td>
                                        <td style={{paddingTop : "28px"}} className="text-center"> {this.state.enable_end && <FaCheck />}</td>
                                    </tr>


                                    <tr>

                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button variant="success" type="submit" onClick={this.onSubmit}> Apply new rules </Button>
                        </Card.Footer>
                    </Card>
                </Form>
                <br />
                <Success enable_start = {this.state.enable_start} enable_end = {this.state.enable_end} start_date={this.state.start_date} end_date={this.state.end_date} first_year={this.state.first_year} capiency={this.state.capiency} capiency_value={this.state.capiency_value} morning={this.state.morning} afternoon={this.state.afternoon} showSuccess={this.state.showSuccess} closeSuccess={this.closeSuccess} />

            </Col>
            <Col sm={1} />
        </Row >
    }
}

function Success(props) {

    let { first_year, capiency, capiency_value, morning, afternoon, start_date, end_date, enable_start, enable_end, showSuccess, closeSuccess } = props;

    if (showSuccess) {
        return (
            <Alert variant="success" onClose={() => closeSuccess()} dismissible>
                <Alert.Heading>New rules applied!!!</Alert.Heading>
                <p>
                    The new rules are: <br />
                    <ul>
                        <li>first year: {first_year ? "yes" : "no"}</li>
                        <li>capiency: {capiency ? `yes, capiency value: ${capiency_value}` : "no"}   </li>
                        <li>morning {morning ? "yes" : "no"}</li>
                        <li>afternoon: {afternoon ? "yes" : "no"}</li>
                        {enable_start && <li> start date: {start_date}</li>}
                        {enable_end && <li>end date: {end_date} </li>}
                    </ul>
                </p>
            </Alert>
        );

    }
    return <> </>
}



export default supportOfficerLecturesRules;