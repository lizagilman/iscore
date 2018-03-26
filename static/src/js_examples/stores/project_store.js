import { observable, computed } from 'mobx';

class ProjectStore {
	@observable project = {
		project_type: 'תוכנה',
		project_status: 'חדש',
		developers: [],
		name: "",
		description: "",
		leader: {name: "בחר"},
		start_date: "",
		due_date: "",
		git_url: "",
		end_date: "",
		review_date: "",
		desc_file: null,
		to_do_list:[]
	};
    @observable todoInput = "";
	@observable projectsDevsIds = [];


    //@computed get projectsDevsIds() {
        //return [];
        //return this.project.developers.map(dev => dev.id);
    //}
}
export default new ProjectStore();
