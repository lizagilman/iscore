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

const schedule_table_style_digit = {
  paddingLeft:'77px',
};
const schedule_table_style_word = {
  paddingLeft:'60px',
};
const schedule_table = {
  backgroundColor:'white',
};
const schedule_table_style_court = {
  paddingLeft:'55px',
};
const schedule_table_style_category = {
  paddingLeft:'40px',
};
const schedule_table_style_winner= {
  paddingLeft:'40px',
};
@inject('stores')
@observer
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    console.log('will mount');
  //  const { MatchesStore } = this.props.stores;
   // MatchesStore.fetchAllMatchs();
  }

  render() {
    console.log('will render');
    const { MatchesStore } = this.props.stores;

    const storedMatches = MatchesStore.allMatches;

    //const data = storedMatches && storedMatches.length > 0 ? mobx.toJS(storedMatches)[0] : false;

    const createRow = (item, index) => {
      console.log('will create row');

      return (
        <TableRow key={index}>
            <TableRowColumn style={schedule_table_style_digit} >{item.index}</TableRowColumn>
          <TableRowColumn style={schedule_table_style_digit}>{item.stage}</TableRowColumn>
          <TableRowColumn style={schedule_table_style_word} >{item.player1}</TableRowColumn>
          <TableRowColumn style={schedule_table_style_word}>{item.player2}</TableRowColumn>
          <TableRowColumn>{item.time}</TableRowColumn>
            <TableRowColumn style={schedule_table_style_court}>{item.court}</TableRowColumn>
            <TableRowColumn style={schedule_table_style_category}>{item.draws}</TableRowColumn>
            <TableRowColumn style={schedule_table_style_winner}>{item.winner}</TableRowColumn>
        </TableRow>

      );
    };

    const scheduleTable = (
      <div>
        <Table style={schedule_table} >
          <TableHeader displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn >Index</TableHeaderColumn>
              <TableHeaderColumn >Stage</TableHeaderColumn>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
                <TableHeaderColumn>Court</TableHeaderColumn>
                <TableHeaderColumn>Category</TableHeaderColumn>
                <TableHeaderColumn>Winner</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {console.log('schedule table')}
            {storedMatches
              ? storedMatches.map((Match, index) => createRow(Match, index))
              : 'Loading...'}
          </TableBody>
        </Table>
      </div>
    );

    return <div>{scheduleTable}</div>;
  }
}
