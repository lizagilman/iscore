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
import Spinner from '../spinner/spinner';

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
    width: '50%',
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
      selectedType: '',
      is_coach: false,
      is_manager: false,
      is_umpire: false,
      is_organization: false,
      token: null,
      isAuthenticated: null,
      userType: false,
      errorConfirmPass: null,
      errorPass: null,
      is_loading: false,
      loginEmailError: null,
      loginPassError: null,
    };
    this.setUserId = this.setUserId.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setType = this.setType.bind(this);
    this.setRegisterType = this.setRegisterType.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setLocalSFirstName = this.setLocalSFirstName.bind(this);
    this.setLocalSLastName = this.setLocalSLastName.bind(this);
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

      this.setState({ is_loading: true });
      loginUser(payload).then((res) => {
        if (res.non_field_errors) {
          alert('Failed to login. ', res.non_field_errors[0]);
          this.setState({ is_loading: false });
        } else {
          this.setToken(res.auth_token);
          GetUser(res.auth_token).then((data) => {
            if (data.detail) {
              alert('Failed to login. ', data.detail);
              this.setState({ is_loading: false });
            } else {
              getRegisteredUser(data.id).then((user) => {
                if (user.detail) {
                  alert('Failed to login. ', user.detail);
                  this.setState({ is_loading: false });
                } else {
                  this.setUserId(user.id);
                  this.setLocalSFirstName(user.first_name);
                  this.setLocalSLastName(user.last_name);
                  let type;
                  if (user.is_coach === true) {
                    type = 'coach';
                  } else if (user.is_manager === true) {
                    type = 'manager';
                  } else if (user.is_organization === true) {
                    type = 'organization';
                  } else if (user.is_umpire === true) {
                    type = 'umpire';
                  }
                  this.setType(type).then(this.setState({ userType: true }));
                }
              });
            }
          });
        }
      });
    }
  };
  setToken = (idToken) => {
    localStorage.setItem('id_token', idToken);
  };
  setUserId = (id) => {
    localStorage.setItem('id_user', id);
  };
  setType = (type) => {
    localStorage.setItem('type', type);
    return Promise.resolve();
  };
  setLocalSFirstName = (name) => {
    localStorage.setItem('first_name', name);
  };
  setLocalSLastName = (name) => {
    localStorage.setItem('last_name', name);
  };
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
              getRegisteredUser(data.id)
                .then(
                  (user) => {
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
    //  let dataPromise = localStorage.get("last_name");
    // dataPromise.then(data => {
    if (localStorage.type) {
      if (this.state.userType && localStorage.type === 'manager') {
        return (
          <Redirect
            to={{
              pathname: '/tournaments',
            }}
          />
        );
      } else if (this.state.userType && localStorage.type === 'coach') {
        return (
          <Redirect
            to={{
              pathname: '/coach',
            }}
          />
        );
      } else if (this.state.userType && localStorage.type === 'umpire') {
        return (
          <Redirect
            to={{
              pathname: '/umpire/tournaments',
            }}
          />
        );
      } else if (this.state.userType && localStorage.type === 'organization') {
        return (
          <Redirect
            to={{
              pathname: '/rankings',
            }}
          />
        );
      }
    }
    // });

    const cardLogin = () => (
      <div>
        <div className={styles.frame}>
          <TextField
            floatingLabelText="Please enter email"
            type="text"
            errorText={
              this.state.loginEmailError ? this.state.loginEmailError : ''
            }
            onChange={(event, newValue) => {
              if (newValue.length < 1) {
                this.setState({ loginEmailError: 'Required fild' });
              } else if (newValue.length > 0) {
                this.setState({ loginEmailError: '' });
              }

              this.setState({ userName: newValue });
            }}
          />
        </div>
        <br />
        <div className={styles.frame}>
          <TextField
            errorText={
              this.state.loginPassError ? this.state.loginPassError : ''
            }
            floatingLabelText="Please enter password"
            type="password"
            onChange={(event, newValue) => {
              if (newValue.length < 8) {
                this.setState({
                  loginPassError: 'password must contain at least 8 characters',
                });
              } else if (newValue.length > 7) {
                this.setState({ loginPassError: '' });
              }

              this.setState({ password: newValue });
            }}
          />
        </div>
        <br />

        {this.state.is_loading ? (
          <div>{Spinner(50)}</div>
        ) : (
          <div className={styles.button}>
            <RaisedButton
              label="Login"
              labelColor={'white'}
              backgroundColor={'darkcyan'}
              buttonStyle={styles.button}
              onClick={event => this.submitLogin(event)}
            />
          </div>
        )}
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
          type="email"
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
          errorText={this.state.errorPass ? this.state.errorPass : ''}
          type="password"
          onChange={(event, newValue) => {
            if (newValue.length < 8) {
              this.setState({
                errorPass: 'password must contain at least 8 characters',
              });
            } else {
              this.setState({ errorPass: '' });
            }
            this.setState({ registerPass1: newValue });
          }}
        />
        <br />
        <TextField
          hintText="Confirm Password Field"
          errorText={
            this.state.errorConfirmPass ? this.state.errorConfirmPass : ''
          }
          floatingLabelText="Confirm Password"
          type="password"
          onChange={(event, newValue) => {
            if (newValue.length < 8) {
              this.setState({
                errorConfirmPass: 'password must contain at least 8 characters',
              });
            } else if (
              newValue.length === 8 &&
              newValue !== this.state.registerPass1
            ) {
              this.setState({ errorConfirmPass: 'Password does not match' });
            } else {
              this.setState({ errorConfirmPass: '' });
            }

            this.setState({ registerPass2: newValue });
          }}
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
            <ToolbarTitle style={styles.toolbartitle} text="WELCOME" />
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
