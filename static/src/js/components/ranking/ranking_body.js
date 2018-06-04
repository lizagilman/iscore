import React from 'react';
import Tab from 'material-ui/Tabs/Tab';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const getFlagIcon = (countryCode) => {

  switch (countryCode) {
    case 'ISR':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Israel.png';
    case 'FRA':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_France.png';
    case 'BEL':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Belgium.png';
    case 'ITA':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Italy.png';
    case 'ESP':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Spain.png';
    case 'POL':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Poland.png';
    case 'IRL':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Ireland.png';
    case 'BUL':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Bulgaria.png';
    case 'NED':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Netherlands.png';
    case 'CRO':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Croatia.png';
    case 'AUS':
      return 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Austria.png';
    default:
      return false;
  }
};

const createRow = (item, index) => (
  <TableRow key={index}>
    <TableRowColumn>{item.rank}</TableRowColumn>
    <TableRowColumn>
      <div>
        <img
          className={'flag'}
          src={getFlagIcon(item.nationality)}
          data-toggle="tooltip"
          title={item.nationality}
        />
        <span>{item.player}</span>
      </div>
    </TableRowColumn>
    <TableRowColumn>{item.points}</TableRowColumn>
    <TableRowColumn>{Math.floor(Math.random() * 14) + 1}</TableRowColumn>
  </TableRow>
);

const createTable = rankedPlayers => (
  <Table style={{ backgroundColor: '#ffffff' }}>
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Points</TableHeaderColumn>
        <TableHeaderColumn>Tournaments Played</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {rankedPlayers.map((player, index) => createRow(player, index))}
      )}
    </TableBody>
  </Table>
);

const createTab = (category, rankedPlayersInCategory, index) => (
  <Tab label={category} value={index} key={index}>
    {createTable(rankedPlayersInCategory)}
  </Tab>
);

export const createTabs = (data) => {
  const tabs = [];

  Object.keys(data).forEach((category, index) => {
    const rankedPlayersInCategory = data[category];
    if (rankedPlayersInCategory.length) {
      tabs.push(createTab(category, rankedPlayersInCategory, index + 1));
    }
  });
  return tabs;
};
