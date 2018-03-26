/**
 * Created by DEV on 14/09/2016.
 */
import DeveloperFilterComponent from './developer_filter_component';
import { observer } from 'mobx-react';
import React, {Component } from 'react';
import { getAllDevelopersApi } from '../../utils/api'


@observer
class DeveloperFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {devs:[]};
        this.click = this.click.bind(this);
    }

    componentWillMount() {
        getAllDevelopersApi().then( (json) => {
                        this.setState({devs: json});
                    });
    }



    click(e) {
        if(this.props.component == "tasks") {
            this.props.TasksStore.filteredTasks = this.props.TasksStore.filteredTasks.filter((task)=>task.developers.map(developer=>developer.name).includes(e.target.text));
        }
        if(this.props.component == "projects") {
            this.props.ProjectsStore.filteredProjects = this.props.ProjectsStore.filteredProjects.filter(project => project.developers.map(developer => developer.name).includes(e.target.text));        }
    };


    /**   create_developer_li() {
        getAllDevelopersApi().then(tasksJson => this.developers = tasksJson);

    }**/

    render() {
        return (
            <DeveloperFilterComponent developers1={this.state.devs} click={this.click}/>
        );
    }
}

export default DeveloperFilter;
