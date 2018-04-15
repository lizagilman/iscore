import { observable } from 'mobx';

class RankingsStore {
  @observable allRankings = [{ someKeyRanking: 'someDataRanking' }];
}

const rankingsStore = new RankingsStore();

export default rankingsStore;

