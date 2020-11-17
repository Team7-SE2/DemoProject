import React  from 'react';
import Header from "./components/Header";
import Login from "./components/Login"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import StudentList from "./components/StudentList";
import ListCourses from "./components/ListCourses";
import API from './api/api.js';
import { AuthContext } from "./auth/AuthContext";
import HomeCalendar from "./components/HomeCalendar.js";
import Aside from "./components/Aside.js";
import Card from "react-bootstrap/Card"
import "./App.css";
import CourseLectures from './components/CourseLectures';

class App extends React.Component {

  constructor(props) {
    super(props);
    let course = { subjectID: " " };
    let lecture = {};

    this.state = {
      authUser: null,
      info_user: { role_id: "" },
      login_error: null,
      courses: [],
      lectures: [],
      students: [],
      logged: false,
      course: course,
      lecture: lecture,
      bookedLectures: null
    }
    this.initialState = { ...this.state };



  }

  userLogin = (username, password) => {

    API.userLogin(username, password).then(
      (userObj) => {
        const info = {
          ID_User: userObj.id,
          nome: userObj.name,
          role_id: userObj.role_id,
          email: userObj.email

        };
        this.setState({ logged: true });
        this.setState({ loginError: false });
        this.setState({ info_user: info });
        this.setState({ authUser: info });
        this.setState({ ID_User: info.ID_User })

        if (info.role_id === 5) {
          this.loadInitialDataStudent();
          this.props.history.push("/student");
        }
        if (info.role_id === 4) {
          this.loadInitialDataTeacher();
          this.props.history.push("/teacher");
        }

      }
    ).catch((err) => {

      this.setState({ loginError: true })
      this.handleErrors(err);
    });
  }

  userLogout = () => {

    API.userLogout().then(() => {
      this.setState(this.initialState);

      this.props.history.push("/login");


    });
  }

  showStudentsLectures = (course) => {
    API.getStudentCourseLectures(course.id)
      .then((lectures) => {
        this.setState({ course: course });
        this.setState({ lectures: lectures });
        this.props.history.push("/student/courses/" + course.subjectID + "/lectures");

      })
      .catch((err) => {
        this.handleErrors(err);
      });
  }

  showTeachersLectures = (course) => {
    API.getStudentCourseLectures(course.id)
      .then((lectures) => {
        this.setState({ course: course });
        this.setState({ lectures: lectures });
        this.props.history.push("/teacher/courses/" + course.subjectID + "/lectures");

      })
      .catch((err) => {
        this.handleErrors(err);
      });
  }

  getStudentsList = (lecture) => {
    API.getStudentListforLecture(lecture.id)
      .then((students) => {
        this.setState({ students: students, lecture: lecture });
        this.props.history.push("/teacher/lectures/" + lecture.id + "/students");

      })
      .catch((err) => {
        this.handleErrors(err);
      });

  }


  loadInitialDataStudent = () => {


    API.getStudentCourses(this.state.info_user.ID_User)
      .then((courses) => {
        this.setState({ courses: courses })
      }
      ).catch((err) => {
        this.handleErrors(err);
      });
    API.getBookedLectures(this.state.info_user.ID_User)
      .then((bookedLectures) => {
        const myBookedLectures = [];
        bookedLectures.forEach(elem => {
          if (elem.user_id === this.state.info_user.ID_User)
            myBookedLectures.push(elem);
        });
        this.setState({ bookedLectures: myBookedLectures });
      })
      .catch((err) => {
        this.handleErrors(err);
        console.log("Errore in getBookedLectures");
      });

  }

  loadInitialDataTeacher = () => {

    API.getTeacherSubjects(this.state.info_user.ID_User)
      .then((courses) => {
        this.setState({ courses: courses })
      }
      );
  }


  getRequestTypes = () => {

    API.getRequestTypes()
      .then((requestTypes) => {

        this.setState({ requestTypes: requestTypes });

      })
      .catch((err) => {
        console.log(err);
        this.handleErrors(err);
      });

  }


  handleErrors(err) {
    this.setState({logged: false});
    this.props.history.push("/login");
  }


  bookLecture = (LectureID) => {
    API.bookLecture(this.state.authUser.ID_User, LectureID, this.state.info_user.email)
      .then(() => {

        this.loadInitialDataStudent();

      })
      .catch((err) => {
        this.handleErrors(err);
      });
  }

  deleteBookedLecture = (LectureID) => {
    API.deleteBookedLecture(this.state.authUser.ID_User, LectureID)
      .then(() => {
        this.loadInitialDataStudent();
      })
      .catch((err) => {
        this.handleErrors(err);
      });
  }

  render() {

    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login
    }
    
    return (
      <AuthContext.Provider value={value}>
        
        <Container fluid>
        <Row >
        {this.state.logged ? <Col className="LeftBarCol" sm={2}>
        <Aside className="LeftBar"
                      //image={image}
                      collapsed={false}
                      rtl={false}
                      toggled={false}
                      handleToggleSidebar={false}
                      style={{height:'100%'}}
                      userLogout={this.userLogout} 
                      role_id={this.state.info_user.role_id} 
                      logged = {this.state.logged}
                    /> 
        </Col>: <></>}
        
        <Col sm={10}>
          {this.state.logged ? <Header userLogout={this.userLogout} role_id={this.state.info_user.role_id} logged = {this.state.logged} /> : <></>}
          
                    
            <Row className="vheight-100">
            <Switch>

              <Route exact path="/">
                {this.state.logged ? <Redirect to="/" /> : <Redirect to="/login" />}

              </Route>

              <Route path="/login">
                <Container fluid>
                  <Login userLogin={this.userLogin} loginError={this.state.loginError} />
                </Container>
              </Route>

              <Route exact path="/student">
              {this.state.logged ? <Redirect to="/student" /> : <Redirect to="/login" />}
              <Container fluid>
                <Row className="vheight-100"/* style={{paddingTop: '5%'}}*/>
                  <Col sm={5} className="below-nav">
                    <Card className="CardClass">
                      <Card.Header className="text-center">
                        <h3>My teaching load</h3>
                      </Card.Header>
                      <Card.Body>
                        <ListCourses courses={this.state.courses} showLectures={this.showStudentsLectures} role_id={this.state.info_user.role_id} />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={7} className="below-nav" >
                    <Card className="CardClass">
                      <Card.Header className="text-center">
                        <h3>Available Lectures Calendar</h3>
                      </Card.Header>
                      <Card.Body>
                      <HomeCalendar userId={this.state.ID_User} isStudent={true}></HomeCalendar>
                      </Card.Body>
                    </Card>
                  </Col>
                  </Row>
                </Container>

              </Route>

              <Route exact path="/student/calendar">
                <Row >
                  <HomeCalendar userId={this.state.ID_User} isMyCalendar={true} isStudent={true}></HomeCalendar>
                </Row>
              </Route>

              <Route exact path={"/student/courses/" + this.state.course.subjectID + "/lectures"}>
              <Container fluid>
                <Row className="vheight-100 ">
                  <Col sm={3} className="below-nav" />
                  <Col sm={6} className="below-nav">
                    <CourseLectures role_id={this.state.info_user.role_id} lectures={this.state.lectures} course={this.state.course} bookLecture={this.bookLecture} deleteBookedLecture={this.deleteBookedLecture} bookedLectures={this.state.bookedLectures}/>
                  </Col>
                  <Col sm={3} className="below-nav" />

                </Row>
                </Container>

              </Route>


              <Route exact path="/teacher">
              {this.state.logged ? <Redirect to="/teacher" /> : <Redirect to="/login" />}
              <Container fluid>
                <Row className="vheight-100 ">
                  <Col sm={5} className="below-nav">
                    <Card className="CardClass">
                      <Card.Header className="text-center">
                        <h3>My Courses</h3>
                      </Card.Header>
                      <Card.Body>
                      <ListCourses courses={this.state.courses} showLectures={this.showTeachersLectures} role_id={this.state.info_user.role_id} />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={7} className="below-nav" >
                    <Card className="CardClass">
                      <Card.Header className="text-center">
                        <h3>Lectures Calendar</h3>
                      </Card.Header>
                      <Card.Body>
                        <HomeCalendar userId={this.state.ID_User} isStudent={false}></HomeCalendar>
                      </Card.Body>
                    </Card>
                  </Col>

                </Row>
                </Container>
              </Route>
              <Route exact path={"/teacher/courses/" + this.state.course.subjectID + "/lectures"}>
              <Container fluid>
                <Row className="vheight-100 ">
                  <Col sm={3} className="below-nav" />
                  <Col sm={6} className="below-nav">
                    <CourseLectures role_id = {this.state.info_user.role_id} lectures={this.state.lectures} course={this.state.course} getListStudents={this.getStudentsList} />
                  </Col>
                  <Col sm={3} className="below-nav" />

                </Row>
                </Container>

              </Route>


              <Route exact path={"/teacher/lectures/" + this.state.lecture.id + "/students"}>
              <Container fluid>
                <Row className="vheight-100 ">
                  <Col sm={3} className="below-nav" />
                  <Col sm={6} className="below-nav">
                    <StudentList students={this.state.students} course={this.state.course} lecture={this.state.lecture} />
                  </Col>
                  <Col sm={3} className="below-nav" />

                </Row>
                </Container>

              </Route>





            </Switch>
            </Row>

          </Col>
        </Row>
        </Container>
      </AuthContext.Provider >

    );
  }
}

export default withRouter(App);
