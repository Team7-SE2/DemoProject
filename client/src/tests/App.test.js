import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import {BrowserRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
//import StudentCourseLectures from '../components/StudentCourseLectures.js'
import StudentList from '../components/StudentList';
import StudentCourseLectures from '../components/StudentCourseLectures';
import TeacherCourseLectures from '../components/TeacherCourseLectures';
import ListCourses from '../components/ListCourses';
import HomeCalendar from '../components/HomeCalendar';
import Api from '../api/api'
// it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
// });
// test('renders learn react link', () => {
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
// });
// it('renders without crashing', ()=> {
// 	const div= document.createElement('div');
// 	  ReactDOM.render( <React.StrictMode>
// 		<Router>
// 		<App />
// 		</Router>
// 		</React.StrictMode>,div);
// })
it('renders StudentList', () => {
	render(<StudentList students={[{user:{userID:"AA",name:"AA",surname:"AA"}}]} lecture={{}}></StudentList>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
it('renders StudentCourseLectures', () => {
	render(<StudentCourseLectures lectures={[]} course={{}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]}></StudentCourseLectures>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
it('renders StudentCourseLectures 2', () => {
	render(<StudentCourseLectures lectures={[{id:1,date:new Date()}]} course={{}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]}></StudentCourseLectures>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
it('renders TeacherCourseLectures', () => {
	render(<TeacherCourseLectures lectures={[]} course={{}} getListStudents={App.getListStudents}></TeacherCourseLectures>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
it('renders TeacherCourseLectures 2', () => {
	render(<TeacherCourseLectures lectures={[{id:1,date:new Date()}]} course={{}} getListStudents={App.getListStudents}></TeacherCourseLectures>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });
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
	render(<HomeCalendar userId={3} isStudent={true}></HomeCalendar>);
	expect(screen.getByText('All Day')).toBeInTheDocument();
  });
it('renders HomeCalendar 3', () => {
	render(<HomeCalendar isMyCalendar={true} userId={3} isStudent={false}></HomeCalendar>);
	expect(screen.getByText('My bookings calendar')).toBeInTheDocument();
  });
// it('renders Api.getStudentCourses', () => {
// 	Api.getStudentCourses(3).then((x)=>{
// 		expect(x).not.toBeNull();
// 	})
//   });
// it('renders App', () => {
// 	render(<React.StrictMode>
// 		 		<Router>
// 		 		<App />
// 		 		</Router>
// 		 		</React.StrictMode>);
// 	expect(screen.getByText("Don't share your password with anyone")).toBeInTheDocument();
//   });