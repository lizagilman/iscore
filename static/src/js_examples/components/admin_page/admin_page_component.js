import React, {Component, proptypes } from 'react';
import { observer } from 'mobx-react';
import AllDevelopers from './all_developers/all_developers_container'
import Projects from '../../components/projects/projects_container'
import Tasks from '../../components/tasks/tasks_container'


const AdminPageComponent = observer(props =>
    <div>
        <AllDevelopers DevelopersStore ={props.DevelopersStore}/>
        <Projects component = "admin" ProjectsStore={props.ProjectsStore}/>
        <Tasks component = "admin" TasksStore={props.TasksStore} UserStore={props.UserStore} />
    </div>

);

export default AdminPageComponent;
