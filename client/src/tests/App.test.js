import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import {BrowserRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import StudentList from '../components/StudentList';
import CourseLectures from '../components/CourseLectures';
import ListCourses from '../components/ListCourses';
import HomeCalendar from '../components/HomeCalendar';
import Aside from '../components/Aside';
import Header from '../components/Header';
import Login from "../components/Login"
import Api from '../api/api'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router as Router2 } from 'react-router-dom'
import API from '../api/api'

import '@testing-library/jest-dom/extend-expect'

it('renders StudentList', () => {
	render(<StudentList students={[{user:{userID:"AA",name:"AA",surname:"AA"}}]} lecture={{}} course={{description:"..."}}></StudentList>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
// it('renders StudentCourseLectures', () => {
// 	render(<StudentCourseLectures lectures={[]} course={{}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]}></StudentCourseLectures>);
// 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
//   });
// it('renders StudentCourseLectures 2', () => {
// 	render(<StudentCourseLectures lectures={[{id:1,date:new Date()}]} course={{}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]}></StudentCourseLectures>);
// 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
//   });
// it('renders TeacherCourseLectures', () => {
// 	render(<TeacherCourseLectures lectures={[]} course={{}} getListStudents={App.getListStudents}></TeacherCourseLectures>);
// 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
//   });
// it('renders TeacherCourseLectures 2', () => {
// 	render(<TeacherCourseLectures lectures={[{id:1,date:new Date()}]} course={{}} getListStudents={App.getListStudents}></TeacherCourseLectures>);
// 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
//   });
it('renders CourseLectures' ,() => {
	//lectures, course, bookLecture, deleteBookedLecture,bookedLectures, role_id, getListStudents
	render(<CourseLectures lectures={[{id:1,date:new Date()}]} course={{description:""}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]} getListStudents={App.getListStudents} role_id={4}></CourseLectures>);
 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
})
it('renders CourseLectures 2' ,() => {
	//lectures, course, bookLecture, deleteBookedLecture,bookedLectures, role_id, getListStudents
	render(<CourseLectures lectures={[{id:1,date:new Date()}]} course={{description:""}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]} getListStudents={App.getListStudents} role_id={5}></CourseLectures>);
 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
})
it('renders ListCourses', () => {
	render(<ListCourses courses={[]} showLectures={App.showLectures} role_id={5}></ListCourses>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
it('renders ListCourses 2', () => {
	render(<ListCourses courses={[{id: 1,subjectID:1,description: "andale andale andale"}]} showLectures={App.showLectures} role_id={5}></ListCourses>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
it('renders HomeCalendar', () => {
	render(<HomeCalendar isMyCalendar={true} userId={3} isStudent={true}></HomeCalendar>);
	expect(screen.getByText('My bookings calendar')).toBeInTheDocument();
  });
it('renders HomeCalendar 2', () => {
	render(<HomeCalendar userId={2} isStudent={true}></HomeCalendar>);
	expect(screen.getByText('All Day')).toBeInTheDocument();
  });
it('renders HomeCalendar 3', () => {
	render(<HomeCalendar isMyCalendar={true} userId={4} isStudent={false}></HomeCalendar>);
	expect(screen.getByText('My bookings calendar')).toBeInTheDocument();
  });
it('renders Header', () => {
	render(<Header userLogout={App.userLogout} logged={true}></Header>);
	expect(screen.getByText('Logout')).toBeInTheDocument();
  });
it('renders Header 2', () => {
	render(<Header userLogout={App.userLogout} logged={false}></Header>);
	expect(screen.getByText('Learning Platform')).toBeInTheDocument();
  });
it('renders Aside logged true', () => {
	render(<Router><Aside className="LeftBar"
	//image={image}
	collapsed={false}
	rtl={false}
	toggled={false}
	handleToggleSidebar={false}
	style={{height:'100%'}}
	userLogout={App.userLogout} 
	role_id={4} 
	logged = {true}
  /> </Router>);
	expect(screen.getByText('View Source')).toBeInTheDocument();
  });
it('renders Aside logged false', () => {
	render(<Router><Aside className="LeftBar"
	collapsed={false}
	rtl={false}
	toggled={false}
	handleToggleSidebar={false}
	style={{height:'100%'}}
	userLogout={App.userLogout} 
	role_id={4} 
	logged = {false}
  /> </Router>);
	expect(screen.getByText('View Source')).toBeInTheDocument();
  });
it('renders App', () => {
	render(<React.StrictMode>
		 		<Router>
		 		<App />
		 		</Router>
		 		</React.StrictMode>);
	expect(screen.getByText("Don't share your password with anyone")).toBeInTheDocument();
  });
  
it('full app rendering/navigating', () => {
	const history = createMemoryHistory()
	render(
	  <Router2 history={history}>
		<Login userLogin={API.userLogin} loginError={false}/>
	  </Router2>
	)
	// verify page content for expected route
	// often you'd use a data-testid or role query, but this is also possible
	expect((screen.queryAllByText('LOGIN'))[1]).toBeInTheDocument()
	userEvent.type((screen.queryByPlaceholderText("Insert your username")),"s202022@studenti.polito.it");
	userEvent.type((screen.queryByPlaceholderText("Password")),"123");
  
	userEvent.click((screen.queryAllByText('LOGIN'))[1])
  
  
	// check that the content changed to the new page
  })
  it('Aside 2', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Aside className="LeftBar"
                      //image={image}
                      collapsed={false}
                      rtl={false}
                      toggled={false}
                      handleToggleSidebar={false}
                      style={{height:'100%'}}
                      userLogout={false} 
                      role_id={5} 
                      logged = {true}
                    /> 
      </Router>
    )
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect((screen.queryAllByText('LEARNING PLATFORM'))[0]).toBeInTheDocument()
    
  
  
  })
//functions APP: userLogin(username, password), userLogout(), showStudentsLectures(course),
// 	showTeachersLectures(course), getStudentsList(), loadInitialDataStudent(), loadInitialDataTeacher(),
//	bookLecture(LectureID), deleteBookedLecture(LectureID), 

// it('renders Api.getStudentCourses', () => {
// 	Api.getStudentCourses(3).then((x)=>{
// 		expect(x).not.toBeNull();
// 	})
//   });