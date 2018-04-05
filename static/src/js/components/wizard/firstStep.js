import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextFieldExampleControlled from "./components/textField";
import DatePickerExampleControlled from "./components/datePicker";


const FirstStep = ( props ) => {

    return (
      <div className="container" >
        <TextFieldExampleControlled
            floatingLabelText="Tournament Name"
            changed={(event) => props.tName(event)}/>
        <TextFieldExampleControlled
            floatingLabelText={"Address"}
            changed={(event) => props.aName(event)}/>
        <br />
        <DatePickerExampleControlled
            hintText={"Start Date"}
            changed={(event) => props.startDateChangedHandler(event)}/>
        <br />
        <DatePickerExampleControlled
            hintText={"End Date"}
            changed={(event) => props.endDateChangedHandler(event)}/>/>
        <br />
        <DatePickerExampleControlled hintText={"Registration Start Date"} />
        <br />
        <DatePickerExampleControlled hintText={"Registration End Date"} />
      </div>
    );
};

export default FirstStep;