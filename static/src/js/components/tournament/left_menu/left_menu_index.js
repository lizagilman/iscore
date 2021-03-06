import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/svg-icons/action/list';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import SuperVisorAccount from 'material-ui/svg-icons/action/supervisor-account';
// eslint-disable-next-line
import { default as ScheduleIcon } from "material-ui/svg-icons/action/schedule";
// eslint-disable-next-line
import { default as SettingsIcon } from "material-ui/svg-icons/action/settings";
import PieChart from 'material-ui/svg-icons/editor/pie-chart';
import BasicInfo from '../basic_info/basic_info_index';
import Draws from '../draws/draws_index';
import Schedule from '../schedule/schedule_index';
import Settings from '../settings/settings_index';
import Statistics from '../statistics/statistics_index';

import EntriesAndSeeds from '../entries_and_seeds/entries_and_seeds_index';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    boxShadow: 0,
    width: '10%',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

class LeftMenu extends React.Component {
  render() {
    const contentSwitcher = (content, title) => e => this.props.mainContentSwitcher(e, content, title);

    return (
      <div>
        <Paper style={style.paper}>
          <Menu style={{ border: 'none' }}>
            <MenuItem
              primaryText="Basic Info"
              leftIcon={<InfoOutline />}
              onClick={contentSwitcher(
                <BasicInfo isForm={true} />,
                'Basic Info',
              )}
            />
            <MenuItem
              primaryText="Entries and Seeds"
              leftIcon={<SuperVisorAccount />}
              onClick={contentSwitcher(
                <EntriesAndSeeds />,
                'Entries and Seeds',
              )}
            />
            <MenuItem
              primaryText="Draws"
              leftIcon={<List />}
              onClick={contentSwitcher(
                <Draws tournamentId={this.props.tournamentId} />,
                'Draws',
              )}
            />
            <MenuItem
              primaryText="Schedule"
              leftIcon={<ScheduleIcon />}
              onClick={contentSwitcher(
                <Schedule tournamentId={this.props.tournamentId} />,
                'Schedule',
              )}
            />
            <MenuItem
              primaryText="Settings"
              leftIcon={<SettingsIcon />}
              onClick={contentSwitcher(<Settings />, 'Settings')}
            />
            <MenuItem
              primaryText="Statistics"
              leftIcon={<PieChart />}
              onClick={contentSwitcher(<Statistics />, 'Statistics')}
            />
          </Menu>
        </Paper>
      </div>
    );
  }
}
export default LeftMenu;
