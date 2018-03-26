import { observable, computed } from 'mobx';


class ProjectsStore {
	@observable allProjects = [];
	@observable filteredProjects = [];
	@observable loggedDevelopersProjects =[];


	@computed get developerProjects(){
		let userID = localStorage.getItem("user_id")
		let developersProjects =  this.allProjects.filter((project)=> project.developers.map((developer)=> developer.id).includes(parseInt(userID)) )
		return developersProjects;
	}


}
export default new ProjectsStore();

