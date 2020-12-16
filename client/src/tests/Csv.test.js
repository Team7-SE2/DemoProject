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


it('renders StudentListProva', () => {
    //expect(true).not.toBeNull();
  function uploadFile2(file, type){
  	//return 1;
  }
  render(<UploadLists uploadFile={uploadFile2} ></UploadLists>);
  expect(screen.getByText('UPLOAD STUDENT LIST')).toBeInTheDocument();

  var file= new File(["Id,Name,Surname,City,OfficialEmail,Birthday,SSN\n1,Ambra,Ferri,Poggio Ferro,s1@students.politu.it,1991-11-04,MK97060783\n2,Gianfranco,Trentini,Fenestrelle,s2@students.politu.it,1991-11-05,SP80523410"],'Students.csv',{type: 'text/csv'});
  userEvent.click((screen.getAllByText("Send File")[0]));

  var x=document.getElementById("StudentList");
  userEvent.upload(x, file);
  userEvent.click((screen.getAllByText("Send File")[0]));

});






  
  it('renders TEACHER List', () => {
	function uploadFile(file, type){
		//return 1;
	}
	
	render(<UploadLists uploadFile={uploadFile} ></UploadLists>);
	expect(screen.getByText('UPLOAD TEACHER LIST')).toBeInTheDocument();
	//var file =require("../tests/csv_files/Professors.csv")

	var file= new File(["Number,GivenName,Surname,OfficialEmail,SSN\nd1,Ines,Beneventi,Ines.Beneventi@politu.it,XT6141393\nd2,Nino,Lucciano,Nino.Lucciano@politu.it,BC32576022"],'Professors.csv',{type: 'text/csv'})
	userEvent.click((screen.getAllByText("Send File")[2]));

	var x=document.getElementById("TheachersList");
	userEvent.upload(x, file);
	userEvent.click((screen.getAllByText("Send File")[2]));

	

  });

  

  it('renders COURSEList', () => {
	function uploadFile(file){
		return 1;
	}
	

	render(<UploadLists uploadFile={uploadFile} ></UploadLists>);
	expect(screen.getByText('UPLOAD COURSE LIST')).toBeInTheDocument();
	//var file =require("../tests/csv_files/Courses.csv")

	var file= new File(["Code,Year,Semester,Course,Teacher\nAAAA11,1,1,Metodi di finanziamento delle imprese,d1\nAAAA22,1,1,Chimica,d2"],'Courses.csv',{type: 'text/csv'});
	userEvent.click((screen.getAllByText("Send File")[1]));

	var x=document.getElementById("CourseList");
	userEvent.upload(x, file);
	userEvent.click((screen.getAllByText("Send File")[1]));

	

  });

  it('renders SCHEDULE List', () => {
	function uploadFile(file){
		return 1;
	}

	
	render(<UploadLists uploadFile={uploadFile} ></UploadLists>);
	expect(screen.getByText('UPLOAD SCHEDULE LIST')).toBeInTheDocument();
	//var file =require("../tests/csv_files/Schedule1s.csv")

	var file= new File(["Code,Room,Day,Seats,Time\nAAAA11,1,Mon,120,8:30-11:30"],'Schedule.csv',{type: 'text/csv'});
	userEvent.click((screen.getAllByText("Send File")[3]));

	var x=document.getElementById("LecturesList");
	userEvent.upload(x, file);
	userEvent.click((screen.getAllByText("Send File")[3]));


  });

  

  it('renders ENROLLMENT List', () => {
	function uploadFile(file){
		return 1;
	}

	render(<UploadLists uploadFile={uploadFile} ></UploadLists>);
	expect(screen.getByText('UPLOAD ENROLLMENT LIST')).toBeInTheDocument();
	//var file =require("../tests/csv_files/Enrollment.csv")

	var file= new File(["Code,Student\nAAAA11,1\nAAAA11,2"],'Enrollment.csv',{type: 'text/csv'});
	userEvent.click((screen.getAllByText("Send File")[4]));

	var x=document.getElementById("ClassesList");
	userEvent.upload(x, file);
	userEvent.click((screen.getAllByText("Send File")[4]));

  });

   it('renders ContactTracingReport List', () => {
	

	render(<ContactTracingReport></ContactTracingReport>);
	expect(screen.getByText("Please insert student's identification number which contracted Covid-19")).toBeInTheDocument();
	
	userEvent.type(screen.getByPlaceholderText("Student id"),"900001");
	userEvent.click((screen.getByText("Generate report")));
	
	expect(screen.getByText("Student ID is not correct! Please retry with another student ID")).toBeInTheDocument();
	

	

  });


