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

import { Line, Bar, HorizontalBar } from 'react-chartjs-2'
import TeacherStatistics from './components/TeacherStatistics';

function parseQuery(str) {
  if (typeof str != "string" || str.length == 0) return {};
  var query = str.split("?");
  if (query[1]) {
      var s = query[1].split("&");
      var s_length = s.length;
      var bit, query = {}, first, second;
      for (var i = 0; i < s_length; i++) {
          bit = s[i].split("=");
          first = decodeURIComponent(bit[0]);
          if (first.length == 0) continue;
          second = decodeURIComponent(bit[1]);
          if (typeof query[first] == "undefined") query[first] = second;
          else if (query[first] instanceof Array) query[first].push(second);
          else query[first] = [query[first], second];
      }
      return query;
  }
  return {};
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          precision: 0
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          precision: 0
        },
      },
    ],
  },
}
const optionsBarChart = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          precision: 0
        },
        stacked: true
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          precision: 0
        },
        stacked: true
      }
    ]
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

        //console.log("initialTime: " + moment())

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
    //console.log("filter: " + e.target.value)
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
  getDataGrouped = (data, groupBy, startDate, endDate, type) => {

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
      if(type == 'bookings')
        var index = moment(d.lecture.date).startOf(groupBy).diff(start, groupBy);
      else{
        if (d.date)
          var index = moment(d.date).startOf(groupBy).diff(start, groupBy);
        else
          var index = moment(d.created_at).startOf(groupBy).diff(start, groupBy);
      }
      if (!res[index])
        res[index] = 0;
      res[index]++;
    })

    //console.log("res: " + JSON.stringify(res))
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
      if(groupBy == 'weeks')
        res[i] = start.clone().add(i, groupBy).format(formatString) +' - '+ start.clone().add(i, groupBy).endOf(groupBy).format(formatString);
      else
        res[i] = start.clone().add(i, groupBy).format(formatString);
    }

    //console.log("label: " + JSON.stringify(res))
    return res;
  }
  
  generateData = () => {
    
    let get = parseQuery(document.URL);
    let startDate = moment(this.state.startFilterDate).toDate();
    let endDate = moment(this.state.endFilterDate).toDate();

    let statistics = {
      studentsBookings: 0,
      numberOfLessons: 0,
      numberOfLessonsCancelled: 0,
      numberOfLessonsRemote: 0,
      numberOfLessonPresence: 0
    }
    let courseLecturesParams = {
      startDate: startDate,//moment().add(-3, "days").toISOString(),
      endDate: endDate, //moment().toISOString()
      teacher_id: this.state.authUser.ID_User
    }

    if(get.subjectId)
      courseLecturesParams.subject_id = get.subjectId;
    //console.log("button pressed")
    API.getCourseLectures(courseLecturesParams)
      .then((lectures) => {

        var lecturesFiltered = lectures.filter((a) => {
          return !a.deleted_at;
        });
        var lecturesCanceled = lectures.filter((a) => {
          return a.deleted_at;
        });
        var lecturesInPresence = lecturesFiltered.filter((a) => {
          return !a.remote;
        });
        var lecturesRemote = lecturesFiltered.filter((a) => {
          return a.remote;
        });
        
        statistics.numberOfLessons = lectures.length;

        console.log(lectures)

        lectures.forEach((elem) => {
          //statistics.studentsCounts += elem.studentsCount;
          if (elem.deleted_at != null) statistics.numberOfLessonsCancelled++;
          else {
            if (elem.remote) statistics.numberOfLessonsRemote++;
            else statistics.numberOfLessonPresence++;
          }
        });

        this.setState({
          lectureData: {
            labels: this.getTimeSpans(this.state.statisticsGroupBy, startDate, endDate),
            datasets: [
              {
                label: 'Lectures In Presence',
                data: this.getDataGrouped(lecturesInPresence, this.state.statisticsGroupBy, startDate, endDate),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              },
              {
                label: 'Lectures Remote',
                data: this.getDataGrouped(lecturesRemote, this.state.statisticsGroupBy, startDate, endDate),
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label: 'Lectures Canceled',
                data: this.getDataGrouped(lecturesCanceled, this.state.statisticsGroupBy, startDate, endDate),
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              },
            ],
            
          },
          //statistics: statistics
        })

        //console.log("state: "+JSON.stringify(this.state.statistics));
      })
      .catch((err) => {
        console.log("err: " + JSON.stringify(err))
      })
    
    API.getStatisticsBookings(courseLecturesParams)
      .then((bookings) => {
        statistics.studentsBookings = bookings.length;
        //console.log("bookings: " + JSON.stringify(bookings))
        bookings.sort((a, b)=>{
          return moment(a.lecture.date).unix() - moment(b.lecture.date).unix()
        })
        this.setState({
          bookingsData: {
            labels: this.getTimeSpans(this.state.statisticsGroupBy, startDate, endDate),
            datasets: [
              {
                label: 'Bookings',
                data: this.getDataGrouped(bookings, this.state.statisticsGroupBy, startDate, endDate, "bookings"),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                lineTension: 0,
              }
            ]
          }
        })

        var bookingsPerLectureObj = {};
        var bookingsPerLectureData = [];
        var bookingsPerLectureLabels = [];

        bookings.forEach((booking)=>{
          if(booking.lecture && booking.lecture.date && booking.lecture.subject && booking.lecture.subject.subjectID){
            if(!bookingsPerLectureObj[booking.lecture.date])
              bookingsPerLectureObj[booking.lecture.date] ={count: 0, subjectID: booking.lecture.subject.subjectID}
            bookingsPerLectureObj[booking.lecture.date].count ++;
          }
        })
        Object.keys(bookingsPerLectureObj).forEach((k)=>{
          bookingsPerLectureData.push(bookingsPerLectureObj[k].count);
          bookingsPerLectureLabels.push(bookingsPerLectureObj[k].subjectID +' - '+ moment(k).format("lll"));
        })

        this.setState({
          bookingsLectureData: {
            labels: bookingsPerLectureLabels,
            datasets: [
              {
                label: 'Bookings',
                data: bookingsPerLectureData,
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                order: 1
              },
              {
                label: 'Attendances',
                data: bookingsPerLectureData,
                fill: false,
                // borderColor: '#EC932F',
                // backgroundColor: '#EC932F',
                // pointBorderColor: '#EC932F',
                // pointBackgroundColor: '#EC932F',
                // pointHoverBackgroundColor: '#EC932F',
                // pointHoverBorderColor: '#EC932F',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                //borderColor: 'rgba(54, 162, 235, 1)',
                type: "line",
                lineTension: 0,
                order: 2
                //borderWidth: 1,
              }
            ]
          },
          statistics: statistics
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  resetState = () => {
    this.setState({
      statistics:{},
      lectureData:{},
      bookingsData:{},
      bookingsLectureData:{}
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
                  resetState = {this.resetState}
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
                      <TeacherStatistics title = "OVERALL" statisticsGroupBy = {this.state.statisticsGroupBy} onStatisticGroupByChange = {this.onStatisticGroupByChange} setStateDate = {this.setStateDate} generateData = {this.generateData} statistics = {this.state.statistics} lectureData = {this.state.lectureData} optionsBarChart = {optionsBarChart} bookingsData = {this.state.bookingsData} bookingsLectureData = {this.state.bookingsLectureData} options = {options}></TeacherStatistics>
                    </Route>
                    {this.state.courses.map((course) => <Route exact path={"/teacher/statistics/" + course.subjectID}>
                      <TeacherStatistics title = {course.description.toUpperCase()} statisticsGroupBy = {this.state.statisticsGroupBy} onStatisticGroupByChange = {this.onStatisticGroupByChange} setStateDate = {this.setStateDate} generateData = {this.generateData} statistics = {this.state.statistics} lectureData = {this.state.lectureData} optionsBarChart = {optionsBarChart} bookingsData = {this.state.bookingsData} bookingsLectureData = {this.state.bookingsLectureData} options = {options}></TeacherStatistics>
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