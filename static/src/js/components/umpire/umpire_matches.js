import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MainCard from '../main_card/main_card_index';
import Spinner from '../spinner/spinner';

const mobx = require('mobx');

const scheduleTableStyleStart = {
  paddingLeft: '4em',
  paddingRight: '0px',
  width: '12.5%',

};
const scheduleTableStylePlayer1 = {
  display: 'inline-block',
  paddingLeft: '10px',
  paddingRight: '0px',
  width: '12.5%',
};
const scheduleTableHeader = {
  paddingLeft: '0px',
  paddingRight: '0px',
};
const scheduleTableStylePlayer2 = {
  display: 'inline-block',
  paddingLeft: '10px',
  paddingRight: '0px',
  width: '12.5%',
};

const scheduleTableStyleStage = {
  display: 'inline-block',
  paddingLeft: '6em',
  paddingRight: '0px',
  width: '12.5%',
};
const scheduleTableStyleTime = {
  display: 'inline-block',
  paddingLeft: '0px',
  paddingRight: '0px',
  width: '12.5%',
};
const scheduleTableStyle = {
  backgroundColor: 'white',
};
const scheduleTableStyleCourt = {
  display: 'inline-block',
  paddingLeft: '2em',
  paddingRight: '0px',
  width: '12.5%',
};
const scheduleTableStyleCategory = {
  display: 'inline-block',
  paddingLeft: '10px',
  paddingRight: '0px',
  width: '12.5%',
};
const scheduleTableStyleWinner = {
  display: 'inline-block',
  paddingLeft: '10px',
  paddingRight: '0px',
  width: '12.5%',
};

const dateFormat = require('dateformat');

@inject('stores')
@observer
export default class UmpireMatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setDateTime = this.setDateTime.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
  }

  // eslint-disable-next-line
  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date);
    return formateDate;
  }

  onLinkClick(id) {
    console.log('id:', id);
    const { UmpireStore } = this.props.stores;


    const storedMatches = UmpireStore.matches;

    console.log('matches:', mobx.toJS(storedMatches)[0]);

    const singleMatch = mobx.toJS(storedMatches)[0].find(match => match.id === id);
    UmpireStore.setSingleMatch(singleMatch);
    console.log('singleMatch', singleMatch);
  }

  updateMatch(e, matchId, winner) {
    e.preventDefault();
    const { MatchesStore } = this.props.stores;

    MatchesStore.updateMatch(matchId, winner);
  }

  componentWillMount() {
    const { UmpireStore } = this.props.stores;
    const tournamentId =
      this.props.tournamentId || UmpireStore.getTournamentId();

    UmpireStore.fetchMatches(tournamentId);
  }

  render() {
    const { UmpireStore } = this.props.stores;
    const storedMatches = UmpireStore.matches;
    console.log('matches:', mobx.toJS(storedMatches));

    const data =
      storedMatches && storedMatches.length > 0
        ? mobx.toJS(storedMatches)[0]
        : false;
    console.log('data: ', data);
    const createRow = (match, index) => (
      <TableRow class={'row'} key={index}>
          <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStyleStart}>
               <Link to={`/umpire/match/${match.id}`}>
                    <div onClick={() => this.onLinkClick(match.id)}>
                        <h3>START</h3>
                    </div>
               </Link>
          </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStyleStage}>
          {match.stage ? match.stage : ''}
        </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStylePlayer1}>
          <a
            title={'update match winner'}
            href={'#'}
            onClick={e => this.updateMatch(e, match.id, 'player1')}
          >
            {match.player1 ? match.player1 : ''}
          </a>
        </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStylePlayer2}>
          <a
            href={'#'}
            title={'update match winner'}
            onClick={e => this.updateMatch(e, match.id, 'player2')}
          >
            {match.player2 ? match.player2 : ''}
          </a>
        </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStyleTime}>
          {match ? this.setDateTime(match.time) : ''}
        </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStyleCourt}>
          {match.court ? match.court : ''}
        </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStyleCategory}>
          {match.category ? match.category : ''}
        </TableRowColumn>
        <TableRowColumn class={'col-lg-1.5 col-md-1.5 col-sm-1.5'} style={scheduleTableStyleWinner}>
          {match.winner ? match.winner : ''}
        </TableRowColumn>
      </TableRow>
    );

    const scheduleTable = (
      <div>
        <Table style={scheduleTableStyle}>
          <TableHeader class={'row'} displaySelectAll={false}>
            <TableRow class={'col-lg-12 col-md-12 col-sm-12'}>
                <TableHeaderColumn></TableHeaderColumn>
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


    return (
      <div>
        <MainCard
          title={'Matches'}
          content={scheduleTable}
          style={{ flex: 1, height: '100%', margin: '1vw 2vw 0 2vw' }}
        />
      </div>
    );
  }
}
