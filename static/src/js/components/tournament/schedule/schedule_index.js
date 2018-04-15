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
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    console.log('will mount');
    const { MatchesStore } = this.props.stores;
    MatchesStore.fetchAllMatchs();
  }

  render() {
    console.log('will render');
    const { MatchesStore } = this.props.stores;

    const storedMatches = MatchesStore.allMatches;

    const data = storedMatches && storedMatches.length > 0 ? mobx.toJS(storedMatches)[0] : false;

    const createRow = (item, index) => {
      console.log('will create row');

      return (
        <TableRow key={index}>
          <TableRowColumn className={'tableSchedule'}>{item.stage}</TableRowColumn>
          <TableRowColumn >{item.player1}</TableRowColumn>
          <TableRowColumn>{item.player2}</TableRowColumn>
          <TableRowColumn>{item.time}</TableRowColumn>
        </TableRow>
      );
    };

    const scheduleTable = (
      <div>
        <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn >Stage</TableHeaderColumn>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {console.log('schedule table')}
            {data
              ? data.map((Match, index) => createRow(Match, index))
              : 'Loading...'}
          </TableBody>
        </Table>
      </div>
    );

    return <div>{scheduleTable}</div>;
  }
}
