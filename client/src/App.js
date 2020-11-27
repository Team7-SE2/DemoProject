import React, { useState } from 'react';
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
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import CourseLectures from './components/CourseLectures';
import DatePickerComponent from './components/DatePickerComponent';
import moment from 'moment';
import StatisticsComponet from './components/StatisticsComponent';

import { Line } from 'react-chartjs-2'

/*let data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}*/

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

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
        this.setState({ statisticsGroupBy: 'days' })
        this.setState({ startFilterDate: moment().add(-7, "days").startOf("day") })
        this.setState({ endFilterDate: moment().endOf("day") })

        console.log("initialTime: " + moment())

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
        this.setState({ lectures: lectures.filter((s) => moment(s.date).isAfter(moment())) });
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

  setStateDate = (type, date) => {

    if (type === "startDate") {

      this.setState({ startFilterDate: moment(date) })

    } else if (type === "endDate") {

      this.setState({ endFilterDate: moment(date) })

    }

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
            this.setState({ lectures: lectures.filter((s) => moment(s.date).isAfter(moment())) });
          });
      })
      .catch((err) => {
        console.log("erroreeeeeee")
      })
  }

  switchRoute = (path) => {
    this.props.history.push(path);
  }

  onStatisticGroupByChange = (e) => {
    console.log("filter: " + e.target.value)
    this.setState({ statisticsGroupBy: e.target.value })
  }

  turnOnRemote = (lecture) => {
    API.turnOnRemote(lecture.id)
      .then(() => {
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

  //questa funzione restituisce un array col dataset pronto per il grafico
  getDataGrouped = (data, groupBy, startDate, endDate) => {

    //groupBy deve essere 'hours','days','months'
    //data deve essere un array e avere il campo created_at (o un campo creato ad hoc timestamp)

    var start = moment(startDate).startOf(groupBy)
    var end = moment(endDate).startOf(groupBy)
    var numSpans = end.diff(start, groupBy);
    var res = []
    for (let i = 0; i <= numSpans; i++) {
      res[i] = 0;
    }
    data.forEach((d) => {
      if (d.date)
        var index = moment(d.date).startOf(groupBy).diff(start, groupBy);
      else
        var index = moment(d.created_at).startOf(groupBy).diff(start, groupBy);
      if (!res[index])
        res[index] = 0;
      res[index]++;
    })

    console.log("res: " + JSON.stringify(res))
    return res;
  }

  getTimeSpans = (groupBy, startDate, endDate) => {

    //groupBy deve essere 'hours','days','months'

    var start = moment(startDate).startOf(groupBy)
    var end = moment(endDate).startOf(groupBy)
    var numSpans = end.diff(start, groupBy);
    var res = [];
    var formatString = '';
    switch (groupBy) {
      case 'hours': { formatString = 'll:HH:mm' } break;
      case 'days': { formatString = 'll' } break;
      case 'weeks': { formatString = 'll' } break;
      case 'months': { formatString = 'MMMM' } break;
      default: { formatString = 'lll' } break;
    }
    for (var i = 0; i <= numSpans; i++) {
      res[i] = start.clone().add(i, groupBy).format(formatString);
    }

    console.log("label: " + JSON.stringify(res))
    return res;
  }

  generateData = () => {
    let startDate = moment(this.state.startFilterDate).toDate();
    let endDate = moment(this.state.endFilterDate).toDate();
    console.log("button pressed")
    API.getCourseLectures( {
      startDate: startDate,//moment().add(-3, "days").toISOString(),
      endDate: endDate, //moment().toISOString()
      user_id : 4
    })
      .then((lectures) => {
        var data = lectures.filter((a) => {
          return !a.deleted_at;
        });
        console.log("TEST TIME: " + startDate + " " + endDate)
        /*this.data.labels = data.map((d) => 1)
        this.data.datasets.labels = data.map((d) => d.date)*/
        console.log(data)
        let statistics = {
          studentsCounts: 0,
          numberOfLessons: data.length,
          numberOfLessonsCancelled: 0,
          numberOfLessonsRemote: 0,
          nummberOfLessonPresence: 0
        }
        lectures.forEach((elem) => {
          console.log(elem.studentsCount);
          statistics.studentsCounts += elem.studentsCount;
          if (elem.deleted_at) statistics.numberOfLessonsCancelled++;
          else if (elem.remote) statistics.numberOfLessonsRemote++;
          else statistics.nummberOfLessonPresence++;
        });
        this.setState({
          lectureData: {
            labels: this.getTimeSpans(this.state.statisticsGroupBy, startDate /*moment().add(-3, "days").toISOString()*/, endDate /*moment().toISOString()*/),
            datasets: [
              {
                label: '# of Bookings',
                data: this.getDataGrouped(data, this.state.statisticsGroupBy, startDate, endDate),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
            ]
          },
          statistics: statistics
        })

        console.log("state: "+JSON.stringify(this.state.statistics));
      })
      .catch((err) => {
        console.log("err: " + JSON.stringify(err))
      })
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
                      <Row>
                        <Col sm={5} style={{ paddingLeft: "50px" }}><h1 style={{ color: "white" }}>OVERALL</h1></Col>
                      </Row>
                      <br></br>

                      <Row>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                          <Card>
                            <Card.Header className="text-center">
                              <h1 className='title'>Date Time Filter</h1>
                            </Card.Header>
                            <Card.Body>
                              <Form>
                                <Row>
                                  <Col sm={2}>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                      <Form.Label>Group By</Form.Label>
                                      <Form.Control defaultValue="days" value={this.state.statisticsGroupBy} as="select" onChange={this.onStatisticGroupByChange} custom>
                                        <option>hours</option>
                                        <option>weeks</option>
                                        <option>days</option>
                                        <option>months</option>
                                      </Form.Control>
                                    </Form.Group>
                                  </Col>
                                  <Col sm={1}></Col>
                                  <Col sm={3}>
                                    <DatePickerComponent label={"Start day : "} type="startDate" setStateDate={this.setStateDate} ></DatePickerComponent>
                                  </Col>
                                  <Col sm={3}>
                                    <DatePickerComponent label={"End day : "} type="endDate" setStateDate={this.setStateDate}></DatePickerComponent>
                                  </Col>
                                  <Col sm={1}></Col>
                                  <Col sm={1} style={{ alignSelf: "center" }}>
                                    <Button variant="primary" onClick={this.generateData} >Generate</Button>
                                  </Col>
                                </Row>
                              </Form>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <StatisticsComponet statistics={this.state.statistics} />
                      </Row>
                      <br></br>

                      <Row>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                          <Card>
                            <Card.Header className="text-center">
                              <h1 className='title'>Line Chart</h1>
                            </Card.Header>
                            <Card.Body>
                              <Line data={this.state.lectureData} options={options} />
                            </Card.Body>

                          </Card>
                        </Col>

                      </Row>
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
        </Container >
      </AuthContext.Provider >

    );
  }
}

export default withRouter(App);