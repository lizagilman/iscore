import { observable, action } from 'mobx';
import { getTournamentCategoriesByTournament } from '../api';

class CategoryStore {
  @observable categoriesByTournament = [];

  @action
  CategoriesByTournament = id => getTournamentCategoriesByTournament(id).then((categoryJson) => {
    this.categoriesByTournament = categoryJson;
    return this.categoriesByTournament;
  });
}

const categoryStore = new CategoryStore();

export default categoryStore;
