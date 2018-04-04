import React from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "material-ui/TextField";

import DatePickerExampleControlled from "./components/datePicker";
import TextFieldExampleControlled from "./components/textField";

const FirstStep = () => (
  <div>
    <TextField
      hintText={"Tournament Name"}
      floatingLabelText="Tournament Name"
    />

    <TextField hintText={"Address"} />
  </div>
);

class SecondStep extends React.Component {
  render() {
    return <div>Hey from Second</div>;
  }
}
class ThirdStep extends React.Component {
  render() {
    return <div>Hey Hey from Third</div>;
  }
}

var steps = [
  // this step hasn't got a isValidated() function, so it will be considered to be true
  { stepName: "Basic Info", component: FirstStep },
  // this step will be validated to false
  { stepName: "Second", component: SecondStep },
  // this step will never be reachable because of the seconds isValidated() steps function that will always return false
  { stepName: "Third", component: ThirdStep }
];

const Wizard = () => {
  return (
    <Container fluid style={{ marginTop: "15px" }}>
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
};

export default Wizard;
