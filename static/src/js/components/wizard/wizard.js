import React from "react";
import ReactDOM from "react-dom";
import ReactWizard from "react-bootstrap-wizard";
import {Container, Row, Col} from "reactstrap";

import {orange500, blue500} from 'material-ui/styles/colors';
import "bootstrap/dist/css/bootstrap.min.css";

import DatePickerExampleControlled from "./components/datePicker";
import TextFieldExampleControlled from"./components/textField";



class FirstStep extends React.Component{

    render(){
        return (
            <div>
                <DatePickerExampleControlled/>
                <TextFieldExampleControlled/>
            </div>
        )
    }
}
class SecondStep extends React.Component{


}
class ThirdStep extends React.Component{
    render(){
        return (
            <div>Hey from Third</div>
        )
    }
}

var steps = [
    // this step hasn't got a isValidated() function, so it will be considered to be true
    { stepName: 'Basic Info', component: FirstStep },
    // this step will be validated to false
    { stepName: 'Second', component: SecondStep },
    // this step will never be reachable because of the seconds isValidated() steps function that will always return false
    { stepName: 'Third', component: ThirdStep }
];

const Wizard = () => (


    <Container fluid style={{marginTop: "15px"}}>
        <Row>
            <Col xs={12} md={6} className="mr-auto ml-auto">
                <ReactWizard
                    steps={steps}
                    navSteps
                    title="Tournament"
                    subtitle=""
                    headerTextCenter
                    validate
                    color="green"
                />
            </Col>
        </Row>
    </Container>
);

export default Wizard;



