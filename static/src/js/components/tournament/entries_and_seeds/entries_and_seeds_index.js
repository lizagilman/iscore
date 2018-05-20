import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tabs, Tab } from 'material-ui/Tabs';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const mobx = require('mobx');

const EntriesTableStyleIndex = {
  paddingLeft: '72px',
};
const EntriesTableStylePlayer = {
  paddingLeft: '38px',
};
const entriesTableStyleRank = {
  paddingLeft: '60px',
};
const entriesTableStyleSeed = {
  paddingLeft: '50px',
};
const entriesTableStyle = {
  backgroundColor: 'white',
};

@inject('stores')
@observer
export default class EntriesAndSeeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedEntries: null,
      slideIndex: 0,
      entries: null,
      categoriesEntries: null,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  componentWillMount() {
    const { TournamentStore, EntriesStore } = this.props.stores;

    const self = this;

    TournamentStore.getCategories().then((categoriesRaw) => {
      const categoriesFromStore = mobx.toJS(categoriesRaw);

      self.setState({ slideIndex: categoriesFromStore[0].id });

      categoriesFromStore.forEach((category) => {
        let categoriesEntries = [];
        EntriesStore.fetchEntriesByCategory(category.id).then((entries) => {
          if (self.state.categoriesEntries) {
            categoriesEntries = self.state.categoriesEntries;
          }
          categoriesEntries.push({
            id: category.id,
            value: mobx.toJS(entries),
          });
          self.setState({ categoriesEntries });
        });
      });
    });
  }

  render() {
    const createButtons = () => (
      <Tabs value={this.state.slideIndex} onChange={this.handleChange}>
        {this.state.categoriesEntries
          ? this.state.categoriesEntries.map(entry => createButton(entry))
          : ''}
      </Tabs>
    );

    const createButton = entry => (
        <Tab
          label={entry ? entry.value[0].tournament_category : 'loading'}
          value={entry.id}
          key={entry.id}
        >
          {entriesTable2(entry)}
        </Tab>
    );

    const entriesTable2 = entry => (
        <div>
          <Table style={entriesTableStyle}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                <TableHeaderColumn>Player</TableHeaderColumn>
                <TableHeaderColumn>Rank</TableHeaderColumn>
                <TableHeaderColumn>Seed</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {createTable2(entry)}
            </TableBody>
          </Table>
        </div>
    );

    const createTable2 = (entry) => {
      const players = this.state.categoriesEntries.filter(ce => ce.id == entry.id);
      if (!players) {
        return;
      }

      const playersTable = craetePlayersTable(players[0].value);

      return playersTable;
    };

    const craetePlayersTable = players =>
      players.map((entry, index) => createRow2(entry, index));

    const createRow2 = (item, index) => (
        <TableRow key={index}>
          <TableRowColumn style={EntriesTableStyleIndex}>
            {index + 1}
          </TableRowColumn>
          <TableRowColumn style={EntriesTableStylePlayer}>
            {item.player}
          </TableRowColumn>
          <TableRowColumn style={entriesTableStyleRank}>
            {item.rank}
          </TableRowColumn>
          {item.is_seeded ? (
            <TableRowColumn style={entriesTableStyleSeed}>
              Seeded
            </TableRowColumn>
          ) : (
            <TableRowColumn style={entriesTableStyleSeed} />
          )}
        </TableRow>
    );

    return (
      <div>
        {this.state.categoriesEntries ? createButtons() : ''}
      </div>
    );
  }
}
