import { observable, action } from 'mobx';
import { getRankingListByOrganization } from '../api';

class RankingsStore {
  @observable allRankings = null;

  @action
  // TO-DO: move to dynamic org id
  fetchAllRankings = () =>
    getRankingListByOrganization(1).then((rankingsJson) => {
      this.allRankings = rankingsJson;
    });

  @action
  deleteRanking = () => {
    console.log('delete ranking api');
  };
}

const rankingsStore = new RankingsStore();

export default rankingsStore;
