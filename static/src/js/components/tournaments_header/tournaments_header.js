import React from "react";
import AppBar from "material-ui/AppBar";
import Tabs from "material-ui/Tabs/Tabs";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FlatButton from "material-ui/FlatButton";
import Tab from "material-ui/Tabs/Tab";
import { withRouter, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import { GetUser, logOut } from "../../api";

const styles = {
  coachTitleStyle: {
    marginTop: "1em",
    fontSize: "3em",
    marginLeft: "1%"
  },
  titleStyle: {
    marginLeft: "2%"
  },
  icon: {
    color: "white"
  },
  iconCoach: {
    marginTop: "1em",
    height: "3em",
    width: "2em"
  },
  coachAppBar: {
    flexWrap: "wrap"
  },
  tabs: {
    width: "100%"
  },
  orgAppBar: {
    backgroundColor: "#b841f4",
    height: "10em"
  },
  managerAppBar: {
    backgroundColor: "orange",
    height: "10em"
  },
  umpireAppBar: {
    backgroundColor: "#4242f4",
    height: "10em"
  },
  menuItem: {
    backgroundColor: "white"
  }
};

class ManagerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleCallToRouter = this.handleCallToRouter.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goToSchedule=this.goToSchedule.bind(this);

    this.state = {
      logged: null,
      manager: false,
      org: false,
      coach: false,
      umpire: false,
        goToSchedule:false,
    };
  }
  logOut = () => {
    logOut(localStorage.id_token);
    this.setState({ logged: false });

    localStorage.removeItem("id_user");
    localStorage.removeItem("first_name");
    localStorage.removeItem("id_token");
    localStorage.removeItem("last_name");
    localStorage.removeItem("type");
    window.location.replace("/");
  };
  handleCallToRouter = value => {
    this.props.history.push(value);
  };
  goToSchedule=()=>{
    this.setState({goToSchedule:true});
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
        <Tab label="Tournaments" value={"/tournaments"} />
        <Tab label="Rankings" value={"/rankings"} />
        <Tab label="Points Distribution Methods" />
        <Tab label="Money Distribution Methods" />
      </Tabs>
    );

    const Logged = (props) => (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem primaryText="Logout" onClick={this.logOut} />
            {this.props.type==="Coach" ? <MenuItem primaryText="schedule" onClick={this.goToSchedule} />:''}
        </IconMenu>
      </div>
    );

    const Login = () => (
      <FlatButton
        style={this.props.type === "Coach" ? styles.iconCoach : styles.icon}
        label="Login"
      />
    );

    return (
      <AppBar
        titleStyle={
          this.props.type === "Coach"
            ? styles.coachTitleStyle
            : styles.titleStyle
        }
        title={`Welcome ${this.props.type} ${this.props.first_name} ${
          this.props.last_name
        }`}
        style={
          this.props.type === "Coach"
            ? styles.coachAppBar
            : this.props.type === "Organization Manager"
              ? styles.orgAppBar
              : this.props.type === "Tournament Manager"
                ? styles.managerAppBar
                : styles.umpireAppBar
        }
        iconElementLeft={this.state.logged ? <Logged /> : <Login />}
      >
        <div className="row">
          <div class="col-md-12 ">{this.state.manager ? <tabs /> : ""}</div>
        </div>
          {this.state.goToSchedule ? <Redirect to="/coach/tournaments"/>:''}
      </AppBar>
    );
  }
}

export default withRouter(ManagerHeader);
