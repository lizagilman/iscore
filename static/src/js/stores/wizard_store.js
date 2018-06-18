import { observable, action } from 'mobx';
import {
  getOrganizationBySports,
  getRankingListByOrganization,
  createTournamentApi,
} from '../api';

// TO-DO: move to dynamic manager id
const initialState = {
  organization: null,
  is_ranked: false,
  ranking_list: null,
  grade: null,
  manager: 1,
};

class WizardStore {
  @observable tournament = initialState;
  @observable tournamentCategories = null;
  @observable organizations = null;
  @observable rankingLists = null;
  @observable grades = null;
  @observable rankingListCategories = [];

  @action
  createNewTournament = () =>
    Promise.resolve(createTournamentApi(this.tournament).then((response) => {
      if (response) {
        return true;
      }
      this.tournament = initialState;
      return false;
    }));

  @action
  setTournamentProperty = (key, value) => {
    this.tournament[key] = value;
  };

  @action
  setTournamentCategories = (tournamentCategories) => {
    this.tournamentCategories = tournamentCategories;
    this.tournament.categories = tournamentCategories;
  };

  @action
  getOrganization = () => {
    const selectedFieldOfSport = this.tournament.field_of_sport;
    if (selectedFieldOfSport) {
      getOrganizationBySports(selectedFieldOfSport).then((response) => {
        if (response.status >= 400) {
          alert('Failed to get organizations');
        } else {
          this.organizations = response;
        }
      });
    }
  };

  @action
  getRankingLists = () => {
    const selectedOrganization = this.tournament.organization;
    if (selectedOrganization) {
      getRankingListByOrganization(selectedOrganization).then((response) => {
        if (response.status >= 400) {
          alert('Failed to save');
        } else {
          this.rankingLists = response;
        }
      });
    }
  };

  @action
  resetFieldOfSport() {
    this.organizations = null;
    this.resetOrganization();
  }

  @action
  getGrades() {
    const selectedRankingList = this.tournament.ranking_list;
    if (selectedRankingList && this.rankingLists) {
      this.grades = this.rankingLists.filter(rankingList => rankingList.id === selectedRankingList)[0].grades;
    }
  }

  @action
  getRankingListCategories() {
    const selectedRankingList = this.tournament.ranking_list;

    if (selectedRankingList && this.rankingLists) {
      this.rankingListCategories = this.rankingLists.filter(rankingLists => rankingLists.id === selectedRankingList)[0].categories;
    }
  }

  @action
  resetOrganization() {
    this.rankingLists = null;
    this.grades = null;
  }

  @action
  resetRankingList() {
    this.grades = null;
  }
}

const wizardStore = new WizardStore();

export default wizardStore;
