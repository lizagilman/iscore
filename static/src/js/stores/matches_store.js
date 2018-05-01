import { observable, action } from 'mobx';
import {
  getAllMatchesApi,
  editMatchesApi,
  getMatchToWriteByMatchId,
} from '../api';

class MatchesStore {
  @observable allMatches = [];
  @observable matchToUpdate = null;

  @action
  fetchAllMatchs = () => {
    getAllMatchesApi().then((matchesJson) => {
      this.allMatches = [matchesJson];
    });
  };

  @observable
  updateMatch = (matchId) => {
    let matchWithPks;
    let matchToUpdate;
    getMatchToWriteByMatchId(matchId).then((response) => {
      matchWithPks = response;
      matchToUpdate = matchWithPks;
      matchToUpdate.winner = matchWithPks.player1;
      editMatchesApi(matchToUpdate).then(alert('match winner updated'));
    });
  };

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
