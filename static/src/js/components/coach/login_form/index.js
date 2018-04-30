/* eslint-disable */
import React from 'react';
import { Button, TextInput } from 'react-responsive-ui';
import CoachHeader from '../header/header';

export default class LoginCoach extends React.Component {
  constructor(props) {
    super(props);
    this.handleName = this.handleName.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      name: '',
      password: '',
    };
  }
  handleName(event) {
    this.setState({ name: event.target.value });
  }
  handlePass(event) {
    this.setState({ password: event.target.value });
  }
  submit(event) {

  }
  render() {
    return (
      <div>
        <CoachHeader />

        <TextInput
          label="Name"
          placeholder="Enter full name"
          value=""
          onChange={event => this.handleName(event)}
        />

        <TextInput
          label="Password"
          placeholder="Enter password"
          value=""
          onChange={event => this.handlePass(event)}
        />

        <Button action={event => this.submit(event)}>Submit</Button>
      </div>
    );
  }
}
