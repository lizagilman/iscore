import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextFieldExampleControlled from "./components/textField";
//import DatePickerExampleControlled from "./components/datePicker";


const FirstStep = ( props ) => {

    return (
      <div className="container" >
        <TextFieldExampleControlled
            floatingLabelText="Tournament Name"
            changed={ props.tName}/>
        <TextFieldExampleControlled
            floatingLabelText={"Address"}
            changed={ props.aName}/>
        <br />
        {/*<DatePickerExampleControlled*/}
            {/*hintText={"Start Date"}*/}
            {/*changed={ props.startDateChangedHandler}/>*/}
        {/*<br />*/}
        {/*<DatePickerExampleControlled*/}
            {/*hintText={"End Date"}*/}
            {/*changed={ props.endDateChangedHandler}/>/>*/}
        {/*<br />*/}
        {/*<DatePickerExampleControlled hintText={"Registration Start Date"} />*/}
        {/*<br />*/}
        {/*<DatePickerExampleControlled hintText={"Registration End Date"} />*/}
      </div>
    );
};

export default FirstStep;