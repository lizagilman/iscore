/* eslint-disable */
import { observable, action } from 'mobx';
import {
  getMatchesByTournamentCategoryIDApi,
  generateDraws,
  deleteDraws,
} from '../api';

class DrawsStore {
  @observable draw = [];
  @observable matchesR16 = [];
  @observable matchesQF = [];
  @observable matchesSF = [];
  @observable matchesF = [];
  @observable currentCategoryId = null;
  @observable drawsCache = [];

  @action
  sortDrawToStages = (draw) => {
    this.matchesR16 = [];
    this.matchesQF = [];
    this.matchesSF = [];
    this.matchesF = [];
    draw.map((match) => {
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
  };

  @action
  getCategoryDraw = (categoryID) => {
    getMatchesByTournamentCategoryIDApi(categoryID).then((drawJson) => {
      if (!drawJson.length) {
        generateDraws(categoryID).then((newDrawJson) => {
          this.draw = newDrawJson;

          this.sortDrawToStages(newDrawJson);

          if (newDrawJson) {
            this.drawsCache.push({ id: categoryID, draw: drawJson });
            this.currentCategoryId = categoryID;
          }
        });
      } else {
        this.draw = drawJson;

        this.sortDrawToStages(drawJson);
      }


      if (drawJson) {
        this.drawsCache.push({ id: categoryID, draw: drawJson });
        this.currentCategoryId = categoryID;
      }
    });
  };
  // };

  @action
  deleteDraw = (categoryID) => {
    deleteDraws(categoryID).then((response) => {
      alert('draw deleted');
    });
  };
}

const drawsStore = new DrawsStore();

export default drawsStore;
