import { observable, action } from 'mobx';
import { getEntriesByDrawListIDApi } from '../api';

class DrawsStore {
  @observable drawsByTournament = [];

  @action
  getDraws = (id) => {
    getEntriesByDrawListIDApi(id).then((drawsJson) => {
      this.entriesByTournament = [drawsJson];
    });
  };
}

const drawsStore = new DrawsStore();

export default drawsStore;
