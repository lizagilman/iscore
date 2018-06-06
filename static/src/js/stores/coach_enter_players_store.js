import { observable, action } from 'mobx';
import {
  getAllCoachPlayersApi,
  getTournamentByIDApi,
  getTournamentCategoriesByTournament,
  getAllCoachByUser,
} from '../api';

class CoachEnterPlayersStore {
  @observable allPlayers = {};
  @observable category = {};
  @observable tournament = {};
  @observable firstName = null;
  @observable lastName = null;
  @action
  receiveCategoriesByTournament = id =>
    getTournamentCategoriesByTournament(id).then((categoryJson) => {
      console.log('in store. categoryJson: ', categoryJson);
      this.category = categoryJson;
      return this.category;
    });

  @action
  fetchPlayers = id =>
    getAllCoachByUser(id).then((playersJson) => {
      this.coach = playersJson;
      this.allPlayers = playersJson[0].player_list;
      this.firstName = playersJson[0].user.first_name;
      this.lastName = playersJson[0].user.last_name;
      return this.allPlayers;
    });

  @action
  getTournament = id =>
    getTournamentByIDApi(id).then((tournamentJson) => {
      this.tournaments = tournamentJson;
      return this.tournament;
    });
}

const playersStore = new CoachEnterPlayersStore();

export default playersStore;
