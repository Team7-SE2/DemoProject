/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { indigo, blue, teal, yellow, red, green } from '@material-ui/core/colors';
import {
  //AppointmentForm,
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
import ColorBar from 'react-color-bar';

//import { appointments } from '../../../demo-data/appointments';
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const dataColor = [
    {
        value: 37,
        color: '#03A9F4',
        legendLabel: 'available',
        legendValue: 37,
        tooltip: 'interest is $300',
    }, {
        value: 11,
        color: '#da0d0d',
        legendLabel: 'booked',
        /*legendValue: 11,
        tooltip: 'insurance is $100',*/
    },
];

const resources = [{
    fieldName: 'location',
    title: 'Location',
    instances: [
      { id: 1, text: 'Room 1', color: teal },
      { id: 2, text: 'Room 2', color: red },
      { id: 3, text: 'Room 3', color: green[300] },
      { id: 4, text: 'Room 3', color: blue[300] },
      { id: 5, text: 'Room 1', color: indigo },
    ]
  }];
const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

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
    
}

  componentDidMount() {
    // Utilizzo tipico (non dimenticarti di comparare le props):
    API.getStudentBookings(this.state.userID)
      .then((books) => {
          console.log(books)
        this.setState({data: books})
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
      /*if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }*/
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
                <h5><b>Chose your lessons</b></h5>
            </div>
            <FormGroup style= {{"width":"100%"}} row>
                <FormControlLabel
                    control={<Checkbox style ={{color: teal[300]}} checked={true} /*onChange={handleChange}*//>}
                    label="Software Engineering II"
                />
                <FormControlLabel
                    control={<Checkbox style ={{color: green[300]}} />} label="System Programming"/>
                <FormControlLabel
                    control={<Checkbox style ={{color: blue[300]}} checked={true} /*onChange={handleChange}*/ />}
                    label="Web Application I"
                />
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