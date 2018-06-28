import { observable, action } from 'mobx';
import {
  getAllTournamentsApi,
  editTournamentApi,
  getAllTournamentsByManagerApi,
} from '../api';

class TournamentsStore {
  @observable allTournaments = [];
  @observable TournamentsByManager = [];
  @action
  fetchAllTournaments = () =>
    Promise.resolve(getAllTournamentsApi().then((tournamentsJson) => {
      this.allTournaments = tournamentsJson;
      return this.allTournaments;
    }));

  @action
  fetchTournamentsByManagerId = id =>
    getAllTournamentsByManagerApi(id).then((tournamentsJson) => {
      this.TournamentsByManager = tournamentsJson;
      return this.TournamentsByManager;
    });
  @action
  updateTournament = (tournament) => {
    const newTournament = tournament;
    // TO-DO: refactor to dynamic manager id
    newTournament.manager = 1;
    return Promise.resolve(editTournamentApi(newTournament).then(response => !(response.status >= 400)));
  };

  @action
  getSingleTournament = (id) => {
    const singleTournament = this.allTournaments.filter(tournament => tournament.id === id);
    return singleTournament.length ? singleTournament[0] : false;
  };

  @action
  addCreatedTournament = (tournament) => {
    this.allTournaments.push(tournament);
  };
}

const tournamentsStore = new TournamentsStore();

export default tournamentsStore;
