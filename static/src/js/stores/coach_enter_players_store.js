import { observable, action } from 'mobx';
import {
  getAllCoachPlayersApi,
  getTournamentByIDApi, getTournamentCategoriesByTournament,
} from '../api';

class CoachEnterPlayersStore {
  @observable allPlayers = {};
  @observable category = {};
  @observable tournament = {};


  @action
  receiveCategoriesByTournament = id => getTournamentCategoriesByTournament(id).then((categoryJson) => {
    console.log('in store. categoryJson: ', categoryJson);
    this.category = categoryJson;
    return this.category;
  });
  @action
  fetchPlayers = name => getAllCoachPlayersApi(name).then((playersJson) => {
    this.allPlayers = playersJson[0].player_list;
    return this.allPlayers;
  });
  @action
  getTournament = id => getTournamentByIDApi(id).then((tournamentJson) => {
    this.tournaments = tournamentJson;
    return this.tournament;
  });
}

const playersStore = new CoachEnterPlayersStore();

export default playersStore;
