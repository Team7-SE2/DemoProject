import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
var moment = require("moment");

const DatePickerComponent = (props) => {

  let { label } = props;

  //this.setState({ dayStart: moment().toISOString() })

  return (
    <>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="date" value={moment()}
          required autoFocus />
      </Form.Group>
    </>
  );
}

export default DatePickerComponent;