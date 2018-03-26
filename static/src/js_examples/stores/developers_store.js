import { observable } from 'mobx';

class DevelopersStore {
	@observable allDevelopers = [];
	@observable allDevelopersId = [];
}
export default new DevelopersStore();
