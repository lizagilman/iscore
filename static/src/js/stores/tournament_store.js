import { observable, action } from 'mobx';
import { getTournamentByIDApi, editTournamentApi } from '../api';

class TournamentStore {
  @observable tournament = {};

  @action
  getTournament = (id) => {
    getTournamentByIDApi(id).then((tournamentJson) => {
    this.tournaments = tournamentJson;
    });
  };

  @action
  setCurrentTournament = (tournament) => {
    this.tournament = tournament;
  };

  @action
  updateTournament = (tournament) => {
    editTournamentApi(tournament).then((response) => {
      if (response.status >= 400) {
        alert('Failed to save');
      }
    });
  };
}

const tournamentStore = new TournamentStore();

export default tournamentStore;
