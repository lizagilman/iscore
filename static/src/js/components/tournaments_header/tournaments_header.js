import React from "react";
import AppBar from "material-ui/AppBar";
import Tabs from "material-ui/Tabs/Tabs";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Menu from "material-ui/svg-icons/navigation/menu";
import Close from "material-ui/svg-icons/navigation/close";
import FlatButton from "material-ui/FlatButton";
import Tab from "material-ui/Tabs/Tab";
import { withRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { GetUser, logOut } from "../../api";
import Drawer from "material-ui/Drawer";

const styles = {
  iscore: {
    fontSize: "3em",
    color: "white",
    height: "70px",
    display: "block"
  },

  drawerElementsLabel: {
    fontSize: "3em",
    color: "rgb(0, 150, 136)"
  },
  drawerElementsStyle: {
    display: "block",
    lineHeight: "5em",
    height: "5em",
    weight: "100%",
    marginTop: "1%",
    marginBottom: "1%",
    paddingTop: "2%",
    paddingBottom: "2%"
  },
  menuButton: {
    marginRight: "20px",
    height: "7em",
    width: "3em"
  },
  menuIcon: {
    // padding: '-12px',
    color: "white",
    width: "53px",
    height: "55px"
  },

  coachTitleStyle: {
    fontSize: "3em",
    marginBottom: "1%",
    color: "white",
    display: "block",
    height: "40px"
  },
  titleStyle: {
    marginLeft: "2%"
  },
  icon: {
    color: "white",
    fontSize: "3em"
  },
  iconCoach: {
    color: "white",
    marginTop: "1em",
    fontSize: "3em"
  },
  coachAppBar: {
    flexWrap: "wrap",
    lineHeight: "4em",
    paddingRight: "70px"
  },
  tabs: {
    width: "100%",
    height: "20px",
    backgroundColor: "gray"
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
    this.goToSchedule = this.goToSchedule.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      logged: null,
      manager: false,
      org: false,
      coach: false,
      umpire: false,
      goTo: false,
      open: false
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
  handleCallToRouter = value => {
    this.props.history.push(value);
  };
  goToSchedule = e => {
    this.setState({ goTo: true });
    this.handleToggle(e);
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
    const Logged = props => (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
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
          width="50%"
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
        </Drawer>
      </div>
    );
    const Iscore = () => (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <FlatButton label="ISCORE" labelStyle={styles.iscore} />
        </div>
      </div>
    );
    const Login = () => (
      <FlatButton
        style={this.props.type === "Coach" ? styles.iconCoach : styles.icon}
        label="Login"
      />
    );

    return (
      <div>
        <AppBar
          title={
            localStorage.type != "coach"
              ? `Welcome ${this.props.type} ${this.props.first_name} ${
                  this.props.last_name
                }`
              : ""
          }
          titleStyle={localStorage.type != "coach" ? styles.titleStyle : ""}
          style={
            this.props.type === "Coach"
              ? styles.coachAppBar
              : this.props.type === "Organization Manager"
                ? styles.orgAppBar
                : this.props.type === "Tournament Manager"
                  ? styles.managerAppBar
                  : styles.umpireAppBar
          }
          iconElementLeft={<Iscore />}
          iconElementRight={
            this.state.logged ? (
              this.props.type === "Coach" || localStorage.type === "coach" ? (
                <LoggedCoach />
              ) : (
                <Logged />
              )
            ) : (
              <Login />
            )
          }
        >
          {localStorage.type === "coach" ? (
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <FlatButton
                  label={`Welcome ${this.props.type} ${this.props.first_name} ${
                    this.props.last_name
                  }`}
                  labelStyle={
                    this.props.type === "Coach"
                      ? styles.coachTitleStyle
                      : styles.titleStyle
                  }
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.goTo && !this.state.open ? (
            <Redirect to="/coach/tournaments" />
          ) : (
            ""
          )}
        </AppBar>
        <div>
          {localStorage.type === "manager" ? (
            <div className="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">{tabs}</div>
            </div>
          ) : (
            ""
          )};
        </div>
      </div>
    );
  }
}

export default withRouter(ManagerHeader);
