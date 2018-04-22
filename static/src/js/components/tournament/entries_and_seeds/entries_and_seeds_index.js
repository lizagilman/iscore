import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const mobx = require('mobx');

const entries_table_style_player = {
  paddingLeft: '77px',
};
const entries_table_style_rank = {
  paddingLeft: '60px',
};
const entries_table_style_seed = {
  paddingLeft: '50px',
};
const entries_table = {
  backgroundColor: 'white',
};
const sortArrOfObjectsByParam = (arrToSort, paramToSortBy, sortAscending) => {
  if (sortAscending == undefined) sortAscending = true;

  if (sortAscending) {
    return [].slice.call(arrToSort).sort((a, b) => a[paramToSortBy] > b[paramToSortBy]);
  }
  return [].slice.call(arrToSort).sort((a, b) => a[paramToSortBy] < b[paramToSortBy]);
};

@inject('stores')
@observer
export default class EntriesAndSeeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { EntriesStore } = this.props.stores;
    EntriesStore.fetchAllEntries();
  }

  render() {
    const { EntriesStore } = this.props.stores;

    const storedEntries = EntriesStore.allEntries;

    const data =
      storedEntries && storedEntries.length > 0
        ? mobx.toJS(storedEntries)[0]
        : false;

    sortArrOfObjectsByParam(data, 'rank');

    const createRow = (item, index) => {
      console.log('will create row');

      return (
        <TableRow key={index}>
          <TableRowColumn style={entries_table_style_player}>
            {item.player}
          </TableRowColumn>
          <TableRowColumn style={entries_table_style_rank}>
            {item.rank}
          </TableRowColumn>
          {item.is_seeded ? (
            <TableRowColumn style={entries_table_style_seed}>
              Seeded
            </TableRowColumn>
          ) : (
            <TableRowColumn style={entries_table_style_seed} />
          )}
        </TableRow>
      );
    };

    const entriesTable = (
      <div>
        <Table style={entries_table}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Seed</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data
              ? data.map((Entrie, index) => createRow(Entrie, index))
              : 'Loading...'}
          </TableBody>
        </Table>
      </div>
    );

    return <div>{entriesTable}</div>;
  }
}
