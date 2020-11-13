import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { indigo, blue, teal, yellow, red, green } from '@material-ui/core/colors';
import {
  Scheduler, DayView, Appointments, MonthView, WeekView, Toolbar,
  DateNavigator, ViewSwitcher, TodayButton, Resources, AppointmentTooltip, DragDropProvider,
  EditRecurrenceMenu, AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import API from '../api/api.js';

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

let resources = [];
let selectedChecks = [];
const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

const colors = [teal[300], red[300], green[300], blue[300], indigo[300]]
let instances = []

/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
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
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);

    API.getStudentCourses(this.state.userID)
      .then((courses) => {
        courses.forEach((course) => {
          var index = instances.findIndex(x => x.id==course.id)
          // here you can check specific property for an object whether it exist in your array or not

          if (index === -1){
            instances.push({ 
              id: course.id,
              description: course.description,
              color: colors[course.id] 
            })
            selectedChecks.push(course.id)
          }
        })
        
        resources = [{
          fieldName: 'location',
          title: 'Location',
          instances: instances
        }];

        API.getStudentBookings(this.state.userID)
        .then((books) => {
          this.setState({data: books, data2: books})
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      });
    
}

  checkBoxMount() {

    return instances.map((instance) => {
          return <FormControlLabel
            control={<Checkbox id = {instance.id} style ={{color: instance.color}} defaultChecked={true} /*checked={true} */onChange={this.handleChange}/>}
            label={instance.description}
          />
        })

  }

  componentDidMount() {
    
  }

  handleChange = (event) =>{
    var newData = [];
    var id = parseInt(event.target.id)

    var index = selectedChecks.findIndex(x => x == id)

    if (index === -1){
      selectedChecks.push(id)
    } else 
      selectedChecks.splice(index, 1)
    
    newData = this.state.data2.filter((d) => selectedChecks.includes(d.location))
    console.log(newData)
    this.setState({
      data: newData
    });
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
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    return (
        <>
            <div style= {{"width":"100%"}}>
                <br></br>
                <br></br>
                <br></br>
                <h2><b>My bookings calendar</b></h2>
                <br></br>
            </div>
            <h5><b>Chose your lessons</b></h5>
            <FormGroup style= {{"width":"100%"}} row>
              {this.checkBoxMount()}
            </FormGroup>            
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
                    showDeleteButton
                />
                <Toolbar />
                <ViewSwitcher />
                
                <DragDropProvider />
                </Scheduler>

                <Dialog
                open={confirmationVisible}
                onClose={this.cancelDelete}
                >
                <DialogTitle>
                    Delete Appointment
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Are you sure you want to delete this appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                    Cancel
                    </Button>
                    <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                    Delete
                    </Button>
                </DialogActions>
                </Dialog>

                
            </Paper>
    
        </>
    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(Demo);