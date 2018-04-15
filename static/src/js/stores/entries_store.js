import { observable, action } from 'mobx';
import { getAllEntriesApi } from '../api';

class EntriesStore {
  @observable allEntries = [];

  @action
  fetchAllEntries = () => {
    getAllEntriesApi().then((entriesJson) => {
      this.allEntries = [entriesJson];
    });
  };
}

const entriesStore = new EntriesStore();

export default entriesStore;
