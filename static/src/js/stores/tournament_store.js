import { observable, action } from 'mobx';
import {
  getTournamentByIDApi,
  editTournamentApi,
  deleteTournamentApi,
  getTournamentCategoriesByTournament,
} from '../api';

class TournamentStore {
  @observable tournament = null;
  @observable tournamentCategories = [];
  @observable matches = null;

  @action
  fetchTournament = (id) => {
    getTournamentByIDApi(id).then((tournamentJson) => {
      this.tournament = tournamentJson;

      this.getCategories(tournamentJson.id);
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

  // @action
  // eslint-disable-next-line

  // getCategories = id => {
  //   if (
  //     this.tournament &&
  //     (id || this.tournament.id) &&
  //     !this.tournamentCategories.length
  //   ) {
  //     getTournamentCategoriesByTournament(id || this.tournament.id).then((response) => {
  //       this.tournamentCategories = response;
  //
  //       return response;
  //
  //     });
  //   } else if (this.tournamentCategories.length) {
  //     return this.tournamentCategories;
  //   }
  @action
  getCategories = () => {
    if (!this.tournament && this.tournament.id) {
      return Promise.resolve([]);
    }

    if (this.tournamentCategories.length) {
      return Promise.resolve(this.tournamentCategories);
    }

    return getTournamentCategoriesByTournament(this.tournament.id).then((response) => {
      this.tournamentCategories = response;
      return this.tournamentCategories;
    });
  };

  @action getTournamentId = () => this.tournament.id;
  @action getTournament = () => this.tournament;
}

const tournamentStore = new TournamentStore();

export default tournamentStore;
