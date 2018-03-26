import React, {Component } from 'react';
import { observer } from 'mobx-react';
import ProjectComponent from './project_component';
import Loading from '../loading_compnent/loading_component';
import { getProjectByIdApi, getAllDevelopersApi, saveExistingProjectApi, saveNewProjectApi, uploadDescFile } from '../../utils/api';
import fetch from 'isomorphic-fetch';


@observer
class Project extends Component {

    constructor(props) {
        super(props);
        this.id;
        this.state = {
            project: false,
            userUploadedDescFile: false,
            descFile: null
        };
        this.saveValue = this.saveValue.bind(this);
        this.saveValueFromTextInput = this.saveValueFromTextInput.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.updateProjectDevelopers = this.updateProjectDevelopers.bind(this);
    }

    componentWillMount() {
        let currentProjectId = this.props.params.id;
        // if editing existing project (not new project)
        if (currentProjectId){
            this.id = Number(currentProjectId);
            getProjectByIdApi(this.id).then(projectJson => {
                this.props.ProjectStore.project = projectJson;
                this.props.ProjectStore.projectsDevsIds = projectJson.developers.map(dev => dev.id);
            });
        }
        this.props.DevelopersStore.allDevelopers > 0 ? false : getAllDevelopersApi()
            .then(developersJson => this.props.DevelopersStore.allDevelopers = developersJson);
    }

    saveValue(key, value){
        this.props.ProjectStore.project[key] = value;
    }

    uploadFile(e){
        e.preventDefault();
        this.setState({userUploadedDescFile: true});
        this.setState({descFile: e.target.files[0]});
    }

    saveValueFromTextInput(event){
        this.saveValue(event.target.id, event.target.value);
    }

    saveProject(e){
        e.preventDefault();
        this.props.LoadingStore.is_loading = true;
        let projctData = this.props.ProjectStore.project;
        projctData['developers'] = this.props.ProjectStore.projectsDevsIds;
        if (this.id) {
            saveExistingProjectApi(projctData).then(
                response => {
                    console.log(response, String(this.id));
                    if (response.status >= 400){
                        alert("שמירת משימה נכשלה");
                    } else {
                        if (this.state.userUploadedDescFile){
                            uploadDescFile(this.state.descFile, String(this.id)).then(response => {
                                if (response.status >= 400){
                                    alert("שמירת צילום מסך נכשלה");
                                }
                            });
                        }
                    }
                    this.props.LoadingStore.is_loading = false;
                });
        }
        else {
            saveNewProjectApi(projctData).then(
                response => {
                    if (response.status >= 400){
                        alert("שמירת פרויקט נכשלה");
                    } else {
                        if (this.state.userUploadedDescFile){
                            let projectId = response;
                            uploadPrintScreen(this.state.descFile, projectId).then(response => {
                                if (response.status >= 400){
                                    alert("שמירת קובץ אפיון נכשלה");
                                }
                            });
                        }
                    }
                    this.props.LoadingStore.is_loading = false;
                });
        }
    }


    componentWillUpdate(){

    }


    componentDidUpdate(){

    }

    updateProjectDevelopers(id){
        let projectDevelopers = this.props.ProjectStore.projectsDevsIds;
        if (projectDevelopers.includes(id) ) {
            let index = projectDevelopers.indexOf(id);
            projectDevelopers.splice(index, 1);
        } else {
            projectDevelopers.push(id);
        }
    }


    render() {
        return (
            <div>
                {

                    !this.props.params.id || this.props.ProjectStore.project.id ? // dispaly loading dialog until data arrives from DB

                        <ProjectComponent project={this.props.ProjectStore.project}
                                          projectId={this.id}
                                          saveValue={this.saveValue}
                                          saveValueFromTextInput={this.saveValueFromTextInput}
                                          saveProject={this.saveProject}
                                          projectsDevsIds={this.props.ProjectStore.projectsDevsIds}
                                          updateProjectDevelopers={this.updateProjectDevelopers}
                                          is_loading={this.props.LoadingStore.is_loading}
                                          uploadFile={this.uploadFile}
                                          allDevelopers={this.props.DevelopersStore.allDevelopers}/> :
                        <Loading />
                }
            </div>
        );
    }
}

export default Project;
