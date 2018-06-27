import { inject, observer } from 'mobx-react/index';
import React from 'react';
import { Redirect } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import * as mobx from 'mobx';

const styles = {
  buttonStyle: {
    lineHeight: '5em',
    height: '5em',
    weight: '100%',
    marginTop: '1%',
    marginBottom: '1%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  labelStyle: {
    fontSize: '2.5em',
  },
};
@inject('stores')
@observer
export default class ScheduleCoachTournaments extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectedTournament = this.handleSelectedTournament.bind(this);

    this.state = {
      tournaments: null,
      selectedTournament: null,
    };
  }

  componentWillMount() {
    const self = this;
    const { CoachEnterPlayersStore } = this.props.stores;
    CoachEnterPlayersStore.fetchAllTournaments().then((storedTournaments) => {
      self.setState({ tournaments: mobx.toJS(storedTournaments) });
    });
  }
  handleSelectedTournament = (tour) => {
    console.log(`handleSelectedTournament ${JSON.stringify(tour)}`, tour);
    const { CoachEnterPlayersStore } = this.props.stores;
    CoachEnterPlayersStore.setSelectedTournament(tour);
    this.setState({ selectedTournament: tour });
  };
  render() {
    const createTournamentButton = tour => (
      <RaisedButton
        style={styles.buttonStyle}
        label={tour.name}
        labelStyle={styles.labelStyle}
        fullWidth={true}
        onClick={() => this.handleSelectedTournament(tour)}
      />
    );
    return (
      <div>
        {this.state.tournaments
          ? this.state.tournaments.map(tournament =>
              createTournamentButton(tournament))
          : ''}
        {this.state.selectedTournament ? (
          <Redirect
            to={{
              pathname: `/coach/tournaments/${
                this.state.selectedTournament.id
              }`,
              state: { tournamentName: this.state.selectedTournament.name },
            }}
          />
        ) : (
          false
        )}
      </div>
    );
  }
}
