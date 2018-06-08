import { observable, action } from 'mobx';
import { getAllTournamentsApi, editTournamentApi, getAllTournamentsByManagerApi } from '../api';

class TournamentsStore {
  @observable allTournaments = [];
  @observable TournamentsByManager = [];
  @action
  fetchAllTournaments = () => getAllTournamentsApi().then((tournamentsJson) => {
    this.allTournaments = tournamentsJson;
    return this.allTournaments;
  });
  @action
 fetchTournamentsByManagerId = id => getAllTournamentsByManagerApi(id).then((tournamentsJson) => {
   this.TournamentsByManager = tournamentsJson;
   return this.TournamentsByManager;
 });
  @action
  updateTournament = (tournament) => {
    const newTournament = tournament;
    // TO-DO: refactor to dynamic manager id
    newTournament.manager = 1;
    editTournamentApi(newTournament).then((response) => {
      if (response.status >= 400) {
        alert('Failed to save');
      }
    });
  };

  @action
  getSingleTournament = (id) => {
    const singleTournament = this.allTournaments.filter(tournament => tournament.id === id);
    return singleTournament.length ? singleTournament[0] : false;
  };
}

const tournamentsStore = new TournamentsStore();

export default tournamentsStore;
