import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Settings from 'material-ui/svg-icons/action/settings';
import List from 'material-ui/svg-icons/action/list';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import SuperVisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import PieChart from 'material-ui/svg-icons/editor/pie-chart';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    boxShadow: 0,
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const LeftMenu = () => (
  <div style={{ margin: '1vw 0vw 0vw 2vw' }}>
    <Paper style={style.paper}>
      <Menu style={{ border: 'none' }}>
        <MenuItem primaryText="Basic Info" leftIcon={<InfoOutline />} />
        <MenuItem
          primaryText="Entries and Seeds"
          leftIcon={<SuperVisorAccount />}
        />
        <MenuItem primaryText="Draws" leftIcon={<List />} />
        <MenuItem primaryText="Schedule" leftIcon={<Schedule />} />
        <MenuItem primaryText="Settings" leftIcon={<Settings />} />
        <MenuItem primaryText="Statistics" leftIcon={<PieChart />} />
      </Menu>
    </Paper>
  </div>
);

export default LeftMenu;
