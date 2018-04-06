import React from "react";
import AppBar from "material-ui/AppBar";
import Tabs from "material-ui/Tabs/Tabs";
import Tab from "material-ui/Tabs/Tab";
import { Link } from "react-router-dom";

const styles = {
  appBar: {
    flexWrap: "wrap"
  },
  tabs: {
    width: "100%"
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar
        title="iSCORE"
        style={styles.appBar}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      >
        <Tabs style={styles.tabs}>
          <Tab
            label="Tournaments"
            containerElement={<Link to="/tournaments" />}
          />
          <Tab label="Rankings" />
          <Tab label="Points Distribution Methods" />
          <Tab label="Money Distribution Methods" />
        </Tabs>
      </AppBar>
    );
  }
}
export default Header;
