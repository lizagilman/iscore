import { observable, action } from 'mobx';
import {
    getAllCoachPlayersApi,
    getTournamentByIDApi,
    getTournamentCategoriesByTournament,
    getAllCoachByUser, getAllMatchesByTournamentIDApi, getAllTournamentsApi,
} from '../api';

class CoachEnterPlayersStore {
  @observable allPlayers = {};
  @observable category = {};
  @observable tournament = null;
  @observable firstName = null;
  @observable lastName = null;
  @observable matches = null;

  @action
  fetchAllTournaments = () => getAllTournamentsApi().then((tournamentsJson) => {
    this.allTournaments = tournamentsJson;
    return this.allTournaments;
  });
  @action
  receiveCategoriesByTournament = id =>
    getTournamentCategoriesByTournament(id).then((categoryJson) => {
      console.log('in store. categoryJson: ', categoryJson);
      this.category = categoryJson;
      return this.category;
    });


  @action
  fetchMatches = (id) => {
    if (id) {
     return getAllMatchesByTournamentIDApi(id).then((matchesJson) => {
         matchesJson.sort((match1, match2) => new Date(match1.time) - new Date(match2.time));
        if(matchesJson && !matchesJson.length){
            matchesJson=[matchesJson];
        }
        this.matches = matchesJson;
        return this.matches;
      });
    }
  };
  @action
  setSelectedTournament(value){
      this.tournament=value;
}
@action
getSelectedTournament=()=>this.tournament;

  @action
  fetchPlayers = id =>
    getAllCoachByUser(id).then((playersJson) => {
      this.coach = playersJson;
      this.allPlayers = playersJson[0].player_list;
      this.firstName = playersJson[0].user.first_name;
      this.lastName = playersJson[0].user.last_name;
      return this.allPlayers;
    });
}

const playersStore = new CoachEnterPlayersStore();

export default playersStore;
