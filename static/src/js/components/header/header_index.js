import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { withRouter } from 'react-router-dom';

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleCallToRouter = this.handleCallToRouter.bind(this);
  }

  handleCallToRouter = (value) => {
    this.props.history.push(value);
  };

  render() {
    return (
      <AppBar
        title="iSCORE"
        style={styles.appBar}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      >
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
      </AppBar>
    );
  }
}

export default withRouter(Header);
