import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { indigo, amber, blue, teal, red, green, orange, purple, blueGrey, common } from '@material-ui/core/colors';
import {
  Scheduler, Appointments, MonthView, WeekView, Toolbar,
  ViewSwitcher,Resources, AppointmentTooltip, DragDropProvider,
  EditRecurrenceMenu, AllDayPanel, DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { AuthContext } from '../auth/AuthContext'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import API from '../api/api.js';
import {Redirect} from 'react-router-dom';
import "../Calendar.css";
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

let resources = [];
const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

const colors = [teal[300], orange[300], red[300], blue[300], green[300], indigo[300], blueGrey[300], purple[300], amber[300], common[300]]
let courseInstances = []
let teacherInstances = []
let roomInstances = []
let selectedChecks = [];
let instances = [];


/* eslint-disable-next-line react/no-multi-comp */
class HomeCalendar extends React.PureComponent {
  constructor(props) {

    super(props);
    this.state = {
      data: [],
      userID: props.userId,
      currentDate: today,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 8,
      endDayHour: 19,
      isNewAppointment: false,
      isMyCalendar: props.isMyCalendar
    };
    instances = [];
    courseInstances = []
    teacherInstances = []
    roomInstances = []
    selectedChecks = [];

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);

    if (props.isStudent) {
      if (props.isMyCalendar)
        this.studentMyCalendar(props.userId);

      else
        this.studentCalendar(props.userId);
    } else {
      this.teacherCalendar(props.userId);
    }

  }
  handleChange = (event) => {
    var newData = [];
    var id = parseInt(event.target.id)

    var index = selectedChecks.findIndex(x => x === id)

    if (index === -1) {
      selectedChecks.push(id)
    }
    else
      selectedChecks.splice(index, 1)

    newData = this.state.data2.filter((d) => selectedChecks.includes(d.courseId))
    console.log(newData)
    this.setState({
      data: newData
    });
  }

  checkBoxMount() {
    return courseInstances.map((instance) => {
      return <FormControlLabel
        control={<Checkbox id={instance.id} style={{ color: instance.color }} defaultChecked={true} /*checked={true} */ onChange={this.handleChange} />}
        label={instance.description}
      />
    })

  }

  componentDidMount() {

  }

  studentMyCalendar = (userID) => {

        API.getStudentBookingsexcludeLecturesCanceled(userID)
          .then((books) => {

            courseInstances = []
            teacherInstances = []
            roomInstances = []
            selectedChecks = [];
            resources = [
              {
                fieldName: 'courseId',
                instances: courseInstances
              },{
                fieldName: 'roomId',
                title: 'Location',
                instances: roomInstances
              },
              {
                fieldName: 'teacherId',
                title: 'Teacher',
                instances: teacherInstances
              }
            ];
            
            books.forEach((b) => {

              // check Lecture Color
              var lectureIndex = courseInstances.findIndex(x => parseInt(x.id) === parseInt(b.courseId))
              if (lectureIndex === -1) {
                courseInstances.push({
                  id: parseInt(b.courseId),
                  description: b.title,
                  color: colors[parseInt(b.courseId)]
                })
                selectedChecks.push(parseInt(b.courseId))
              }
              
              // check Room color
              var roomIndex = roomInstances.findIndex(x => parseInt(x.id) === parseInt(b.roomId))
              if (roomIndex === -1) {
                roomInstances.push({
                  id: parseInt(b.roomId),
                  text: b.room,
                })
              }
              
              // check Teacher Color
              var teacherIndex = teacherInstances.findIndex(x => parseInt(x.id) === parseInt(b.teacherId))
              if(teacherIndex === -1){
                teacherInstances.push({
                  id: parseInt(b.teacherId),
                  text: b.teacher
                })
              }

            })
            console.log(courseInstances)
            this.setState({ data: books, data2: books })
          })
          .catch((err) => {
            console.log(err);
          })

  }

checkLectureColorTD = (courseInstances, b) => {
  var lectureIndex = courseInstances.findIndex(x => parseInt(x.id) === parseInt(b.courseId))
              if (lectureIndex === -1) {
                courseInstances.push({
                  id: parseInt(b.courseId),
                  description: b.title,
                  text: b.title,
                  color: colors[parseInt(b.courseId)]
                })
              }
}

  studentCalendar = (userID) => {

        API.getLectures(userID)
          .then((books) => {
            
            courseInstances = []
            teacherInstances = []
            roomInstances = []
            selectedChecks = [];
            resources = [
              {
                fieldName: 'courseId',
                instances: courseInstances
              },{
                fieldName: 'roomId',
                title: 'Location',
                instances: roomInstances
              },
              {
                fieldName: 'teacherId',
                title: 'Teacher',
                instances: teacherInstances
              }
            ];

            books.forEach((b) => {

              // check Lecture color
              this.checkLectureColorTD(courseInstances,b);
              
              // check Room color
              var roomIndex = roomInstances.findIndex(x => parseInt(x.id) === parseInt(b.roomId))
              if (roomIndex === -1) {
                roomInstances.push({
                  id: parseInt(b.roomId),
                  text: b.room,
                })
              }
              
              // check Teacher Color
              var teacherIndex = teacherInstances.findIndex(x => parseInt(x.id) === parseInt(b.teacherId))
              if(teacherIndex === -1){
                teacherInstances.push({
                  id: parseInt(b.teacherId),
                  text: b.teacher
                })
              }

            })
            
            this.setState({ data: books, data2: books })
          })
          .catch((err) => {
            console.log(err);
          })
      //})

  }

  teacherCalendar = (userID) => {

    API.getTeacherSubjects(userID)
      .then((courses) => {
        resources = [{
          fieldName: 'location',
          title: 'Location',
          instances: instances
        }];
        console.log(courses)
        API.getTeacherLectures(userID)
          .then((books) => {
            
            courseInstances = []
            teacherInstances = []
            roomInstances = []
            selectedChecks = [];
            resources = [
              {
                fieldName: 'courseId',
                instances: courseInstances
              },{
                fieldName: 'roomId',
                title: 'Location',
                instances: roomInstances
              }
            ];

            console.log(books)
            books.forEach((b) => {

              // check Lecture color
              var lectureIndex = courseInstances.findIndex(x => parseInt(x.id) === parseInt(b.courseId))
              if (lectureIndex === -1) {
                courseInstances.push({
                  id: parseInt(b.courseId),
                  description: b.title,
                  text: b.title,
                  color: colors[parseInt(b.courseId)]
                })
              }

              // check Room color
              var roomIndex = roomInstances.findIndex(x => parseInt(x.id) === parseInt(b.roomId))
              if (roomIndex === -1) {
                roomInstances.push({
                  id: parseInt(b.roomId),
                  text: b.room,
                })
              }

            })
            this.setState({ data: books, data2: books })
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })

  }
  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  currentDateChange = (currentDate) => {
    this.setState({ currentDate });
  };

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      startDayHour,
      endDayHour,
    } = this.state;
   
    return (
      <AuthContext.Consumer>
        {(context) => (

          <>
            {context.authErr && <Redirect to="/login"></Redirect>}
            {this.state.isMyCalendar ? <Paper style={{
              paddingLeft: '2%',
              paddingTop: '2%',
              paddingBottom: '2%',
              marginBottom: '2%'
            }}>
              <h5><b>Chose the subjects to show</b></h5>
              <FormGroup style={{ "width": "100%" }} row>
                {this.checkBoxMount()}
              </FormGroup></Paper> : <></>
            }

            <Paper>
              <Scheduler
                data={data}
                height={660}
              >

                <ViewState
                  currentDate={currentDate}
                  onCurrentDateChange={this.currentDateChange}
                />
                <EditingState
                  onCommitChanges={this.commitChanges}
                //onEditingAppointmentChange={this.onEditingAppointmentChange}
                //onAddedAppointmentChange={this.onAddedAppointmentChange}
                />
                <WeekView
                  startDayHour={startDayHour}
                  endDayHour={endDayHour}
                />
                <MonthView />
                <AllDayPanel />
                <EditRecurrenceMenu />
                <Appointments />

                <Resources
                  data={resources}
                  mainResourceName={'courseId'}
                />
                <AppointmentTooltip
                  //showOpenButton
                  showCloseButton
                //showDeleteButton
                />
                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />

                <DragDropProvider />
              </Scheduler>

              <Dialog
                open={confirmationVisible}
                onClose={this.cancelDelete}
              >
                <DialogActions>
                  <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                    Cancel
                    </Button>
                </DialogActions>
              </Dialog>


            </Paper>

          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(HomeCalendar);