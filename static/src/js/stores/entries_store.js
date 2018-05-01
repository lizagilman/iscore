import { observable, action } from 'mobx';
import { getEntriesByTournamentCategoryIDApi, getEntriesApi } from '../api';

class EntriesStore {
 @observable returnedEntries=[];
  @observable entriesByTournament = [];


  @action
  fetchEntriesByCategory = id => getEntriesByTournamentCategoryIDApi(id).then((entriesJson) => {
    this.returnedEntries = entriesJson;

    return this.returnedEntries;
  });

  @action
  getEntries = (name, id) => getEntriesApi(name, id).then((enJson) => {
    this.entriesByTournament = [enJson];
    return this.entriesByTournament;
  });
}

const entriesStore = new EntriesStore();

export default entriesStore;
