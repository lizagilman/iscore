import { observable } from "mobx";

class TournamentsStore {
  @observable
  allTournaments = [
    {
      tournament_name: "Shenkar Open 2018",
      status: "created",
      dates: "15-20 Apr 2018",
      published: true
    },
    {
      tournament_name: "Israel Open 2017",
      status: "finished",
      dates: "12-16 Dec 2017",
      published: true
    },
    {
      tournament_name: "TLV Junior 2019",
      status: "created",
      dates: "14-19 Oct 2018",
      published: false
    }
  ];
}

const tournamentsStore = new TournamentsStore();

export default tournamentsStore;
