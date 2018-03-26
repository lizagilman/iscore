import React, {Component } from 'react';
import fetch from 'isomorphic-fetch';
import { observer } from 'mobx-react';
import TasksComponent from './tasks_component';
import Loading from '../loading_compnent/loading_component';
import { getAllTasksApi, getTasksByDeveloperIdApi, getAllBugsApi, deleteTaskApi } from '../../utils/api';


@observer
class Tasks extends Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentWillMount() {
        if(this.props.component=="developer" && !(this.props.UserStore.anonymous)){
            let userId = localStorage.getItem("user_id");
            getTasksByDeveloperIdApi(userId-1).then((tasksJson) => {
                this.props.TasksStore.allTasks = tasksJson;
                this.props.TasksStore.filteredTasks = tasksJson;
                this.props.TasksStore.loggedDevelopersTasks = tasksJson;
            });
        }
        else if(this.props.component=="admin" && !(this.props.UserStore.anonymous)){
            getAllTasksApi().then((tasksJson) => {
                this.props.TasksStore.allTasks = tasksJson;
                this.props.TasksStore.filteredTasks = tasksJson;
                this.props.TasksStore.loggedDevelopersTasks = tasksJson;
            });
        }
        else {
            getAllBugsApi().then((tasksJson) => {
                this.props.TasksStore.allTasks = tasksJson;
                this.props.TasksStore.filteredTasks = tasksJson;
            });
        }
    }

    edit(id) {
        this.context.router.push('/devs/index/task/'+id);
    }

    addTask(e){
        this.context.router.push('/devs/index/task');
    }

    deleteTask(id){
        if (confirm('למחוק משימה?')) {
            deleteTaskApi(id).then(response => {
                    if(response == "task deleted"){
                        //remove deleted task
                        let updatedTasks = this.props.TasksStore.allTasks.filter(task => task.id !=id);
                        this.props.TasksStore.allTasks = updatedTasks;
                        this.props.TasksStore.filteredTasks = updatedTasks;
                    }
                    else{
                        alert("מחיקת משימה נכשלה");
                    }
                }
            )
        } else {
            //don't delete task
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.TasksStore.allTasks && this.props.TasksStore.allTasks.length > 0
                        ? // dispaly loading dialog until data arrives from DB
                        <TasksComponent addTask={this.addTask}
                                        component={this.props.component}
                                        annonymousUser={this.props.UserStore.anonymous}
                                        TasksStore={this.props.TasksStore}
                                        deleteTask={this.deleteTask}
                                        edit={this.edit} />
                        :
                        "HI!!"
                }
            </div>
        );
    }
}


Tasks.contextTypes = {
    router: React.PropTypes.object
};

export default Tasks;