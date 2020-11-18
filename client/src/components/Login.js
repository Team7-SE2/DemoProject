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
            <Col sm={4} />
            <Col sm={4} className="below-nav" >

                <Card style={{marginTop: "100px"}}>
                    <Card.Header className="text-center" style={{fontSize: "200%"}}><b>LOGIN </b> </Card.Header>
                    <Card.Body style={{alignSelf: "center"}}>
                        <Form onSubmit={this.validateForm}  >
                            <Form.Row >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Insert your username" size
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
                            
                                <div className = "text-center" controlId = "Submit">
                                    <Button onClick={this.doLogin} variant="dark" type="submit">LOGIN</Button>

                                </div>
                            
                        </Form>

                        {this.props.loginError &&
                            <Card bg="danger">
                                <Card.Header>Wrong username or password</Card.Header>
                            </Card>
                        }
                    </Card.Body>

                </Card>
            </Col>
            <Col  sm={4} />
            

                

            
            
        </Row>
    
    }
}

export default Login;
