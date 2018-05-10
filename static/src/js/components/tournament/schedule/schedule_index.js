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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Spinner from '../../spinner/spinner';

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

  // eslint-disable-next-line
  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date);
    return formateDate;
  }

  updateMatch(e, matchId, winner) {
    e.preventDefault();
    const { MatchesStore } = this.props.stores;


    MatchesStore.updateMatch(matchId, winner);
  }

  componentWillMount() {
    const { TournamentStore, MatchesStore } = this.props.stores;
    const tournamentId = TournamentStore.getTournamentId();

    MatchesStore.updateParamValue('tournamentId', tournamentId);

    MatchesStore.fetchMatches(tournamentId);
  }

  render() {
    const { MatchesStore } = this.props.stores;

    const { scheduleParams } = MatchesStore;

    const storedMatches = MatchesStore.matches;

    const data =
      storedMatches && storedMatches.length > 0
        ? mobx.toJS(storedMatches)[0]
        : false;

    const createRow = (match, index) => (
      <TableRow key={index}>
        <TableRowColumn style={scheduleTableStyleStage}>
          {match.stage ? match.stage : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStylePlayer1}>
          <a title={'update match winner'} href={'#'} onClick={e => this.updateMatch(e, match.id, "player1")}>
            {match.player1 ? match.player1 : ''}
          </a>
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStylePlayer2}>
            <a href={'#'} title={'update match winner'}  onClick={e => this.updateMatch(e, match.id, "player2")}>
            {match.player2 ? match.player2 : ''}
          </a>
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleTime}>
          {match ? this.setDateTime(match.time) : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleCourt}>
          {match.court ? match.court : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleCategory}>
          {match.category ? match.category : ''}
        </TableRowColumn>
        <TableRowColumn style={scheduleTableStyleWinner}>
          {match.winner ? match.winner : ''}
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
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data ? (
              data.map((Match, index) => createRow(Match, index))
            ) : (
              <div>{Spinner(70)}</div>
            )}
          </TableBody>
        </Table>
      </div>
    );

    const scheduleParamsForm = (
      <div>
        <TextField
          defaultValue={
            scheduleParams.start_hour ? scheduleParams.start_hour : ''
          }
          floatingLabelText={'Start Hour'}
          style={{ marginRight: '2%' }}
          onChange={(event) => {
            event.preventDefault();
            MatchesStore.updateParamValue('startHour', event.target.value);
          }}
        />
        <TextField
          defaultValue={
            scheduleParams.finish_hour ? scheduleParams.finish_hour : ''
          }
          style={{ marginRight: '2%' }}
          floatingLabelText={'End Hour'}
          onChange={(event) => {
            event.preventDefault();
            MatchesStore.updateParamValue('finishHour', event.target.value);
          }}
        />
        <TextField
          defaultValue={
            scheduleParams.num_of_courts ? scheduleParams.num_of_courts : ''
          }
          style={{ marginRight: '2%' }}
          floatingLabelText={'Number of Courts'}
          onChange={(event) => {
            event.preventDefault();
            MatchesStore.updateParamValue('numOfCourts', event.target.value);
          }}
        />
        <TextField
          defaultValue={
            scheduleParams.game_duration ? scheduleParams.game_duration : ''
          }
          style={{ marginRight: '2%' }}
          floatingLabelText={'Match Duration'}
          onChange={(event) => {
            event.preventDefault();
            MatchesStore.updateParamValue('matchDuration', event.target.value);
          }}
        />

        <div>
          <FlatButton
            label="Generate Schedule"
            primary={true}
            onClick={() => {
              MatchesStore.createSchedule();
              this.forceUpdate();
            }}
          />
          <FlatButton
            label="Delete Schedule"
            primary={true}
            onClick={() => {
              MatchesStore.deleteSchedule();
            }}
          />
        </div>
      </div>
    );

    return (
      <div>
        {scheduleParamsForm}
        {scheduleTable}
      </div>
    );
  }
}
