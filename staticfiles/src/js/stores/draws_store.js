/* eslint-disable */
import { observable, action } from 'mobx';
import { getAllMatchesApi } from '../api';

class DrawsStore {
  @observable draw = [];
  @observable matchesR16 = [];
  @observable matchesQF = [];
  @observable matchesSF = [];
  @observable matchesF = [];

  @action
  getDraw = () => {
    getAllMatchesApi().then((drawJson) => {
      this.draw = drawJson;

      drawJson.map((match) => {
        switch (match.stage) {
          case 'R16':
            this.matchesR16.push(match);
            break;
          case 'QF':
            this.matchesQF.push(match);
            break;
          case 'SF':
            this.matchesSF.push(match);
            break;
          case 'F':
            this.matchesF.push(match);
        }
      });
    });
  };
}

const drawsStore = new DrawsStore();

export default drawsStore;
