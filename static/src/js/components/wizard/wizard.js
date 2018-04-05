import React from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TextFieldExampleControlled from "./components/textField";
import DatePickerExampleControlled from "./components/datePicker";
import SelectFieldExampleSelectionRenderer from "./components/select";
import SelectFieldExampleFloatingLabel from "./components/selectSingle";
import MenuItem from "material-ui/MenuItem";
const divStyle = {
  margin: "0 auto"
};
class FirstStep extends React.Component {
  render() {
    return (
      <div className="container" style={divStyle}>
        <TextFieldExampleControlled floatingLabelText="Tournament Name" />
        <TextFieldExampleControlled floatingLabelText={"Address"} />
        <br />
        <DatePickerExampleControlled hintText={"Start Date"} />
        <br />
        <DatePickerExampleControlled hintText={"End Date"} />
        <br />
        <DatePickerExampleControlled hintText={"Registration Start Date"} />
        <br />
        <DatePickerExampleControlled hintText={"Registration End Date"} />
      </div>
    );
  }
}
const items = [
  <MenuItem key={1} value={1} primaryText="Grand Slam" />,
  <MenuItem key={2} value={2} primaryText="ATP" />
];
const persons = [
  { value: 0, name: "Man Single" },
  { value: 1, name: "Woman Single" },
  { value: 2, name: "Boys Single" },
  { value: 3, name: "Girls Single" }
];
const money = [
  <MenuItem key={1} value={1} primaryText="method 1" />,
  <MenuItem key={2} value={2} primaryText="method 2" />
];
const points = [
  <MenuItem key={1} value={1} primaryText="points 1" />,
  <MenuItem key={2} value={2} primaryText="points 2" />
];
class SecondStep extends React.Component {
  render() {
    return (
      <div>
        <SelectFieldExampleFloatingLabel
          hintText={"Select Grade"}
          items={items}
        />
        <br />
        <SelectFieldExampleSelectionRenderer
          hintText={"Select Category"}
          persons={persons}
        />
        <br />
        <SelectFieldExampleFloatingLabel
          hintText={"Select Prise Money Distribution Method"}
          items={money}
        />
        <br />
        <SelectFieldExampleFloatingLabel
          hintText={"Select Points Distribution Method"}
          items={points}
        />
      </div>
    );
  }
}
class ThirdStep extends React.Component {
  render() {
    return <div>upload invitation form</div>;
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
