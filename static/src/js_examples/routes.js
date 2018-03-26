import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Root from './components/root/root_container';
import WelcomePage from './components/welcome_page/welcome_page';
import Liza from './components/liza/liza_container';
import Limor from './components/limor/limor_container';
import Developer from './components/developer_components/developer_container';
import Employee from './components/employee/employee_container';
import Manager from './components/manager/manager_container';
import Project from './components/project/project_container';
import Tasks from './components/tasks/tasks_container';
import Login from './components/login/login_container';
import Projects from './components/projects/projects_container';
import Task from './components/task/task_container';
import adminPageComponent from './components/admin_page/admin_page_component'

const routes = (
    <Route path="/devs/index" component={Root}>
            <IndexRoute path="" component={Employee}/>
            <Route path="/devs/index/developer" component={Developer} />
            <Route path="/devs/index/manager" component={Manager} />
            <Route path="/devs/index/test" component={WelcomePage} />
            <Route path="/devs/index/project(/:id)" component={Project} />
            <Route path="/devs/index/bugs" component={Tasks} />
            <Route path="/devs/index/login" component={Login} />
            <Route path="/devs/index/task(/:id)" component={Task} />
            <Route path="/devs/index/projects" component={Projects} />
            <Route path="/devs/index/tasks" component={Tasks} />
            <Route path="/devs/index/admin" component={adminPageComponent} />
    </Route>
);

export default routes;

/*
for reports gui component:
 <a href = "http://localhost:8000/devs/apis/get_natan_dev_report/" target="_blank">test get natan report</a>
    */