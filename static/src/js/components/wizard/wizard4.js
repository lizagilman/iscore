class FirstStep extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
          tourName: '',
          date: false
      };
       this.tournamentNameChange = this.tournamentNameChange.bind(this);
       this.dateChange = this.dateChange.bind(this);

       tournamentNameChange(filterText)
        {
            this.setState({
              tourName: filterText
            });
        }
         dateChange(filterText)
        {
            this.setState({
              date: filterText
            });
        }
   }

    render(){
        return (
            <div>
                <TextFieldExample onTournamentNameChange={this.tournamentNameChange}/>
                <br/>
                <DatePickerExample onDateChange={this.dateChange}/>
                <br/>

            </div>
        )
    }
}
class SecondStep extends React.Component{

    submit = values => {
        // print the form values to the console
        console.log(values)
    };
    render(){
        return (
            <div><MaterialUiForm onSubmit={this.submit}/></div>
        )
    }
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
                    title="Create Tournament"
                    subtitle=""
                    headerTextCenter
                    validate
                    color="primary"
                />
            </Col>
        </Row>
    </Container>
);

export default Wizard;