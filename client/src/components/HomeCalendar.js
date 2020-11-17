import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { indigo, blue, teal, red, green } from '@material-ui/core/colors';
import {
  Scheduler, Appointments, MonthView, WeekView, Toolbar,
  ViewSwitcher,Resources, AppointmentTooltip, DragDropProvider,
  EditRecurrenceMenu, AllDayPanel
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

const colors = [teal[300], red[300], green[300], blue[300], indigo[300]]
let instances = []
let selectedChecks = [];


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
    selectedChecks = [];

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);

    if (props.isStudent) {
      if (props.isMyCalendar)
        this.studentMyCalendar();

      else
        this.studentCalendar();
    } else {
      this.teacherCalendar();
    }

  }
  handleChange = (event) => {
    var newData = [];
    var id = parseInt(event.target.id)

    var index = selectedChecks.findIndex(x => x === id)

    if (index === -1) {
      selectedChecks.push(id)
    } else
      selectedChecks.splice(index, 1)

    newData = this.state.data2.filter((d) => selectedChecks.includes(d.location))
    console.log(newData)
    this.setState({
      data: newData
    });
  }

  checkBoxMount() {

    return instances.map((instance) => {
      return <FormControlLabel
        control={<Checkbox id={instance.id} style={{ color: instance.color }} defaultChecked={true} /*checked={true} */ onChange={this.handleChange} />}
        label={instance.description}
      />
    })

  }

  componentDidMount() {

  }

  studentMyCalendar = () => {

    API.getStudentCourses(this.state.userID)
      .then((courses) => {
        resources = [{
          fieldName: 'location',
          title: 'Location',
          instances: instances
        }];
        console.log(courses)
        API.getStudentBookings(this.state.userID)
          .then((books) => {
            books.forEach((b) => {

              var index = selectedChecks.findIndex(x => parseInt(x) === parseInt(b.location))
              if (index === -1) {
                var courseIndex = courses.findIndex(course => parseInt(course.id) === parseInt(b.location))
                instances.push({
                  id: parseInt(b.location),
                  description: courses[courseIndex].description,
                  color: colors[parseInt(b.location)]
                })
                selectedChecks.push(parseInt(b.location))
              }
            })
            this.setState({ data: books, data2: books })
          })
          .catch((err) => {
            console.log(err);
          })
      })

  }

  studentCalendar = () => {

    API.getStudentCourses(this.state.userID)
      .then((courses) => {
        resources = [{
          fieldName: 'location',
          title: 'Location',
          instances: instances
        }];

        console.log(courses)

        API.getLectures(this.state.userID)
          .then((books) => {
            books.forEach((b) => {
              console.log(b.location)
              var index = instances.findIndex(x => parseInt(x.id) === parseInt(b.location))
              if (index === -1) {
                var courseIndex = courses.findIndex(course => parseInt(course.id) === parseInt(b.location))
                instances.push({
                  id: parseInt(b.location),
                  description: courses[courseIndex].description,
                  color: colors[parseInt(b.location)]
                })
                //instances.push(parseInt(b.location))
              }

            })
            console.log(instances)
            this.setState({ data: books, data2: books })
          })
          .catch((err) => {
            console.log(err);
          })
      })

  }

  teacherCalendar = () => {

    API.getTeacherSubjects(this.state.userID)
      .then((courses) => {
        resources = [{
          fieldName: 'location',
          title: 'Location',
          instances: instances
        }];
        console.log(courses)
        API.getTeacherLectures(this.state.userID)
          .then((books) => {
            console.log(books)
            books.forEach((b) => {

              var index = instances.findIndex(x => parseInt(x.id) === parseInt(b.location))
              if (index === -1) {
                var courseIndex = courses.findIndex(course => parseInt(course.id) === parseInt(b.location))
                instances.push({
                  id: parseInt(b.location),
                  description: courses[courseIndex].description,
                  color: colors[parseInt(b.location)]
                })
                //instances.push(parseInt(b.location))
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
            {this.state.isMyCalendar ? <><div style={{ "width": "100%" }}>
              <br></br>
              <br></br>
              <br></br>
              <h2><b>My bookings calendar</b></h2>
              <br></br>
            </div>
              <h5><b>Chose the subjects to show</b></h5>
              <FormGroup style={{ "width": "100%" }} row>
                {this.checkBoxMount()}
              </FormGroup></> : <></>
            }

            <Paper>
              <Scheduler
                data={data}
                height={660}
              >

                <ViewState
                  currentDate={currentDate}
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
                />
                <AppointmentTooltip
                  //showOpenButton
                  showCloseButton
                //showDeleteButton
                />
                <Toolbar />
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