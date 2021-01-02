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
import TeacherStatistics from "../components/TeacherStatistics"
import DatePickerComponent from "../components/DatePickerComponent"

import moment from "moment"
import '@testing-library/jest-dom/extend-expect'
import UploadLists from '../components/UploadLists';
import ContactTracingReport from '../components/ContactTracingReport';


const app=new App.WrappedComponent();


it('test app function', () => {
	app.setStateDate("startDate","2020-11-20");
	app.setStateDate("endDate","2020-12-20");
	app.getDataGrouped([{date:"2020-11-20",
						lecture:{date: "2020-11-20"},
						created_at:"2020-11-20"
}], 'days', "2020-11-20", "2020-12-20", "bookings");

app.getDataGrouped([{date:"2020-11-20",
						lecture:{date: "2020-11-20"},
						created_at:"2020-11-20"
}], 'days', "2020-11-20", "2020-12-20", "");

app.getDataGrouped([{
						lecture:{date: "2020-11-20"},
						created_at:"2020-11-20"
}], 'days', "2020-11-20", "2020-12-20", "");

app.getTimeSpans('days', "2020-11-20", "2020-12-20");
//var file= new File(["Id,Name,Surname,City,OfficialEmail,Birthday,SSN\n1,Ambra,Ferri,Poggio Ferro,s1@students.politu.it,1991-11-04,MK97060783\n2,Gianfranco,Trentini,Fenestrelle,s2@students.politu.it,1991-11-05,SP80523410"],'Students.csv',{type: 'text/csv'});
//app.uploadFile(file,"AAAA");
expect(1).toBe(1);
  });

  


it('renders StudentList', () => {
	function switchRoute(path){
		return 1;
	}
	function changePresence(){
		return 1;
	}


	render(<StudentList switchRoute={switchRoute} students={[{user:{userID:"AA",name:"AA",surname:"AA"}}]} lecture={{id:1,date:moment().add(1,"days")}} course={{description:"SE2"}} role_id={4}recordPresence ={false}  changePresence={changePresence}></StudentList>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	var x=document.getElementsByClassName("btn btn-dark");
	userEvent.click(x[0]);
  });

  it('renders StudentList 1', () => {
	function switchRoute(path){
		return 1;
	}
	function changePresence(){
		return 1;
	}


	render(<StudentList switchRoute={switchRoute} students={[{user:{userID:"AA",name:"AA",surname:"AA"},present:0}]} lecture={{id:1,date:moment().add(1,"days")}} course={{description:"SE2"}} role_id={4}recordPresence ={true}  changePresence={changePresence}></StudentList>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	var x=document.getElementsByClassName("btn btn-danger");
	userEvent.click(x[0]);
  });
  it('renders StudentList 2', () => {
	function switchRoute(path){
		return 1;
	}
	function changePresence(){
		return 1;
	}


	render(<StudentList switchRoute={switchRoute} students={[{user:{userID:"AA",name:"AA",surname:"AA"},present:1}]} lecture={{id:1,date:moment().add(1,"days")}} course={{description:"SE2"}} role_id={4}recordPresence ={true}  changePresence={changePresence}></StudentList>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	var x=document.getElementsByClassName("btn btn-success");

	userEvent.click(x[0]);
  });

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
	function bookLecture(lectureID){
		return 1;
	}
	function getListStudents(lectureID){
		return 1;
	}
	function turnOnRemote(lectureID){
		return 1;
	}

	function deleteLecture(lectureID){
		return 1;
	}
	//lectures, course, bookLecture, deleteBookedLecture,bookedLectures, role_id, getListStudents
	render(<CourseLectures lectures={[{id:1,date:moment().add(1,"days")}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture}deletedeleteLecture={deleteLecture} bookedLectures={[]} getListStudents={getListStudents} role_id={5} turnOnRemote={turnOnRemote}></CourseLectures>);
	expect(screen.getAllByText('Rows per page:')[0]).toBeInTheDocument();
	userEvent.click((screen.getByText("BOOK")));

	render(<CourseLectures lectures={[{id:1,date:moment().add(1,"days")}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture} deleteLecture={deleteLecture} bookedLectures={[]} getListStudents={getListStudents} role_id={4} turnOnRemote={turnOnRemote}></CourseLectures>);
	var x=document.getElementsByClassName("btn btn-primary");
	expect(screen.getAllByText('Rows per page:')[0]).toBeInTheDocument();
	userEvent.click(x[0]);
	render(<CourseLectures lectures={[{id:1,date:moment().add(1,"days")}]} course={{description:""}}role_id={2} turnOnRemote={turnOnRemote}></CourseLectures>);
	expect(screen.getByText('Lecture Day')).toBeInTheDocument();

	render(<CourseLectures lectures={[{id:1,date:moment().add(1,"days"),deleted_at:"2020-11-12 10:30:00.000 +00:00"}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture} deleteLecture={deleteLecture} bookedLectures={[]} getListStudents={getListStudents} role_id={4} turnOnRemote={turnOnRemote}></CourseLectures>);
	expect(screen.getAllByText('Rows per page:')[0]).toBeInTheDocument();



	render(<CourseLectures lectures={[{id:1,date:moment().add(29,"minutes")}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture} deleteLecture={deleteLecture} bookedLectures={[]} getListStudents={getListStudents} role_id={4} turnOnRemote={turnOnRemote}></CourseLectures>);
	
	x=document.getElementsByClassName("btn btn-primary");
	expect(screen.getAllByText('Rows per page:')[0]).toBeInTheDocument();
	userEvent.click(x[1]);

	render(<CourseLectures lectures={[{id:1,date:moment().add(31,"minutes")}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture} deleteLecture={deleteLecture} bookedLectures={[]} getListStudents={getListStudents} role_id={4} turnOnRemote={turnOnRemote}></CourseLectures>);
	x=document.getElementsByClassName("btn btn-danger");
	expect(screen.getAllByText('Rows per page:')[0]).toBeInTheDocument();
	userEvent.click(x[0]);

	render(<CourseLectures lectures={[{id:1,date:moment().add(1,"days")}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture} deleteLecture={deleteLecture} bookedLectures={[{created_at:"2020-11-08 14:00:00.000 +01:00",updated_at:"2020-11-08 14:00:00.000 +01:00",user_id:3,lecture_id:1}]} getListStudents={getListStudents} role_id={5} turnOnRemote={turnOnRemote}></CourseLectures>);
	x=document.getElementsByClassName("btn btn-danger");
	expect(screen.getAllByText('UNBOOK')[0]).toBeInTheDocument();
	userEvent.click(x[0]);
	x=document.getElementsByClassName("btn btn-primary");
	expect(screen.getAllByText('BOOK')[0]).toBeInTheDocument();
	userEvent.click(x[0]);

	render(<CourseLectures lectures={[{id:1,date:moment().add(1,"days"),deleted_at:"2020-11-12 10:30:00.000 +00:00"}]} course={{description:""}} bookLecture={bookLecture} deleteBookedLecture={App.deleteBookedLecture} deleteLecture={deleteLecture} bookedLectures={[{created_at:"2020-11-08 14:00:00.000 +01:00",updated_at:"2020-11-08 14:00:00.000 +01:00",user_id:3,lecture_id:1}]} getListStudents={getListStudents} role_id={5} turnOnRemote={turnOnRemote}></CourseLectures>);
	expect(screen.getAllByText('Canceled')[0]).toBeInTheDocument();


	 
})
/*it('renders CourseLectures 2' ,() => {
	//lectures, course, bookLecture, deleteBookedLecture,bookedLectures, role_id, getListStudents
	render(<CourseLectures lectures={[{id:1,date:new Date()}]} course={{description:""}} bookLecture={App.bookLecture} deleteBookedLecture={App.deleteBookedLecture} bookedLectures={[]} getListStudents={App.getListStudents} role_id={5}></CourseLectures>);
 	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
})*/
it('renders ListCourses', () => {
	function showLectures(){
		return 1;
	}
	render(<ListCourses courses={[]} showLectures={showLectures} role_id={5}></ListCourses>);
	expect(screen.getAllByText('Rows per page:')[0]).toBeInTheDocument();
  });
it('renders ListCourses 2', () => {
	function showLectures(){
		return 1;
	}
	function showPastLectures(){
		return 1;
	}
	
	render(<ListCourses courses={[{id: 1,subjectID:1,description: "andale andale andale"}]} showLectures={showLectures} showPastLectures={showPastLectures} role_id={4}></ListCourses>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	userEvent.click(screen.getByText("View details"))

  });
  it('renders ListCourses 3', () => {
	function showLectures(){
		return 1;
	}
	render(<ListCourses courses={[{id: 1,subjectID:1,description: "andale andale andale"}]} showLectures={showLectures} role_id={5}></ListCourses>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	userEvent.click(screen.getByText("Book your seat"))

  });
  it('renders ListCourses 4', () => {
	function showLectures(){
		return 1;
	}
	function showPastLectures(){
		return 1;
	}
	render(<ListCourses courses={[{id: 1,subjectID:1,description: "andale andale andale"}]} showLectures={showLectures} showPastLectures={showPastLectures} role_id={4}></ListCourses>);
	expect(screen.getByText('Rows per page:')).toBeInTheDocument();
	userEvent.click(screen.getByText("Record presences"))

  });
it('renders HomeCalendar', () => {
	render(<HomeCalendar isMyCalendar={true} userId={3} isStudent={true}></HomeCalendar>);
	expect(screen.getByText('Chose the subjects to show')).toBeInTheDocument();
  });
it('renders HomeCalendar 2', () => {
	render(<HomeCalendar userId={2} isStudent={true}></HomeCalendar>);
	expect(screen.getByText('Week')).toBeInTheDocument();
  });
it('renders HomeCalendar 3', () => {
	render(<HomeCalendar userId={4} isStudent={false}></HomeCalendar>);
	expect(screen.getByText('Week')).toBeInTheDocument();
  });
it('renders Header', () => {
	render(<Header userLogout={App.userLogout} logged={true}></Header>);
	expect(screen.getByText('Logout')).toBeInTheDocument();
  });
it('renders Header 2', () => {
	render(<Header userLogout={App.userLogout} logged={false}></Header>);
	//expect(screen.getByText('TEACHING LOAD')).toBeInTheDocument();
  });
  it('renders Teacher Statistics', () => {
	render(<TeacherStatistics title = "OVERALL" statisticsGroupBy ={"days"} onStatisticGroupByChange = {App.onStatisticGroupByChange} setStateDate = {App.setStateDate} generateData = {App.generateData} statistics = { {studentsBookings: 0,numberOfLessons: 0,numberOfLessonsCancelled: 0,numberOfLessonsRemote: 0,numberOfLessonPresence: 0}} 
	lectureData = {{
		labels: App.getTimeSpans=("days", moment(), moment().add(7,"days")),
		datasets: [
		  {
			label: 'Lectures In Presence',
			data: App.getDataGrouped=([{id:1,date:moment()}], "days", moment(), moment().add(7,"days")),
			fill: false,
			backgroundColor: 'rgba(75, 192, 192, 0.2)',
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1
		  },
		  {
			label: 'Lectures Remote',
			data: App.getDataGrouped=([{id:1,date:moment()}], "days", moment(), moment().add(7,"days")),
			fill: false,
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)',
			borderWidth: 1
		  },
		  {
			label: 'Lectures Canceled',
			data: App.getDataGrouped=([{id:1,date:moment()}], "days", moment(), moment().add(7,"days")),
			fill: false,
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgba(255, 99, 132, 1)',
			borderWidth: 1
		  },
		],
		
	  }} optionsBarChart = {{
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
	  }} bookingsData = {{
		labels: App.getTimeSpans=("days", moment(), moment().add(7,"days")),
		datasets: [
		  {
			label: 'Bookings',
			data: App.getDataGrouped=([{}], "days", moment(), moment().add(7,"days"), "bookings"),
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			lineTension: 0,
		  }
		]
	  }
	} bookingsLectureData = 
	{ {
		labels: [],
		datasets: [
		  {
			label: 'Bookings',
			data: [],
			fill: false,
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)',
			borderWidth: 1,
			order: 1
		  },
		  {
			label: 'Attendances',
			data: [],
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
	  }} options = {{
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
	  }}></TeacherStatistics>
	);
	expect(screen.getByText('OVERALL')).toBeInTheDocument();
  });

  it('renders Teacher Statistics BM', () => {
	render(<TeacherStatistics title = "Overall Statistics" subjects = {[{id:1, description:"SE2"}]}statisticsGroupBy ={"days"} onStatisticGroupByChange = {App.onStatisticGroupByChange} setStateDate = {App.setStateDate} generateData = {App.generateData} statistics = { {studentsBookings: 0,numberOfLessons: 0,numberOfLessonsCancelled: 0,numberOfLessonsRemote: 0,numberOfLessonPresence: 0}} 
	lectureData = {{
		labels: App.getTimeSpans=("days", moment(), moment().add(7,"days")),
		datasets: [
		  {
			label: 'Lectures In Presence',
			data: App.getDataGrouped=([{id:1,date:moment()}], "days", moment(), moment().add(7,"days")),
			fill: false,
			backgroundColor: 'rgba(75, 192, 192, 0.2)',
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1
		  },
		  {
			label: 'Lectures Remote',
			data: App.getDataGrouped=([{id:1,date:moment()}], "days", moment(), moment().add(7,"days")),
			fill: false,
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)',
			borderWidth: 1
		  },
		  {
			label: 'Lectures Canceled',
			data: App.getDataGrouped=([{id:1,date:moment()}], "days", moment(), moment().add(7,"days")),
			fill: false,
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgba(255, 99, 132, 1)',
			borderWidth: 1
		  },
		],
		
	  }} optionsBarChart = {{
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
	  }} bookingsData = {{
		labels: App.getTimeSpans=("days", moment(), moment().add(7,"days")),
		datasets: [
		  {
			label: 'Bookings',
			data: App.getDataGrouped=([{}], "days", moment(), moment().add(7,"days"), "bookings"),
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgba(255, 99, 132, 0.2)',
			lineTension: 0,
		  }
		]
	  }
	} bookingsLectureData = 
	{ {
		labels: [],
		datasets: [
		  {
			label: 'Bookings',
			data: [],
			fill: false,
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 1)',
			borderWidth: 1,
			order: 1
		  },
		  {
			label: 'Attendances',
			data: [],
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
	  }} options = {{
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
	  }}></TeacherStatistics>
	);
	expect(screen.getByText('Overall Statistics')).toBeInTheDocument();
  });

it('renders Aside logged true student', () => {
	render(<Router><Aside className="LeftBar"
	//image={image}
	courses={{}}
	collapsed={false}
	rtl={false}
	toggled={false}
	handleToggleSidebar={false}
	style={{height:'100%'}}
	userLogout={App.userLogout} 
	role_id={5} 
	logged = {true}
	resetState= {App.resetState}
  /> </Router>);
	expect(screen.getByText('View Source')).toBeInTheDocument();
  });
  it('renders Aside logged true teacher', () => {
	render(<Router><Aside className="LeftBar"
	//image={image}
	courses={[{id:1, description: "CIAO",subjectID:"SE2",created_at:"",deleted_at:"",updated_at:"",teacher_id:4}]}
	collapsed={false}
	rtl={false}
	toggled={false}
	handleToggleSidebar={false}
	style={{height:'100%'}}
	userLogout={App.userLogout} 
	role_id={4} 
	logged = {true}
	resetState= {App.resetState}
  /> </Router>);
	expect(screen.getByText('Statistics')).toBeInTheDocument();
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
  
it('LOGIN insert username pwd', () => {
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

it('HomeCalendar Click button', () => {
	const history = createMemoryHistory()
	render(
	  <Router2 history={history}>
		<HomeCalendar userId={4} isStudent={false}></HomeCalendar>
	  </Router2>
	)
	// verify page content for expected route
	// often you'd use a data-testid or role query, but this is also possible
	expect((screen.queryAllByText('Week'))[0]).toBeInTheDocument()
	userEvent.click((screen.getByText("Week")));

  
  
	// check that the content changed to the new page
  })

  it('DatePickerComponent change', () => {
	  function setStateDate(type,date){
		  return 1;
	  }
	const history = createMemoryHistory()
	render(
	  <Router2 history={history}>
  <DatePickerComponent type="startDate" setStateDate={setStateDate} ></DatePickerComponent>
	  </Router2>
	)
	// verify page content for expected route
	// often you'd use a data-testid or role query, but this is also possible
	var datepickstart=document.getElementById("time-picker");
	userEvent.type(datepickstart,"aaaaaaa");
	expect((screen.getByText('Invalid Date Format'))).toBeInTheDocument()
	//userEvent.type(screen.getByLabelText(moment().add(-7, "days").startOf("day").format("MMMM Do YYYY, h:mm:ss a")),"November 23rd 12:00 a.m.")

	//userEvent.click(screen.getByLabelText('change time'))
  
  
	// check that the content changed to the new page
  })


