import { observable, action } from 'mobx';
import { getAllTournamentsApi, editTournamentApi } from '../api';

class TournamentsStore {
  @observable allTournaments = [];

  @action
  fetchAllTournaments = () => {
    getAllTournamentsApi().then((tournamentsJson) => {
      this.allTournaments = tournamentsJson;
    });
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

const tournamentsStore = new TournamentsStore();

export default tournamentsStore;
