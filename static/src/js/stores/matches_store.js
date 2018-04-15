import { observable, action } from 'mobx';
import {getAllMatchesApi} from '../api';

class MatchesStore {

  @observable allMatches = [];

  @action
  fetchAllMatchs = () => {
    getAllMatchesApi().then((matchesJson) => {
      this.allMatches = [matchesJson];
    });
  };

}

const matchesStore = new MatchesStore();

export default matchesStore;