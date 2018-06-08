import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import Tab from 'material-ui/Tabs/Tab';
import { withRouter, Route } from 'react-router-dom';
import { GetUser, logOut } from '../../api';

const SelectStyle = {
  height: '10em',
};
const titleStyle = {
  marginTop: '1em',
  fontSize: '3em',
};
const styles = {
  icon: {
    color: 'white',
  },
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
};

class ManagerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleCallToRouter = this.handleCallToRouter.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      logged: null,
      manager: false,
      org: false,
      coach: false,
      umpire: false,
    };
  }
  logOut = () => {
    logOut(localStorage.id_token);
    this.setState({ logged: false });
    localStorage.removeItem('id_user');
    localStorage.removeItem('first_name');
    localStorage.removeItem('id_token');
    localStorage.removeItem('last_name');
    localStorage.removeItem('type');
    window.location.replace('/');
  };
  handleCallToRouter = (value) => {
    this.props.history.push(value);
  };
  componentWillMount() {
    if (localStorage.id_user != null) {
      this.setState({ logged: true });
    } else {
      this.setState({ logged: false });
    }
  }
  render() {
    const tabs = (
      <Tabs
        style={styles.tabs}
        value={this.props.history.location.pathname}
        onChange={this.handleCallToRouter}
      >
        <Tab label="Tournaments" value={'/tournaments'} />
        <Tab label="Rankings" value={'/rankings'} />
        <Tab label="Points Distribution Methods" />
        <Tab label="Money Distribution Methods" />
      </Tabs>
    );

    const Logged = props => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton>
            <MoreVertIcon style={styles.icon}/>
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Logout" onClick={this.logOut} />
      </IconMenu>
    );
    const Login = props => <FlatButton {...this.props} label="Login" />;

    return (
      <AppBar
          titleStyle={this.props.is_coach === true ? titleStyle : ''}
        title={`Welcome ${this.props.first_name} ${this.props.last_name}`}
        style={this.props.is_coach === false ? styles.appBar : SelectStyle}
        iconElementRight={this.state.logged ? <Logged /> : <Login />}
      >
        {this.state.manager ? <tabs /> : ''}
      </AppBar>
    );
  }
}

export default withRouter(ManagerHeader);
