/* eslint-disable */
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

@inject('stores')
@observer
export default class EntriesAndSeeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    console.log('will mount');
    const { EntriesStore } = this.props.stores;
    EntriesStore.fetchAllEntries();
  }

  render() {
    console.log('will render');
    const { EntriesStore } = this.props.stores;

    const storedEntries = EntriesStore.allEntries;

    const data = storedEntries && storedEntries.length > 0 ? mobx.toJS(storedEntries)[0] : false;

    const createRow = (item, index) => {
      console.log('will create row');

      return (
        <TableRow key={index}>
          <TableRowColumn className={'tableSchedule'}>{item.player}</TableRowColumn>
          <TableRowColumn >{item.rank}</TableRowColumn>
          <TableRowColumn>{item.is_seeded}</TableRowColumn>

        </TableRow>
      );
    };

    const entriesTable = (
      <div>
        <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn >Player</TableHeaderColumn>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Is Seeded</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {console.log('schedule table')}
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
