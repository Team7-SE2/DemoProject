import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import sfondo from '../img/sfondo.jpeg';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", submitted: false, };
    }
    updateField = (name, value) => {
        this.setState({ [name]: value });
    }
    doLogin = (event) => {
        event.preventDefault();
        this.props.userLogin(this.state.username, this.state.password);
    }

    render() {
        return <Row className="vheight-100">
            <Col sm={1} />
            <Col sm={4} className="below-nav" >

                <Card style={{marginTop: "100px"}}>
                    <Card.Header style={{fontSize: "200%"}}><b>LOGIN </b> </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.validateForm} >
                            <Form.Row>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Insert your username"
                                        name='username'
                                        value={this.state.username}
                                        onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                        name='password'
                                        value={this.state.password}
                                        onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Don't share your password with anyone
                      </Form.Text>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group controlId="Submit">
                                    <Button onClick={this.doLogin} variant="dark" type="submit">LOGIN</Button>

                                </Form.Group>
                            </Form.Row>
                        </Form>

                        {this.props.loginError &&
                            <Card bg="danger">
                                <Card.Header>Wrong username or password</Card.Header>
                            </Card>
                        }
                    </Card.Body>

                </Card>
            </Col>
            <Col  sm={1} />



             <Col style={{backgroundImage: `url(${sfondo})`, backgroundPosition : "center center" ,backgroundRepeat  : 'no-repeat' }} sm={6} >

                 </Col>
                

            
            
        </Row>
    }
}

export default Login;
