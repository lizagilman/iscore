import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactWizard from "react-bootstrap-wizard";
import { Container, Row, Col } from "reactstrap";
import FirstStep from './firstStep';
import MenuItem from "material-ui/MenuItem";


export default class Wizard2 extends React.Component {

    state = {
        tournamentName:'',
        address:'',
        startDate: '',
        endDate: '',
        RegistrationStartDate: '',
        RegistrationEndDate: '',
        grade:[<MenuItem key={1} value={1} primaryText="Grand Slam" />,
                <MenuItem key={2} value={2} primaryText="ATP" />],
        categories:[{ value: 0, name: "Man Single" },
                  { value: 1, name: "Woman Single" },
                  { value: 2, name: "Boys Single" },
                  { value: 3, name: "Girls Single" }],
        moneyDistribution:[<MenuItem key={1} value={1} primaryText="method 1" />,
                            <MenuItem key={2} value={2} primaryText="method 2" />],
        pointsDistribution:[  <MenuItem key={1} value={1} primaryText="points 1" />,
                                <MenuItem key={2} value={2} primaryText="points 2" />],
    }
    tournamentNameChangedHandler = ( event ) => {
        this.setState({tournamentName: event.target.value});
    }
    addressNameChangedHandler = ( event ) => {
        this.setState({address: event.target.value});
    }
    startDateChangedHandler = ( event ) => {
        this.setState({startDate: event.target.value});
    }
    endDateChangedHandler = ( event ) => {
        this.setState({endDate: event.target.value});
    }

    newHandler = (event, key, val) => {
        let newObj = {key: val};
        this.setState( {...this.state, ...newObj } )
    }

    render() {
            const steps = [
  // this step hasn't got a isValidated() function, so it will be considered to be true
  { stepName: "Basic Info", component: <FirstStep tName={this.tournamentNameChangedHandler()} aName={this.addressNameChangedHandler()}/> },
  // this step will be validated to false
 // { stepName: "Second", component: SecondStep },
  // this step will never be reachable because of the seconds isValidated() steps function that will always return false
 // { stepName: "Third", component: ThirdStep }
];
        return (
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
    }
}