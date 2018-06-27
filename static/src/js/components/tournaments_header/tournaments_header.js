import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Close from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Tab from 'material-ui/Tabs/Tab';
import { withRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { GetUser, logOut } from '../../api';
import Drawer from 'material-ui/Drawer';

const styles = {
  iscore: {
    fontSize: '3em',
    color: 'white',
    height: '70px',
    display: 'block',
  },

  drawerElementsLabel: {
    fontSize: '3em',
    color: 'rgb(255, 165, 0)',
  },
  drawerElementsStyle: {
    display: 'block',
    lineHeight: '5em',
    height: '5em',
    weight: '100%',
    marginTop: '1%',
    marginBottom: '1%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  menuButton: {
    marginRight: '20px',
    height: '7em',
    width: '3em',
  },
  menuIcon: {
    // padding: '-12px',
    color: "white",
    width: "53px",
    height: "55px"
  },

  coachTitleStyle: {
    fontSize: '3em',
    marginBottom: '1%',
    color: 'white',
    display: 'block',
    height: '40px',
  },
  titleStyle: {
    marginLeft: '2%',
  },
  icon: {
    color: 'white',
    fontSize: '3em',
  },
  iconCoach: {
    color: 'white',
    marginTop: '1em',
    fontSize: '3em',
  },
  coachAppBar: {
    flexWrap: "wrap",
    lineHeight: "4em",
    paddingRight: "70px"
  },
  tabs: {
    width: '100%',
    height: '20px',
    backgroundColor: '#770fac',
  },

  tab: {
    backgroundColor: '#770fac',
  },

  orgAppBar: {
    paddingTop:'1%',
    height: '10em',
  },
  managerAppBar: {
    paddingTop:'1%',
    height: '10em',
  },
  umpireAppBar: {
    paddingTop:'1%',
    height: '10em',
  },
  menuItem: {
    backgroundColor: 'white',
  },
};

class ManagerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleCallToRouter = this.handleCallToRouter.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goToSchedule = this.goToSchedule.bind(this);
    this.goToRegistration = this.goToRegistration.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      logged: null,
      manager: false,
      org: false,
      coach: false,
      umpire: false,
      goTo: false,
      open: false,
        goToReg:false,
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
  handleToggle = e => {
    e.preventDefault();

    this.setState(
      prevState => ({
        open: !prevState.open
      }),
      () => {
        console.log("open is: ", this.state.open);
      }
    );
  };
  handleCallToRouter = (value) => {
    this.props.history.push(value);
  };
  goToSchedule = e => {
    this.setState({ goTo: true });
    this.handleToggle(e);
  };
  goToRegistration= e =>{
    this.setState({ goToReg: true });
    this.handleToggle(e);
  };
  componentWillMount() {
    if (localStorage.id_user != null) {
      this.setState({ logged: true });
    } else {
      this.setState({ logged: false });
    }

    switch (this.props.type) {
      case 'Coach':
      case 'coach':
        this.props.headerSwitcher('#ffa500');
        break;
      case 'Organization Manager':
        this.props.headerSwitcher('#b841f4');
        break;
      case 'umpire':
      case 'Umpire':
        this.props.headerSwitcher('#4242f4');
        break;
    }
  }

  render() {
    const tabs = (
      <Tabs
        style={styles.tabs}
        value={this.props.history.location.pathname}
        onChange={this.handleCallToRouter}
      >
        <Tab label="Tournaments" value={'/tournaments'} style={styles.tab} />
        <Tab label="Rankings" value={'/rankings'} style={styles.tab} />
        <Tab label="Points Distribution Methods" style={styles.tab} />
        <Tab label="Money Distribution Methods" style={styles.tab} />
      </Tabs>
    );
    const Logged = props => (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          iconStyle={styles.icon}
        >
          <MenuItem primaryText="Logout" onClick={this.logOut} />
        </IconMenu>
      </div>
    );
    const LoggedCoach = props => (
      <div>
        <FlatButton
          icon={
            <IconButton iconStyle={styles.menuIcon}>
              {this.state.open ? <Close /> : <Menu />}
            </IconButton>
          }
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          onClick={e => this.handleToggle(e)}
          style={styles.menuButton}
        />
        <Drawer
          open={this.state.open}
          disableSwipeToOpen={false}
          width="80%"
          style={styles.drawerStyle}
        >
          <FlatButton
            style={styles.drawerElementsStyle}
            labelStyle={styles.drawerElementsLabel}
            label="Logout"
            onClick={this.logOut}
          />
          <FlatButton
            style={styles.drawerElementsStyle}
            labelStyle={styles.drawerElementsLabel}
            label="schedule"
            onClick={e => this.goToSchedule(e)}
          />
           <FlatButton
            style={styles.drawerElementsStyle}
            labelStyle={styles.drawerElementsLabel}
            label="players registration"
            onClick={e => this.goToRegistration(e)}
          />
        </Drawer>
      </div>
    );
    const Iscore = () => (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <FlatButton label="iSCORE" labelStyle={styles.iscore} />
        </div>
      </div>
    );
    const Login = () => (
      <FlatButton
        style={this.props.type === 'Coach' ? styles.iconCoach : styles.icon}
        label="Login"
      />
    );

    return (
      <div>
        <AppBar
          title={
            localStorage.type != 'coach'
              ? `Welcome ${this.props.first_name} ${this.props.last_name} - ${this.props.type}` : ''}
          titleStyle={localStorage.type != 'coach' ? styles.titleStyle : ''}
          style={
            this.props.type === 'Coach'
              ? styles.coachAppBar
              : this.props.type === 'Organization Manager'
                ? styles.orgAppBar
                : this.props.type === 'Tournament Manager'
                  ? styles.managerAppBar
                  : styles.umpireAppBar
          }
          iconElementLeft={<Iscore />}
          iconElementRight={
            this.state.logged ? (
              this.props.type === 'Coach' || localStorage.type === 'coach' ? (
                <LoggedCoach />
              ) : (
                <Logged />
              )
            ) : (
              <Login />
            )
          }
        >
          {localStorage.type === 'coach' ? (
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <FlatButton
                  label={`Welcome ${this.props.type} ${this.props.first_name} ${
                    this.props.last_name
                  }`}
                  labelStyle={
                    this.props.type === 'Coach'
                      ? styles.coachTitleStyle
                      : styles.titleStyle
                  }
                />
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.goTo && !this.state.open ? (
            <Redirect to="/coach/tournaments" />
          ) : (
            ""
          )}
          {this.state.goToReg && !this.state.open ? (
            <Redirect to="/coach" />
          ) : (
            ""
          )}
        </AppBar>
        <div>
          {localStorage.type === 'organization' ? (
            <div className="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">{tabs}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ManagerHeader);
