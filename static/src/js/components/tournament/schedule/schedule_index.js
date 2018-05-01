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
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import categoryStore from '../../../stores/category_store';

const mobx = require('mobx');

const scheduleTableStylePlayer1 = {
  display: 'inline-block',
  paddingLeft: '44px',
  paddingRight: '0px',
  width: '14%',
};
const scheduleTableHeader = {
  paddingLeft: '0px',
  paddingRight: '0px',
};
const scheduleTableStylePlayer2 = {
  display: 'inline-block',
  paddingLeft: '40px',
  paddingRight: '0px',
  width: '14%',
};

const scheduleTableStyleStage = {
  display: 'inline-block',
  paddingLeft: '74px',
  paddingRight: '0px',
  width: '14%',
};
const scheduleTableStyleTime = {
  display: 'inline-block',
  paddingLeft: '27px',
  paddingRight: '0px',
  width: '14%',
};
const scheduleTableStyle = {
  backgroundColor: 'white',
};
const scheduleTableStyleCourt = {
  display: 'inline-block',
  paddingLeft: '47px',
  paddingRight: '0px',
  width: '14%',
};
const scheduleTableStyleCategory = {
  display: 'inline-block',
  paddingLeft: '60px',
  paddingRight: '0px',
  width: '14%',
};
const scheduleTableStyleWinner = {
  display: 'inline-block',
  paddingLeft: '38px',
  paddingRight: '0px',
  width: '14%',
};

const dateFormat = require('dateformat');

@inject('stores')
@observer
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.setDateTime = this.setDateTime.bind(this);

    this.state = {};

    this.updateMatch = this.updateMatch.bind(this);
  }

  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date);
    return formateDate;
  }
  componentWillMount() {
    const { MatchesStore } = this.props.stores;
    MatchesStore.fetchAllMatchs();
  }

  updateMatch(e, match) {
    e.preventDefault();
    const { MatchesStore } = this.props.stores;

    MatchesStore.updateMatch(match.id);
  }

  render() {
    const { MatchesStore } = this.props.stores;

    const storedMatches = MatchesStore.allMatches;

    const data =
      storedMatches && storedMatches.length > 0
        ? mobx.toJS(storedMatches)[0]
        : false;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn style={scheduleTableStyleStage}>
          <a href={'#'} onClick={e => this.updateMatch(e, item)}>
            {' '}
            {item.stage ? item.stage : ''}{' '}
          </a>
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStylePlayer1}>
          {item.player1 ? item.player1 : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStylePlayer2}>
          {item.player2 ? item.player2 : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleTime}>
          {item ? this.setDateTime(item.time) : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleCourt}>
          {item.court ? item.court : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleCategory}>
          {item.draws ? item.draws : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleWinner}>
          {item.winner ? item.winner : ''}
        </TableRowColumn>
      </TableRow>
    );

    const scheduleTable = (
      <div>
        <Table style={scheduleTableStyle}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Stage</TableHeaderColumn>
              <TableHeaderColumn style={scheduleTableHeader}>
                Player
              </TableHeaderColumn>
              <TableHeaderColumn style={scheduleTableHeader}>
                Player
              </TableHeaderColumn>
              <TableHeaderColumn style={scheduleTableHeader}>
                Time
              </TableHeaderColumn>
              <TableHeaderColumn style={scheduleTableHeader}>
                Court
              </TableHeaderColumn>
              <TableHeaderColumn style={scheduleTableHeader}>
                Category
              </TableHeaderColumn>
              <TableHeaderColumn>Winner</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
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
