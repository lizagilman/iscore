/**
 * Created by DEV on 14/09/2016.
 */
import ProjectsFilterComponent from './project_filter_component';
import { observer } from 'mobx-react';
import React, {Component } from 'react';
import { getAllProjectsApi } from '../../utils/api'


@observer
class ProjectFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {projects:[]};
        this.click = this.click.bind(this);
        //this.developers =
    }

    componentWillMount() {
        getAllProjectsApi().then( (json) => {
                        this.setState({projects: json});
                    });
    }

    /*
     this.developers;
     console.log(typeof (this.developers))
     */


    click(event) {
        this.props.TasksStore.filteredTasks = this.props.TasksStore.filteredTasks.filter((task)=>task.project.id == event.target.getAttribute("value"));
    }


    /**   create_developer_li() {
        getAllDevelopersApi().then(tasksJson => this.developers = tasksJson);

    }**/

    render() {
        return (
            <ProjectsFilterComponent projects={this.state.projects} click={this.click}/>
        );
    }
}

export default ProjectFilter;
