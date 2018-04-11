import { observable, action } from 'mobx';
import { getAllTournamentsApi } from '../api';

class TournamentsStore {
  @observable allTournaments = [];

  @action
  fetchAllTournaments = () => {
    getAllTournamentsApi().then((tournamentsJson) => {
      this.allTournaments = [tournamentsJson];
    });
  };

  @action setTournament = () => {};
}

const tournamentsStore = new TournamentsStore();

export default tournamentsStore;
