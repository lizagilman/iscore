import { observable ,  computed } from 'mobx';

class TasksStore {
	@observable allTasks = [];
	@observable filteredTasks = [];
	@observable loggedDevelopersTasks = [];

	@computed get developerTasks(){
		let userID = localStorage.getItem("user_id");
		let developersTasks = this.allTasks.map((task)=> task.developers);
		return developersTasks.filter(task());
	}


}
export default new TasksStore();
