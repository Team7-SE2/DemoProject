import React from 'react';
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
import moment from 'moment';

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
        this.setState({ lectures: lectures.filter((s) => moment(s.date).isAfter(moment().add("days", 1).set("hours", 0).set("minutes", 0).set("seconds", 0))) });
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
        this.setState({ lectures: lectures.filter((s) => moment(s.date).isAfter(moment().set("hours", 0).set("minutes", 0).set("seconds", 0))) });
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



  handleErrors(err) {
    this.setState({ logged: false });
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

  deleteLecture = (lecture) => {
    API.deleteLecture(lecture.id)
      .then(() => {
        this.loadInitialDataTeacher();
        API.getStudentCourseLectures(lecture.subject_id)
          .then((lectures) => {
            this.setState({ lectures: lectures.filter((s) => moment(s.date).isAfter(moment().set("hours", 0).set("minutes", 0).set("seconds", 0))) });
          });
      })
      .catch((err) => {
        console.log("erroreeeeeee")
      })
  }

  switchRoute = (path) => {
    this.props.history.push(path);
  }

  turnOnRemote = (lecture) => {
    API.turnOnRemote(lecture.id)
      .then (() => {
        this.loadInitialDataTeacher();
        API.getStudentCourseLectures(lecture.subject_id)
          .then((lectures) => {
            this.setState({ lectures: lectures.filter((s) => moment(s.date).isAfter(moment().set("hours", 0).set("minutes", 0).set("seconds", 0))) });
          });

      })
      .catch(() => {
        console.log("Errore put");
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

        <Container className="backgroundPages" style={{ maxWidth: '100%', overflowX: 'hidden', padding: '0px' }}>
          <Row className="vheight-100">
            {this.state.logged ? <Col sm={2}>
              <div style={{ position: "fixed", height: '100%', zIndex: 9999 }}>
                <Aside
                  courses={this.state.courses}
                  //image={image}
                  collapsed={false}
                  rtl={false}
                  toggled={false}
                  handleToggleSidebar={false}
                  style={{ height: '100%' }}
                  userLogout={this.userLogout}
                  role_id={this.state.info_user.role_id}
                  logged={this.state.logged}
                />
              </div>
            </Col> : <></>}

            <Col >
              {this.state.logged ? <Header userLogout={this.userLogout} role_id={this.state.info_user.role_id} logged={this.state.logged} /> : <></>}

              <Switch>

                <Route exact path="/">
                  {this.state.logged ? <Redirect to="/" /> : <Redirect to="/login" />}

                </Route>

                <Route path="/login">
                  <Container fluid className="backgroundLogin">
                    <Login userLogin={this.userLogin} loginError={this.state.loginError} />
                  </Container>
                </Route>

                <Route exact path="/student">
                  {this.state.logged ? <Redirect to="/student" /> : <Redirect to="/login" />}
                  <Container fluid>
                    <Row /* style={{paddingTop: '5%'}}*/>
                      <Col sm={2}></Col>
                      <Col sm={8} className="below-nav">
                        <Card>
                          <Card.Header className="text-center">
                            <h3>My teaching load</h3>
                          </Card.Header>
                          <Card.Body>
                            <ListCourses courses={this.state.courses} showLectures={this.showStudentsLectures} role_id={this.state.info_user.role_id} />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={2}></Col>
                      <Col sm={1}></Col>
                      <Col sm={10} className="below-nav">
                        <Card>
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
                  <Container fluid>
                    <Row >
                      <Col sm={1}></Col>
                      <Col sm={10} className="below-nav">
                        <Card>
                          <Card.Header className="text-center">
                            <h3>My Bookings Calendar</h3>
                          </Card.Header>
                          <Card.Body>
                            <HomeCalendar userId={this.state.ID_User} isMyCalendar={true} isStudent={true}></HomeCalendar>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </Route>

                <Route exact path={"/student/courses/" + this.state.course.subjectID + "/lectures"}>
                  <Container fluid>
                    <Row >
                      <Col sm={3} className="below-nav" />
                      <Col sm={6} className="below-nav">
                        <CourseLectures role_id={this.state.info_user.role_id} lectures={this.state.lectures} course={this.state.course} bookLecture={this.bookLecture} deleteBookedLecture={this.deleteBookedLecture} bookedLectures={this.state.bookedLectures} deleteLecture={this.deleteLecture} />
                      </Col>
                      <Col sm={3} className="below-nav" />

                    </Row>
                  </Container>

                </Route>


                <Route exact path="/teacher">
                  {this.state.logged ? <Redirect to="/teacher" /> : <Redirect to="/login" />}
                  <Container fluid>
                    <Row >
                      <Col sm={1}></Col>
                      <Col sm={10} className="below-nav">
                        <Card>
                          <Card.Header className="text-center">
                            <h3>My Courses</h3>
                          </Card.Header>
                          <Card.Body>
                            <ListCourses courses={this.state.courses} showLectures={this.showTeachersLectures} role_id={this.state.info_user.role_id} />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row >
                      <Col sm={1}></Col>
                      <Col sm={10} className="below-nav">
                        <Card>
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
                    <Row >
                      <Col sm={1} className="below-nav" />
                      <Col sm={10} className="below-nav">
                        <CourseLectures turnOnRemote={this.turnOnRemote} role_id={this.state.info_user.role_id} lectures={this.state.lectures} course={this.state.course} getListStudents={this.getStudentsList} deleteLecture={this.deleteLecture} />
                      </Col>
                      <Col sm={1} className="below-nav" />

                    </Row>
                  </Container>

                </Route>


                <Route exact path={"/teacher/lectures/" + this.state.lecture.id + "/students"}>
                  <Container fluid>
                    <Row >
                      <Col sm={3} className="below-nav" />
                      <Col sm={6} className="below-nav">
                        <StudentList switchRoute={this.switchRoute} students={this.state.students} course={this.state.course} lecture={this.state.lecture} role_id={this.state.info_user.role_id} />
                      </Col>
                      <Col sm={3} className="below-nav" />

                    </Row>
                  </Container>

                </Route>


                {this.state.info_user.role_id == 4 ?
                  <>
                    <Route exact path={"/teacher/statistics/overall"}>
                      <Col sm={5}><h1 style={{ color: "white" }}>OVERALL</h1></Col>
                      <br />
                      <Col sm={5}><h1 style={{ color: "white" }}>GRAFICI BELLI</h1></Col>
                    </Route>
                    {this.state.courses.map((course) => <Route exact path={"/teacher/statistics/" + course.subjectID}>
                      <Col sm={5}><h1 style={{ color: "white" }}>{course.description}</h1></Col>
                      <br />
                      <Col sm={5}><h1 style={{ color: "white" }}>GRAFICI BELLI</h1></Col>
                    </Route>)}
                  </> : <Redirect to="/login" />}

              </Switch>

            </Col>
          </Row>
        </Container>
      </AuthContext.Provider >

    );
  }
}

export default withRouter(App);