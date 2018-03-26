/**
 * Created by DEV on 08/09/2016.
 */
import StatusFilterComponent from './status_filter_component';
import { observer } from 'mobx-react';
import React, {Component } from 'react';

@observer
class StatusFilter extends Component {

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);

    }

    click(event){
        if(this.props.component === "tasks") {
            this.props.TasksStore.filteredTasks = this.props.TasksStore.filteredTasks.toJS().filter((task)=>task.task_status === event.target.text);
        }
        if(this.props.component === "projects"){
            this.props.ProjectsStore.filteredProjects = this.props.ProjectsStore.filteredProjects.filter((project)=> project.project_status == event.target.text)
        }
    }

    render() {
        return (
                <StatusFilterComponent click = {this.click} statusim ={this.props.statusim}/>
        );
    }
}

export default StatusFilter;
