import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// import { teal500 } from "material-ui/styles/colors";

const styles = {
  button: {
    marginTop: '2%',
  },
  h6: {
    textAlign: 'left',
    marginLeft: '10%',
    marginBottom: '5%',
    color: 'darkgray',
    fontWeight: '300',
  },
  toolbarseparator: {
    color: 'black',
  },
  toolbarbuttons: {
    color: 'darkcyan',
  },
  toolbarbuttonsafter: {
    color: 'slategrey',
  },
  toolbartitle: {
    color: 'darkcyan',
    width: '8em',
  },
  toolbar: {
    paddingLeft: '3%',
  },
  radioButton: {
    marginBottom: 16,
    marginLeft: '20%',
    textAlign: 'left',
  },
  frame: {
    border: '1px solid black',
    borderRadius: '25%',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: '3%',
  },
  paper: {
    margin: '0 auto',
    width: '30%',
    height: '100%',
    textAlign: 'center',
    display: 'block',
    backgroundColor: 'white',
    padding: '5%',
  },
};

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = () => {
    this.setState(prevState => ({
      login: !prevState.login,
    }));
  };

  render() {
    const cardLogin = () => (
        <div>
          <div className={styles.frame}>
            <TextField
              hintText="Email Field"
              floatingLabelText="Email"
              type="text"
            />
          </div>
          <br />
          <div className={styles.frame}>
            <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
            />
          </div>
          <br />
          <div className={styles.button}>
            <RaisedButton
              label="Login"
              labelColor={'white'}
              backgroundColor={'darkcyan'}
              buttonStyle={styles.button}
            />
          </div>
        </div>
    );
    const cardSignUp = () => (
        <div>
          <h6 style={styles.h6}>Please pick your profession:</h6>
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            <RadioButton
              value="light"
              label="Tournament Manager"
              style={styles.radioButton}
            />
            <RadioButton
              value="not_light"
              label="Umpire"
              style={styles.radioButton}
            />
            <RadioButton
              value="ludicrous"
              label="Coach"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <TextField
            hintText="Email Field"
            floatingLabelText="Email"
            type="text"
          />

          <br />
            <TextField
            hintText="Full Name"
            floatingLabelText="Full Name"
            type="text"
          />

          <br />
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
          />
          <br />
          <TextField
            hintText="Confirm Password Field"
            floatingLabelText="Confirm Password"
            type="password"
          />
          <br />
          <div className={styles.button}>
            <RaisedButton
              label="Register"
              labelColor={'white'}
              backgroundColor={'darkcyan'}
              buttonStyle={styles.button}
            />
          </div>
        </div>
    );
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} style={styles.toolbar}>
            <ToolbarTitle text="WELCOME" style={styles.toolbartitle} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton
              label="Login"
              onClick={this.handleChange}
              style={
                this.state.login
                  ? styles.toolbarbuttons
                  : styles.toolbarbuttonsafter
              }
            />
            <ToolbarSeparator style={styles.toolbarseparator} />
            <FlatButton
              label="Signup"
              onClick={this.handleChange}
              style={
                this.state.login
                  ? styles.toolbarbuttonsafter
                  : styles.toolbarbuttons
              }
            />
          </ToolbarGroup>
        </Toolbar>
        <Paper style={styles.paper} zDepth={2}>
          {this.state.login ? cardLogin() : cardSignUp()}
        </Paper>
      </div>
    );
  }
}
