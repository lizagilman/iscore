import { observable, action } from 'mobx';
//import { getAllEntriesApi } from '../api';

class EntriesStore {
  // @observable allEntries = [];
  //
  // @action
  // fetchAllEntries = () => {
  //   getAllEntriesApi().then((entriesJson) => {
  //     this.allEntries = [entriesJson];
  //   });
  // };
  allEntries = [
    {
      player: 'Michael',
      rank: '20',
      seed: '2',
    },
    {
      player: 'Liza',
      rank: '10',
      seed: '1',
    },
    {
      player: 'Alisa',
      rank: '30',
      seed: '3',
    },
  ];
}

const entriesStore = new EntriesStore();

export default entriesStore;