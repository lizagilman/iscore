import { observable, action } from 'mobx';
import { getRankingList } from '../api';

class RankingStore {
  @observable rankingListMetaData = [];
  @observable playersRankings = [];

  @action
  fetchRankingList = (id) => {
    if (this.playersRankings.length) {
      return Promise.resolve(this.playersRankings);
    }

    return getRankingList(id || this.rankingListMetaData.id).then((playersRankingsJson) => {
      this.playersRankings = playersRankingsJson;
      return this.playersRankings;
    });
  };

  @action
  setRankingList = (rankingList) => {
    this.rankingListMetaData = rankingList;
  };

  @action getPlayersRankings = () => this.playersRankings;
}

const rankingStore = new RankingStore();

export default rankingStore;
