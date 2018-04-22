import { observable, action } from 'mobx';
import { getTournamentCategoriesByTournament } from '../api';

class CategoryStore {
  @observable categoriesByTournament = [];

  @action
  ReturnCategoriesByTournament = (id) => {
    getTournamentCategoriesByTournament(id).then((categoryJson) => {
      this.categoriesByTournament = categoryJson;
    });
  };
}

const categoryStore = new CategoryStore();

export default categoryStore;
