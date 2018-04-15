import { observable, action } from 'mobx';
import { getAllMatchesApi } from '../api';

class MatchesStore {

  @observable allMatches = [];

  @action
  fetchAllMatchs = () => {
    let mockData=[{
		"model": "iscore_app.matches",
		"pk": 95,
		"fields": {
			"player2_score": 0,
			"player1": "Alisa Suchman",
			"player2": "Bob Bobski",
			"winner": null,
			"stage": "QF",
			"time": null,
			"index": 0,
			"draws": 1
		}
	}, {
		"model": "iscore_app.matches",
		"pk": 109,
		"fields": {
			"player2_score": 0,
			"player1": "Alisa Suchman",
			"player2": "Kuki man",
			"winner": null,
			"stage": "QF",
			"time": null,
			"index": 0,
			"draws": 1
		}}];
      this.allMatches = mockData;

      //todo: Alisa should take the data from server !
      /*
      getAllMatchesApi().then((matchesJson) => {
      this.allMatches = [matchesJson];
    });
    */
  };

  @action setTournament = () => {};
}

const matchesStore = new MatchesStore();

export default matchesStore;