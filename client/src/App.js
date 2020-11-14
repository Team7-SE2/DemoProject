import React from "react";
import "./App.css";
import Header from "./components/Header";
import Counters from "./components/Counters"
import Login from "./components/Login"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import ListStudentsCourses from "./components/ListStudentsCourses";
import StudentCourseLectures from "./components/StudentCourseLectures";
import API from './api/api.js';
import { AuthContext } from "./auth/AuthContext";
import Demo from "./components/Calendar.js";
import HomeCalendar from "./components/HomeCalendar.js";

class App extends React.Component {

  constructor(props) {
    super(props);
    let course = { subjectID: " " };

    this.state = {
      authUser: null,
      info_user: null,
      login_error: null,
      courses: [],
      lectures: [],
      logged: false,
      course: course,
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

        };
        this.setState({ logged: true });
        this.setState({ loginError: false });
        this.setState({ info_user: info });
        this.setState({ authUser: info });
        this.setState({ ID_User: info.ID_User })
        this.loadInitialData();
        this.props.history.push("/student");

      }
    ).catch(
      () => { this.setState({ loginError: true }) }
    );
  }

  userLogout = () => {

    API.userLogout().then(() => {
      //this.setState({ authUser: null, authErr: null, veicoli: [], logged: false, veicoli_disponibili: [], info_noleggi_utente: [], importo: 0, info_noleggio: null, ID_Veicolo: -1, cliente_frequente: false, num_veicoli_disponibili: 0 });
      this.setState(this.initialState);

      this.props.history.push("/login");


    });
  }

  showLectures = (course) => {
    API.getStudentCourseLectures(course.id)
      .then((lectures) => {
        this.setState({ course: course });
        this.setState({ lectures: lectures });
        this.props.history.push("/student/courses/" + course.subjectID + "/lectures");

      });
  }

  loadInitialData = () => {
    API.getStudentCourses(this.state.info_user.ID_User)
      .then((courses) => {
        this.setState({ courses: courses })
      }
      );
      API.getBookedLectures(this.state.info_user.ID_User)
      .then((bookedLectures) =>{
        const myBookedLectures = [];
        bookedLectures.forEach(elem => {
          if(elem.user_id == this.state.info_user.ID_User) 
            myBookedLectures.push(elem);
        })
        console.log("mybl: "+myBookedLectures);
        this.setState({bookedLectures : myBookedLectures});
      })
      .catch(() => {
        console.log("Errore in getBookedLectures");
      });


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
    if (err) {
      if (err.status && err.status === 401) {
        this.setState({ authErr: err.errorObj });

      }
    }
  }


  bookLecture = (LectureID) => {
    API.bookLecture(this.state.authUser.ID_User, LectureID)
      .then(() => {

      this.loadInitialData();

      })
      .catch(() => {

      });
  }

  deleteBookedLecture = (LectureID) => {
    API.deleteBookedLecture(this.state.authUser.ID_User, LectureID)
    .then(() => {
     this.loadInitialData();
      })
    .catch(() => {

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

          <Header userLogout={this.userLogout} />

          <Container fluid>

            <Switch>

              <Route exact path="/">
                {this.state.logged ? <Redirect to="/student" /> : <Redirect to="/login" />}
              </Route>

              <Route path="/login">
                <Container fluid>
                  <Login userLogin={this.userLogin} loginError={this.state.loginError} />
                </Container>
              </Route>

              <Route exact path="/student">

                <Row >
                  <Col sm={4} className="below-nav">

                    <ListStudentsCourses courses={this.state.courses} showLectures={this.showLectures}>
                    </ListStudentsCourses>

                  </Col>
                  <Col sm={8} className="below-nav" >
                    <HomeCalendar userId={this.state.ID_User}></HomeCalendar>
                    
                  </Col>

                </Row>
                
              </Route>

              <Route exact path="/student/calendar">
                <Row >
                  <Demo userId={this.state.ID_User}></Demo>
                </Row>
              </Route>

              <Route path={"/student/courses/" + this.state.course.subjectID + "/lectures"}>
                <Row className="vheight-100 ">
                  <Col sm={3} className="below-nav" />
                  <Col sm={6} className="below-nav">
                    <StudentCourseLectures lectures={this.state.lectures} course={this.state.course} bookLecture ={this.bookLecture} deleteBookedLecture = {this.deleteBookedLecture} bookedLectures = {this.state.bookedLectures}/>
                  </Col>
                  <Col sm={3} className="below-nav" />

                </Row>

              </Route>



              <Route>
                <Redirect to='/student' />
              </Route>


            </Switch>
          </Container>

        </Container>
      </AuthContext.Provider>

    );
  }
}

export default withRouter(App);
