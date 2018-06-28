import React from 'react';
import { inject, observer } from 'mobx-react';
import Subheader from 'material-ui/Subheader';
import { Redirect } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Spinner from '../spinner/spinner';

const mobx = require('mobx');

const styles = {
  matchStyle: {
    fontSize: '3em',
    height: '4em',
    weight: '100%',
  },
  matchStyleSecondary: {
    lineHeight: '44px',
    marginTop: '5%',
    fontSize: '1em',
    height: '4em',
    weight: '100%',
  },
  header: {
    height: '2em',
    fontSize: '3em',
    lineHeight: '44px',
    weight: '100%',
  },
};

const dateFormat = require('dateformat');

@inject('stores')
@observer
export default class ScheduleCoach extends React.Component {
  constructor(props) {
    super(props);
    this.setDateTime = this.setDateTime.bind(this);

    this.state = {
      matches: null,
    };

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
    const { CoachEnterPlayersStore } = this.props.stores;
    const tournament = mobx.toJS(CoachEnterPlayersStore.getSelectedTournament());
    const tournamentId = tournament
      ? tournament.id
      : this.props.match.params.id;
    if (!tournamentId) {
      this.setState({ error: true });
      return;
    }
    CoachEnterPlayersStore.fetchMatches(tournamentId).then((matches) => {
      matches = mobx.toJS(matches);
      this.setState({ matches });
    });
  }

  render() {
    const createList = (match, index) => (
      <ListItem
        primaryText={match.stage ? match.stage : ''}
        secondaryText={
          match ? (
            <p style={styles.matchStyleSecondary}>
                {match.player1 != null && match.player2 != null ? `${match.player1} VS ${match.player2}` : ''}
            </p>
          ) : (
            ''
          )
        }
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        style={styles.matchStyle}
        nestedItems={[
          <ListItem
            style={styles.matchStyle}
            key={1}
            primaryText="Category:"
            secondaryText={
              match ? (
                <p style={styles.matchStyleSecondary}>{match.category}</p>
              ) : (
                ''
              )
            }
          />,
          <ListItem
            style={styles.matchStyle}
            key={2}
            primaryText="Player 1:"
            secondaryText={
              match ? (
                <p style={styles.matchStyleSecondary}>{match.player1}</p>
              ) : (
                ''
              )
            }
          />,
          <ListItem
            style={styles.matchStyle}
            key={3}
            primaryText="Player 2:"
            secondaryText={
              match ? (
                <p style={styles.matchStyleSecondary}>{match.player2}</p>
              ) : (
                ''
              )
            }
          />,
          <ListItem
            style={styles.matchStyle}
            key={4}
            primaryText="Date and Time:"
            secondaryText={
              match ? (
                <p style={styles.matchStyleSecondary}>
                  {this.setDateTime(match.time)}
                </p>
              ) : (
                ''
              )
            }
          />,
          <ListItem
            style={styles.matchStyle}
            key={5}
            primaryText="Winner:"
            secondaryText={
              match ? (
                <p style={styles.matchStyleSecondary}>{match.winner}</p>
              ) : (
                ''
              )
            }
          />,
        ]}
      />
    );

    const scheduleList = (
      <div>
        <List>
          <Subheader style={styles.header}>
            {this.props.location.state
              ? this.props.location.state.tournamentName
              : 'Matches'}
          </Subheader>
          {this.state.matches ? (
            this.state.matches.map((Match, index) => createList(Match, index))
          ) : (
            <div>{Spinner(70)}</div>
          )}
        </List>
      </div>
    );
    const HomePage = <Redirect to={{ path: '/coach' }} />;

    return <div>{!this.state.error ? scheduleList : HomePage}</div>;
  }
}
