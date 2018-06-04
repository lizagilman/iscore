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
import { RegisterUser, loginUser } from '../../api';
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
      userName: null,
      password: null,
      registerPass1: null,
      registerPass2: null,
      registerEmail: null,
      registerName: null,
      selectedType: '',
      is_coach: false,
      is_manager: false,
      is_umpire: false,
      is_organization: false,
    };
    this.setRegisterType = this.setRegisterType.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange = () => {
      this.setState(prevState => ({
        login: !prevState.login,
      }));
    };

    submitLogin = (event) => {
      if (this.state.password && this.state.userName) {
        const payload = {
          password: this.state.password,
          username: this.state.userName,
        };
        loginUser(payload);
      }
    };

    setRegisterType = (event, value) => {
      this.setState({ selectedType: value });
    };

    submitRegister = (event) => {
      let payload = null;
      if (
        this.state.registerPass2 &&
            this.state.registerPass1 &&
            this.state.registerName &&
            this.state.registerEmail &&
            this.state.selectedType
      ) {
        if (this.state.registerPass2 === this.state.registerPass1) {
          if (this.state.selectedType === 'manager') {
            payload = {
              password: this.state.registerPass1,
              username: this.state.registerEmail,
              name: this.state.registerName,
              is_manager: true,
            };
          } else if (this.state.selectedType === 'coach') {
            payload = {
              password: this.state.registerPass1,
              username: this.state.registerEmail,
              name: this.state.registerName,
              is_coach: true,
            };
          } else if (this.state.selectedType === 'umpire') {
            payload = {
              password: this.state.registerPass1,
              username: this.state.registerEmail,
              name: this.state.registerName,
              is_umpire: true,
            };
          }

          RegisterUser(payload)
            .then(
              // success
              (data) => {
                console.log('RegisterUser success', data);
              },
              // error
              (data) => {
                console.log('RegisterUser error', data);
              },
            )
            .catch((e) => {
              console.log('RegisterUser error', e);
            });
        }
      } else {
        payload = '';
        console.log('payload', payload);
      }
    };

    render() {
      const cardLogin = () => (
            <div>
                <div className={styles.frame}>
                    <TextField
                        floatingLabelText="Please enter email"
                        type="text"
                        onChange={(event, newValue) =>
                            this.setState({ userName: newValue })}
                    />
                </div>
                <br/>
                <div className={styles.frame}>
                    <TextField
                        floatingLabelText="Please enter password"
                        type="password"
                        onChange={(event, newValue) =>
                            this.setState({ password: newValue })}
                    />
                </div>
                <br/>
                <div className={styles.button}>
                    <RaisedButton
                        label="Login"
                        labelColor={'white'}
                        backgroundColor={'darkcyan'}
                        buttonStyle={styles.button}
                        onClick={event => this.submitLogin(event)}
                    />
                </div>
            </div>
      );

      const cardSignUp = () => (
            <div>
                <h6 style={styles.h6}>Please pick your profession:</h6>
                <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected="Umpire"
                    onChange={(event, value) => this.setRegisterType(event, value)}
                >
                    <RadioButton
                        value="manager"
                        label="Tournament Manager"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="umpire"
                        label="Umpire"
                        style={styles.radioButton}
                    />
                    <RadioButton value="coach" label="Coach" style={styles.radioButton}/>
                </RadioButtonGroup>

                <TextField
                    hintText="Email Field"
                    floatingLabelText="Email"
                    type="text"
                    onChange={(event, newValue) =>
                        this.setState({ registerEmail: newValue })
                    }
                />

                <br/>
                <TextField
                    hintText="Full Name"
                    floatingLabelText="Full Name"
                    type="text"
                    onChange={(event, newValue) =>
                        this.setState({ registerName: newValue })
                    }
                />

                <br/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    onChange={(event, newValue) =>
                        this.setState({ registerPass1: newValue })
                    }
                />
                <br/>
                <TextField
                    hintText="Confirm Password Field"
                    floatingLabelText="Confirm Password"
                    type="password"
                    onChange={(event, newValue) =>
                        this.setState({ registerPass2: newValue })
                    }
                />
                <br/>
                <RaisedButton
                    className={'styles.button'}
                    label="Register"
                    labelColor={'white'}
                    backgroundColor={'darkcyan'}
                    buttonStyle={styles.button}
                    onClick={event => this.submitRegister(event)}
                />
            </div>
      );


      return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true} style={styles.toolbar}>
                        <ToolbarTitle text="WELCOME" style={styles.toolbartitle}/>
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
                        <ToolbarSeparator style={styles.toolbarseparator}/>
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

