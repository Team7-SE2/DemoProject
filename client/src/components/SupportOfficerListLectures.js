import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Button from "react-bootstrap/Button";
import moment from 'moment';
import { SortingState, PagingState, SearchState, FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, Toolbar, SearchPanel } from '@devexpress/dx-react-grid-material-ui';
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form";
import TimePickerComponent from './TimePickerComponent';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaCog } from 'react-icons/fa';
import API from '../api/api.js';
import Alert from 'react-bootstrap/Alert';

class SupportOfficerListLectures extends React.Component {

  constructor(props) {
    super(props);

    let finalScheduled = this.getScheduledLectures(props.lectures)
    
    this.state = {
      course_id: props.course_id,
      lectures: props.lectures,
      showLectures : props.showLectures,
      showLectureSchedule: props.showLectureSchedule,
      role_id: props.role_id,
      show: false,
      scheduledLectures: finalScheduled,
      test: [],
      columns: [
        { name: 'lectureDay', title: 'Lecture Day' },
        { name: 'beginHour', title: 'Begin Hour' },
        { name: 'endHour', title: 'End Hour' },
        { name: 'scheduledLectures', title: 'Scheduled Lectures' },
        { name: 'changeSchedule', title: 'Change Schedule' }
      ],
      pageSizes: [5, 10, 15, 0],
      dayOfWeek: '',
      newBeginHour: moment().format("HH:mm"),
      newDay: 'Monday',
      showSuccess:false
        
    };
  }
  
  confirm = (dayOfWeek, beginHour, beginDate, beginDuration, event) => {
    console.log(dayOfWeek, beginHour, beginDate, beginDuration)
    event.preventDefault();
    this.setState({showSuccess:false})
    this.showModal(dayOfWeek, beginHour, beginDate, beginDuration);
    
  }

  setNewBeginHour = (e) => {
    console.log(e)
      this.setState({
        newBeginHour: moment(e).format("HH:mm")
      })


  }

  setNewDay = (day) => {

    this.setState({newDay: day.target.value})

  }

  setNewDuration = (day) => {

    this.setState({newDuration: day.target.value})

  }
  
  getScheduledLectures = (lectures) => {
     
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ] 
    
    let scheduled = [];

    // prepare scheduledLectures
    for(let i = 0; i < lectures.length; i++){

      let lec = lectures[i];
      let index = moment(new Date(lec.date)).day();

      // find the lecture inside the array
      let arrayIndex = scheduled.findIndex(x => x.lectureDay === weekDays[index] && x.beginHour === moment(lec.date).format("HH:mm") && x.duration === lec.duration)

      if(arrayIndex >= 0)
        scheduled[arrayIndex].scheduledLectures ++;
      else{
        scheduled.push({
          date: lec.date,
          scheduledLectures : 1,
          lectureDay : weekDays[index],
          beginHour: moment(lec.date).format("HH:mm"),
          endHour: moment(lec.date).add(lec.duration, 'hours').format("HH:mm"),
          duration: lec.duration
        })
      }

    }
    let finalScheduled = scheduled.map((lec) => {
      return {
        lectureDate: lec.date,
        lectureDay: lec.lectureDay,
        beginHour: lec.beginHour,
        beginDuration: lec.duration,
        endHour: lec.endHour,
        scheduledLectures: lec.scheduledLectures,
        changeSchedule: <div style = {{textAlign : "center"}}> 
        
          <Button key={lec.lectureDay} variant="primary" onClick={(e) => this.confirm(lec.lectureDay, lec.beginHour, lec.date, lec.duration, e)} type="submit"><FaCog size={20}></FaCog></Button>
  
        </div>,
      }
  
    });
    return finalScheduled;
    
  }

  putCourseLectureSchedule = (subject_id, old_day, old_duration, new_day, new_hour, new_duration) => {

    API.putCourseLectureSchedule(subject_id, old_day, old_duration, new_day, new_hour, new_duration)
      .then(() => {
              
        API.getStudentCourseLectures(subject_id)
        .then((lecs) => {
          
          let lectures = lecs.filter((s) => moment(s.date).isAfter(moment()));
          
          let finalScheduled = this.getScheduledLectures(lectures)
          this.setState({
            scheduledLectures: finalScheduled,
            showSuccess: true
          });

        })
        .catch((err) => {
          this.handleErrors(err);
        });

      })
  }

  closeSuccess = () => {
    this.setState({showSuccess:false});
  }
  showModal = (dayOfWeek, beginHour, beginDate, beginDuration) => {
    this.setState({ show: true, dayOfWeek: dayOfWeek, beginHour: beginHour, beginDate: beginDate, beginDuration: beginDuration, newDay: dayOfWeek, newBeginHour: beginHour, newDuration: beginDuration });
  };

  confirmModal = () => {
    // send if the user has changed something
    if(this.state.dayOfWeek !== this.state.newDay || this.state.beginHour !== this.state.newBeginHour || this.state.beginDuration !== this.state.newDuration )
      this.putCourseLectureSchedule(this.state.course_id, this.state.dayOfWeek+" "+this.state.beginHour, this.state.beginDuration, this.state.newDay, this.state.newBeginHour, this.state.newDuration)
    this.setState({ show: false, name: '', surname: '', role_id: null});
  };

  hideModal = () => {
    this.setState({ show: false, name: '', surname: '', role_id: null});
  };

  render(){
    
    return (
      <>
      
      <Paper>
        <Grid
          rows={this.state.scheduledLectures}
          columns={this.state.columns}
        >
          <SearchState/>
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={5}
            //pageSize={10}
          />
          
          <IntegratedPaging />
          <Table />
          <TableHeaderRow/>
          <PagingPanel pageSizes={this.state.pageSizes}/>
        </Grid>
      </Paper>
      <br/>
      <Success showSuccess={this.state.showSuccess} closeSuccess={this.closeSuccess} course_id = {this.state.course_id} old_day={this.state.dayOfWeek} old_begin_hour = {this.state.beginHour} old_duration = {this.state.beginDuration} new_day={this.state.newDay} new_begin_hour = {this.state.newBeginHour} new_duration = {this.state.newDuration}/>

  
      <Modal show={this.state.show} handleClose={this.hideModal} backdrop="static" keyboard={false}  aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header >
              <Modal.Title>"{this.state.dayOfWeek}" lecture schedule </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={1}></Col>
              <Col sm={4}>

                <Form.Group controlId="exampleForm.StartDay">
                  <Form.Label className="titleStatisticsCard">NEW DAY OF WEEK: </Form.Label>
                    <Form.Control defaultValue={this.state.dayOfWeek} as="select" onChange={this.setNewDay} custom>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </Form.Control>
                </Form.Group>

              </Col>
              <Col sm={2}></Col>
              <Col sm={4}>

                <Form.Group controlId="exampleForm.StartDay">
                  <Form.Label className="titleStatisticsCard">NEW STARTING HOUR: </Form.Label>
                  <TimePickerComponent type="startDate" initialValue={this.state.beginDate} setStateDate={this.setNewBeginHour} ></TimePickerComponent>
                </Form.Group>

              </Col>
              <Col sm={1}></Col>
            </Row>
            <Row>
              <Col sm={3}></Col>
              <Col sm={6}>

                <Form.Group controlId="exampleForm.StartDay">
                  <Form.Label className="titleStatisticsCard">NEW LECTURE DURATION (h): </Form.Label>
                    <Form.Control defaultValue={this.state.beginDuration} as="select" onChange={this.setNewDuration} custom>
                      <option>1.5</option>
                      <option>3</option>
                    </Form.Control>
                </Form.Group>

              </Col>
              <Col sm={3}></Col>
            </Row>
              { /*(this.state.name && this.state.role_id ==5) ?
              <> Do you want to confirm that <b> {this.state.name} {this.state.surname} </b> (SSN : <b>{this.state.SSN}</b>)  contracted Covid-19? </>
              :
              <> Student ID is not correct! Please retry with another student ID </>*/
              }
          </Modal.Body>
          <Modal.Footer>
                <Button variant="success" onClick={() => {this.confirmModal();}} > Confirm </Button>
                <Button variant="danger" onClick={() => {this.hideModal();}} > Go Back </Button>
          </Modal.Footer>
      </Modal>
  
      </>
    );
  }
  
}
function Success(props) {

  let {showSuccess, closeSuccess, course_id, old_day, old_begin_hour, old_duration, new_day, new_begin_hour, new_duration} = props;

  if (showSuccess) {
      return (
          <Alert variant="success" onClose={() => closeSuccess()} dismissible>
              <Alert.Heading>New lecture scheduled applied for course {course_id}!</Alert.Heading>
              <p>
                  The old lecture schedule was: <br/>
                  <ul>
                  {old_day !== new_day ? <li>lecture old Day: {old_day}</li> : <></>}
                  {old_begin_hour !== new_begin_hour ? <li>lecture old Starting Hour: {old_begin_hour}</li> : <></>}
                  {old_duration !== new_duration ? <li>lecture old Duration: {old_duration}</li> : <></>}
                  
                  </ul>
        </p>
              <p>
                  The new lecture schedule is: <br/>
                  <ul>
                  {old_day !== new_day ? <li>lecture new Day: {new_day}</li> : <></>}
                  {old_begin_hour !== new_begin_hour ? <li>lecture new Starting Hour: {new_begin_hour}</li> : <></>}
                  {old_duration !== new_duration ? <li>lecture new Duration: {new_duration}</li> : <></>}
                  </ul>
        </p>
          </Alert>
      );
      
  }
return <> </>
}

export default SupportOfficerListLectures;