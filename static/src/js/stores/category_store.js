import { observable, action } from 'mobx';
import { getCategoriesByRankingList } from '../api';

class CategoryStore {
  @observable categories = {};

  @action
  getCategories = (id) => {
    getCategoriesByRankingList(id).then((categoryJson) => {
      this.categories = categoryJson;
    });
  };
}

const categoryStore = new CategoryStore();

export default categoryStore;
