import { observable, action } from 'mobx';
import {
  getRankingListByOrganization,
  createRankingListApi,
  getGradesByOrganization,
  getCategoriesByOrganization,
  uploadRankingListFileApi,
} from '../api';

// TO-DO: move to dynamic organization id
const initialState = {
  name: null,
  organization: 1,
  grades: null,
  categories: [],
};

class RankingsStore {
  @observable allRankings = null;
  @observable rankingListToCreate = initialState;
  @observable rankingListCategories = null;
  @observable rankingListGrades = null;
  @observable organizationCategories = null;
  @observable organizationGrades = null;
  @observable fileToUpload = null;

  @action
  // TO-DO: move to fully dynamic id
  fetchAllRankings = id =>
    getRankingListByOrganization(id || 1).then((rankingsJson) => {
      this.allRankings = rankingsJson;
    });

  @action
  deleteRanking = () => {
    console.log('delete ranking api');
  };

  @action
  createNewRankingList() {
    const newRankingList = this.rankingListToCreate;
    createRankingListApi(newRankingList).then((response) => {
      if (response) {
        // TO-DO: handle then
        uploadRankingListFileApi(response.id, this.fileToUpload);
        alert('success');
      } else {
        alert('fail');
      }
    });
  }

  @action
  setRankingListProperty = (key, value) => {
    this.rankingListToCreate[key] = value;
  };

  @action
  setRankingListCategories = (categories) => {
    this.rankingListCategories = categories;
    this.rankingListToCreate.categories = categories;
  };

  @action
  setRankingListGrades = (grades) => {
    this.rankingListGrades = grades;
    this.rankingListToCreate.grades = grades;
  };

  @action
  getGrades = (id) => {
    getGradesByOrganization(1).then((response) => {
      if (response.status >= 400) {
        alert('Failed to save');
      } else {
        this.organizationGrades = response;
      }
    });
  };

  @action
  getCategories = (id) => {
    getCategoriesByOrganization(1).then((response) => {
      if (response.status >= 400) {
        alert('Failed to save');
      } else {
        this.organizationCategories = response;
      }
    });
  };

  @action setFileToUpload = file => (this.fileToUpload = file);
}

const rankingsStore = new RankingsStore();

export default rankingsStore;
