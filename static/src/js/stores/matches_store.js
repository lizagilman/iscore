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
  updateMatch = (matchId, winner) => {
    let winnerId;

    getMatchToWriteByMatchId(matchId).then((response) => {
      winnerId = winner === 'player1' ? response.player1 : response.player2;

      updateMatchWinnerApi(matchId, winnerId).then((responseUpdate) => {
        responseUpdate.status > 400 ? alert('Winner Update failed') : alert('Winner Updated');
      });
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
    deleteScheduleApi(this.scheduleParams.tournamentId).then(response =>
      (response.status > 400 ? alert('Delete schedule failed') : alert('Schedule deleted')));
  }
}
const matchesStore = new MatchesStore();

export default matchesStore;
