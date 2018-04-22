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

const EntriesTableStylePlayer = {
  paddingLeft: '77px',
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
const sortArrOfObjectsByParam = (arrToSort, paramToSortBy, sortAscending) => {
  if (sortAscending === undefined) sortAscending = true;

  if (sortAscending) {
    return [].slice
      .call(arrToSort)
      .sort((a, b) => a[paramToSortBy] > b[paramToSortBy]);
  }

  return [].slice
    .call(arrToSort)
    .sort((a, b) => a[paramToSortBy] < b[paramToSortBy]);
};

// const sortArrOfObjectsByParam = (arrToSort, paramToSortBy, sortAscending) => {
//   if (sortAscending == undefined) sortAscending = true;
//
//   if (sortAscending) {
//     return [].slice.call(arrToSort).sort(function(a, b) {
//       return a[paramToSortBy] > b[paramToSortBy];
//     });
//     debugger
//   } else {
//     return [].slice.call(arrToSort).sort(function(a, b) {
//       return a[paramToSortBy] < b[paramToSortBy];
//     });
//
//   }
// };

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

    let data =
      storedEntries && storedEntries.length > 0
        ? mobx.toJS(storedEntries)[0]
        : false;

    sortArrOfObjectsByParam(data, "rank");


    const createRow = (item, index) => (
        <TableRow key={index}>
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

    const entriesTable = (
      <div>
        <Table style={entriesTableStyle}>
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
