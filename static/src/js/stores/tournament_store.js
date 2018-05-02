import { observable, action } from 'mobx';
import {
  getTournamentByIDApi,
  editTournamentApi,
  deleteTournamentApi,
  getTournamentCategoriesByTournament,
} from '../api';

class TournamentStore {
  @observable tournament = {};
  @observable tournamentCategories = [];

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

  @action
  deleteTournament = (id) => {
    deleteTournamentApi(id).then((response) => {
      if (response.status >= 400) {
        alert('Failed to delete');
      }
    });
  };

  @action
  // eslint-disable-next-line
  getCategories = () => {
    if (this.tournament.id && !this.tournamentCategories.length) {
      getTournamentCategoriesByTournament(this.tournament.id).then((response) => {
        this.tournamentCategories = response;
      });
    } else if (this.tournamentCategories.length) {
      return this.tournamentCategories;
    }
  };

  @action getTournamentId = () => this.tournament.id;
}

const tournamentStore = new TournamentStore();

export default tournamentStore;
