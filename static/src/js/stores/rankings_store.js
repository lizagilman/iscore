import { observable, action } from 'mobx';
import { getRankingListByOrganization } from '../api';

class RankingsStore {
  @observable allRankings = null;

  @action
  fetchAllRankings = id =>
    getRankingListByOrganization(id || 1).then((rankingsJson) => {
      this.allRankings = rankingsJson;
    });

  @action
  deleteRanking = () => {
    console.log('delete ranking api');
  };
}

const rankingsStore = new RankingsStore();

export default rankingsStore;
