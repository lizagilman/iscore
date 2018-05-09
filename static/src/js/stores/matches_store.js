import { observable, action } from 'mobx';
import {
  getMatchToWriteByMatchId,
  generateScheduleApi,
  deleteScheduleApi,
  getAllMatchesByTournamentIDApi,
  updateMatchWinnerApi,
} from '../api';

class MatchesStore {
  @observable matches = [];
  @observable matchToUpdate = null;
  @observable
  scheduleParams = {
    tournamentId: null,
    numOfCourts: null,
    startHour: '',
    finishHour: '',
    matchDuration: null,
  };

  @action
  fetchMatches = (id) => {
    if (id) {
      getAllMatchesByTournamentIDApi(id).then((matchesJson) => {
        matchesJson.sort((match1, match2) => new Date(match1.time) - new Date(match2.time));
        this.matches = [matchesJson];
      });
    }
  };

  @action
  updateMatch = (matchId) => {
    let matchWithPks;
    getMatchToWriteByMatchId(matchId).then((response) => {
      matchWithPks = response;
      updateMatchWinnerApi(matchId, matchWithPks.player1);
    });
  };

  @action
  updateParamValue(key, val) {
    this.scheduleParams[key] = val;
  }

  @action
  createSchedule() {
    generateScheduleApi(this.scheduleParams).then((response) => {
      this.matches = response;
    });
  }

  @action
  deleteSchedule() {
    deleteScheduleApi(this.scheduleParams.tournamentId).then((response) =>
      response.status > 400  ? alert('Delete schedule failed') : alert('Schedule deleted'));
  }

  // allMatches = [{
  //     "stage": 'F',
  //     "time": "22/03/2018 13:00",
  //     "index": "1",
  //     "court": "1",
  //     "player1": "Alisa",
  //     "player2": "Liza",
  //     "winner": "Liza",
  //     "draws": "Women",
  // },
  //     {
  //         "stage": 'F',
  //         "time": "04/04/2018 12:00",
  //         "index": "2",
  //         "court": "4",
  //         "player1": "Michael",
  //         "player2": "Robert",
  //         "winner": "Michael",
  //         "draws": "Men",
  //     },]
}
const matchesStore = new MatchesStore();

export default matchesStore;
