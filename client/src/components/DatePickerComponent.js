import React from 'react'
//import Form from "react-bootstrap/Form";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
var moment = require("moment");

const DatePickerComponent = (props) => {

  let { type, setStateDate } = props;


  let date = type === "startDate" ? moment().add(-7, "days").startOf("day") : moment().endOf("day");

  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(date);

  const handleDateChange = (d) => {
    setSelectedDate(d);
    setStateDate(props.type, d);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <KeyboardDateTimePicker
          margin="normal"
          id="time-picker"
          /*label= {label}*/
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePickerComponent;