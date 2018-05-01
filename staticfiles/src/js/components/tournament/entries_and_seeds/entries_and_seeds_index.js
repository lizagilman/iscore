import React from 'react';
import { inject, observer } from 'mobx-react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
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


function sortBy(data, prop, isAsc) {
  isAsc = isAsc === undefined ? true : isAsc;

  return [].concat(data).sort((a, b) => {
    const diff = a[prop] - b[prop];
    if (isAsc) {
      return diff > 0 ? 1 : -1;
    }
    return diff < 0 ? 1 : -1;
  });
}
const entrieDoc = [];
const sorted = [];
@inject('stores')
@observer
export default class EntriesAndSeeds extends React.Component {
  constructor(props) {
    super(props);

    this.filterEntriesByName = this.filterEntriesByName.bind(this);

    this.state = {
      sortedEntries: null,
      slideIndex: 0,
      tournament: null,
      entries: null,
      categories: null,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  filterEntriesByName = (entry, name) => entry.tournament_category === name;
  componentDidMount() {
    console.log('componentDidMount:: loading...');

    const { TournamentStore, CategoryStore } = this.props.stores;

    // Bring current tournament
    const tournament = mobx.toJS(TournamentStore.tournament)
      ? mobx.toJS(TournamentStore.tournament)
      : ' ';
    this.setState({ tournament });

    console.log('tournament', tournament);
    const self = this;
    // Bring categories by the tournament id
    CategoryStore.CategoriesByTournament(tournament.id).then((storedCategories) => {
      self.setState({ categories: mobx.toJS(storedCategories) });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.categories !== prevState.categories) {
      console.log('category: ', this.state.categories);
      const self = this;
      this.state.categories
        ? this.state.categories.map((category, index) => {
          const { EntriesStore } = self.props.stores;

          category && EntriesStore
            ? EntriesStore.fetchEntriesByCategory(category.id).then((storedPlayers) => {
              entrieDoc.push(mobx.toJS(storedPlayers));
              self.setState({ entries: entrieDoc }, () => {
                console.log('entries: ', this.state.entries);
              });
              // let rawData = entrieDoc[category.id];
              //
              // console.log('componentDidMount::rawData', [].concat(rawData));
              // const data = sortBy(
              //     rawData
              //     , 'rank'/* param To Sort By */
              //     , false, /* sort ascending */
              // );
            })
            : console.log('loading');
        })
        : console.log('loading categories: ', this.state.categories);
    }
  }

  render() {
    const createRow = (item, index) => (
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
          <TableRowColumn style={entriesTableStyleSeed}>Seeded</TableRowColumn>
        ) : (
          <TableRowColumn style={entriesTableStyleSeed} />
        )}
      </TableRow>
    );

    const entriesTable = (num) => {
      {
        console.log('num: ', num);
        console.log('entries[num]: ', this.state.entries[num]);
      }
      return (
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
              {this.state.entries.length ? (
                this.state.entries[num].map((Entrie, index) =>
                  createRow(Entrie, index))
              ) : (
                <h3>loading</h3>
              )}
            </TableBody>
          </Table>
        </div>
      );
    };
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab
            label={
              this.state.categories
                ? this.state.categories[0].category
                : 'loading'
            }
            value={0}
          />
          <Tab
            label={
              this.state.categories
                ? this.state.categories[1].category
                : 'loading'
            }
            value={1}
          />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            {this.state.categories &&
            this.state.entries &&
            this.state.slideIndex == 0 ? (
              entriesTable(this.state.slideIndex)
            ) : (
              <h4>loading entries</h4>
            )}
          </div>
          <div>
            {this.state.categories &&
            this.state.entries &&
            this.state.slideIndex == 1 ? (
              entriesTable(this.state.slideIndex)
            ) : (
              <h4>loading entries</h4>
            )}
          </div>
        </SwipeableViews>
      </div>
    );
  }
}