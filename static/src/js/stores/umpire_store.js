import { observable, action } from "mobx";
import {getAllMatchesByTournamentIDApi, getAllTournamentsApi} from "../api";
const mobx = require("mobx");
class UmpireStore {
  @observable allTournaments = [];
  @observable tournament = null;
  @observable matches = null;
  @observable match = null;

  @action
  fetchAllTournaments = () =>
    getAllTournamentsApi().then(tournamentsJson => {
      this.allTournaments = tournamentsJson;
      return this.allTournaments;
    });

  @action
  getSingleTournament = id => {
    const singleTournament = this.allTournaments.filter(
      tournament => tournament.id === id
    );

    return singleTournament.length ? singleTournament[0] : false;
  };

  @action
  getSingleMatch = ()=>{

        return this.match;
  };

  @action
    setSingleMatch(match){
        this.match=match;
    };
  @action
  setCurrentTournament = tournament => {
    this.tournament = tournament;
  };
  @action getTournamentId = () => this.tournament.id;
  @action getMatch = () => this.match;
  @action
  fetchMatches = (id) => {
    if (id) {
      getAllMatchesByTournamentIDApi(id).then((matchesJson) => {
        matchesJson.sort((match1, match2) => new Date(match1.time) - new Date(match2.time));
        this.matches =  mobx.toJS([matchesJson]);
      });
    }
  };
}

const umpireStore = new UmpireStore();

export default umpireStore;
