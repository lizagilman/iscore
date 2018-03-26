import React, {Component } from 'react';
import ProjectsComponent from './projects_component';
import { getAllProjectsApi, getProjectsByDeveloperIdApi, deleteProjectApi } from '../../utils/api';
import { observer } from 'mobx-react';
import Loading from '../loading_compnent/loading_component';


@observer
class Projects extends Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.deleteProject = this.deleteProject.bind(this);

        // this.numberOfLizot = 0;
    }

    componentWillMount() {
        if (this.props.component === "developer"){
            let userId = localStorage.getItem("user_id");
            if(userId){
                getProjectsByDeveloperIdApi(userId-1).then(projectsJson => {
                    this.props.ProjectsStore.allProjects = projectsJson;
                    this.props.ProjectsStore.filteredProjects = projectsJson;
                });
            }
        }
        else {
            getAllProjectsApi().then(projectsJson => {
                this.props.ProjectsStore.allProjects = projectsJson;
                this.props.ProjectsStore.filteredProjects = projectsJson;
            });
        }
    }


    removeFilter(e){
        this.props.ProjectsStore.filteredProjects = this.props.ProjectsStore.allProjects;
    }


    edit(id) {
        this.context.router.push('/devs/index/project/'+id);
    }

    deleteProject(id){
        if (confirm('למחוק פרוייקט?')) {
        deleteProjectApi(id).then(response => {
                if(response == "project deleted"){
                    //remove deleted project from store
                    let updatedProjects=this.props.ProjectsStore.allProjects.filter(project => project.id !=id);
                    this.props.ProjectsStore.allProjects = updatedProjects;
                    this.props.ProjectsStore.filteredProjects = updatedProjects;
                }
                else{
                    alert("מחיקת פרוייקט נכשלה");
                }
            }
        )
         } else {
            //don't delete project
        }
    }

    render(){
        return (
            <div>
                {
                    this.props.ProjectsStore.allProjects && this.props.ProjectsStore.allProjects.length > 0
                        ? // dispaly loading dialog until data arrives from DB
                        <ProjectsComponent component = {this.props.component}
                                           ProjectsStore={this.props.ProjectsStore}
                                           edit={this.edit}
                                           deleteProject = {this.deleteProject}
                                           removeFilter={this.removeFilter}/>
                        :
                        <Loading/>
                }
            </div>
        );
    }
}


Projects.contextTypes = {
    router: React.PropTypes.object
};

export default Projects;