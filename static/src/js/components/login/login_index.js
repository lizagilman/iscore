import React from 'react';
import { Redirect } from 'react-router';
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
import {
  RegisterUser,
  loginUser,
  GetUser,
  getRegisteredUser,
  editUserApi,
} from '../../api';

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
      registerFirstName: null,
      registerLastName: null,
      loginFirstName: null,
      loginLastName: null,
      selectedType: '',
      is_coach: false,
      is_manager: false,
      is_umpire: false,
      is_organization: false,
      token: null,
      isAuthenticated: null,
      userType: null,
      userId: null,
    };
    this.setToken = this.setToken.bind(this);
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
      console.log('this.state.password ', this.state.password);
      console.log('this.state.userName ', this.state.userName);
      const payload = {
        password: this.state.password,
        username: this.state.userName,
      };
      loginUser(payload).then((res) => {
        if (res.status >= 400) {
          alert('Failed to login ');
        } else {
          console.log('res:', res);
          console.log('res.auth_token:', res.auth_token);
          this.setToken(res.auth_token);
          GetUser(res.auth_token).then((data) => {
            console.log('GetUser data:', data);
            getRegisteredUser(data.id).then((user) => {
              if (res.status >= 400) {
                alert('Failed to getRegisteredUser ');
              } else {
                console.log('user: ', user);
                if (user.is_coach === true) {
                  this.setState({ userType: 'coach' });
                } else if (user.is_manager === true) {
                  this.setState({ userType: 'manager' });
                } else if (user.is_organization === true) {
                  this.setState({ userType: 'organization' });
                } else if (user.is_umpire === true) {
                  this.setState({ userType: 'umpire' });
                }
                this.setState({ userId: user.id });
                this.setState({ loginFirstName: user.first_name });
                this.setState({ loginLastName: user.last_name });
              }
            });
          });
        }
      });
    }
  };
  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }
  setRegisterType = (event, value) => {
    this.setState({ selectedType: value });
  };

  submitRegister = (event) => {
    let payload = null;
    if (
      this.state.registerPass2 &&
      this.state.registerPass1 &&
      this.state.registerFirstName &&
      this.state.registerLastName &&
      this.state.registerEmail &&
      this.state.selectedType
    ) {
      if (this.state.registerPass2 === this.state.registerPass1) {
        payload = {
          password: this.state.registerPass1,
          username: this.state.registerEmail,
        };

        RegisterUser(payload)
          .then(
            // success
            (data) => {
              console.log('RegisterUser success', data);
              getRegisteredUser(data.id)
                .then(
                  (user) => {
                    console.log('user', user);
                    user.first_name = this.state.registerFirstName;
                    user.last_name = this.state.registerLastName;
                    if (this.state.selectedType === 'manager') {
                      user.is_manager = true;
                    } else if (this.state.selectedType === 'coach') {
                      user.is_coach = true;
                    } else if (this.state.selectedType === 'umpire') {
                      user.is_umpire = true;
                    } else if (this.state.selectedType === 'organization') {
                      user.is_organization = true;
                    }
                    console.log('user', user);
                    editUserApi(user).then((res) => {
                      if (res.status >= 400) {
                        alert('Failed to save registered ');
                      } else {
                        alert('Registered user saved successfully');
                        this.handleChange();
                      }
                    });
                  },
                  (user) => {
                    alert('RegisterUser fetch error ', user);
                  },
                )
                .catch((e) => {
                  console.log('RegisterUser fetch error', e);
                });
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
    if (this.state.loginFirstName && this.state.loginLastName) {
      if (this.state.userType === 'manager') {
        return (
          <Redirect
            to={{
              pathname: '/tournaments',
              state: {
                first_name: this.state.loginFirstName,
                last_name: this.state.loginLastName,
              },
            }}
          />
        );
      } else if (this.state.userType === 'coach') {
        return (
          <Redirect
            to={{
              pathname: '/coach',
              state: {
                  id: this.state.userId,
                first_name: this.state.loginFirstName,
                last_name: this.state.loginLastName,
              },
            }}
          />
        );
      } else if (this.state.userType === 'umpire') {
        return (
          <Redirect
            to={{
              pathname: '/umpire',
              state: {
                  id: this.state.userId,
                first_name: this.state.loginFirstName,
                last_name: this.state.loginLastName,
              },
            }}
          />
        );
      } else if (this.state.userType === 'organization') {
        return (
          <Redirect
            to={{
              pathname: '/rankings',
              state: {
                  id: this.state.userId,
                first_name: this.state.loginFirstName,
                last_name: this.state.loginLastName,
              },
            }}
          />
        );
      }
    }

    const cardLogin = () => (
      <div>
        <div className={styles.frame}>
          <TextField
            floatingLabelText="Please enter email"
            type="text"
            onChange={(event, newValue) => {
               this.setState({ userName: newValue });
            }}
          />
        </div>
        <br />
        <div className={styles.frame}>
          <TextField
            floatingLabelText="Please enter password"
            type="password"
            onChange={(event, newValue) => {
                this.setState({ password: newValue });
            }}
          />
        </div>
        <br />
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
            value="organization"
            label="Tournament Organization"
            style={styles.radioButton}
          />
          <RadioButton
            value="umpire"
            label="Umpire"
            style={styles.radioButton}
          />
          <RadioButton value="coach" label="Coach" style={styles.radioButton} />
        </RadioButtonGroup>

        <TextField
          hintText="Email Field"
          floatingLabelText="Email"
          type="text"
          onChange={(event, newValue) =>
            this.setState({ registerEmail: newValue })
          }
        />

        <br />
        <TextField
          hintText="First Name"
          floatingLabelText="First Name"
          type="text"
          onChange={(event, newValue) =>
            this.setState({ registerFirstName: newValue })
          }
        />

        <br />
        <TextField
          hintText="Last Name"
          floatingLabelText="Last Name"
          type="text"
          onChange={(event, newValue) =>
            this.setState({ registerLastName: newValue })
          }
        />

        <br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          onChange={(event, newValue) =>
            this.setState({ registerPass1: newValue })
          }
        />
        <br />
        <TextField
          hintText="Confirm Password Field"
          floatingLabelText="Confirm Password"
          type="password"
          onChange={(event, newValue) =>
            this.setState({ registerPass2: newValue })
          }
        />
        <br />
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
