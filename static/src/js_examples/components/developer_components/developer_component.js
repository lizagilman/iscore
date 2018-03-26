import React, { PropTypes } from 'react';
import DeveloperInfo from './developer_info/developer_info_container';
import Projects from '../../components/projects/projects_container'
import Tasks from '../../components/tasks/tasks_container'

const DeveloperComponent = props => {
    return (
            <div>
                <DeveloperInfo UserStore={props.UserStore}/>
                <Projects component = "developer" ProjectsStore={props.ProjectsStore}/>
                <Tasks component = "developer" TasksStore={props.TasksStore} UserStore={props.UserStore}/>
            </div>
        )
}

export default DeveloperComponent;