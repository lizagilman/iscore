import React, {Component } from 'react';
import { observer } from 'mobx-react';
import TaskComponent from './task_component';
import Loading from '../loading_compnent/loading_component';
import { autoComplete } from '../../utils/auto_complete';
import { getTaskByIdApi, getAllDevelopersApi, getAllProjectsApi, saveExistingTaskApi, saveNewTaskApi, getAllEmployeesApi, uploadPrintScreen} from '../../utils/api';
import PrintScreenComponent from '../print_screen/print_screen_component';


@observer
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            //firstRender: true,
            enablePrintScreenPaste: false
        };
        this.id;
        this.saveValue = this.saveValue.bind(this);
        this.saveValueFromTextInput = this.saveValueFromTextInput.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.saveEmailFromAutoComplete = this.saveEmailFromAutoComplete.bind(this);
        this.updateTaskDevelopers = this.updateTaskDevelopers.bind(this);
        this.isAutoCompleteInit = false;
        this.enableDisablePrintScreenPaste = this.enableDisablePrintScreenPaste.bind(this);
        //this.cancelPastePrintScreen = this.cancelPastePrintScreen(this);
    }

    componentWillMount() {
        let currentTaskId = this.props.params.id;
        // if editing existing task (not new task)
        if (currentTaskId){
            this.id = Number(currentTaskId);
            getTaskByIdApi(this.id).then(TaskJson => {
                this.props.TaskStore.task = TaskJson;
                this.props.TaskStore.taskDevsIds = TaskJson.developers.map(dev => dev.id);
            });
        } else {
            this.clearTaskStore();
        }
        // get developers and projects data if not in store
        this.props.DevelopersStore.allDevelopers > 0 ? false : getAllDevelopersApi()
            .then(developersJson => this.props.DevelopersStore.allDevelopers = developersJson);
        this.props.ProjectsStore.allProjects > 0 ? false : getAllProjectsApi()
            .then(projectsJson => this.props.ProjectsStore.allProjects = projectsJson);
        // get employees for auto-complete
        this.props.EmployeeStore.allEmployees > 0 ? false : getAllEmployeesApi()
            .then(employeesJson => {
                this.props.EmployeeStore.allEmployees = employeesJson;
                this.forceUpdate();
            });
    }


    componentDidMount(){
        if(!(this.isAutoCompleteInit) && this.props.EmployeeStore.allEmployees.length > 0){
            autoComplete($('#opened_by'),  this.props.EmployeeStore.autoCompleteEmployees, this.saveEmailFromAutoComplete);
            this.isAutoCompleteInit = true;
        }
    }

    componentDidUpdate(){
         if(!(this.isAutoCompleteInit) && this.props.EmployeeStore.allEmployees.length > 0){
             autoComplete($('#opened_by'),  this.props.EmployeeStore.autoCompleteEmployees, this.saveEmailFromAutoComplete);
             this.isAutoCompleteInit = true;
         }
    }

    enableDisablePrintScreenPaste(){
        if(this.state.firstRender){
            this.setState({firstRender: false});
        }
        let curState = this.state.enablePrintScreenPaste;
        let newState = (!(curState));
        this.setState({enablePrintScreenPaste: newState});
    }

    //cancelPastePrintScreen(){
        // //localStorage.setItem("file", null);
        //localStorage.removeItem("file");
        //localStorage.setItem("userPastedImg", false);
        //this.props.TaskStore.task.print_screen_file = null;
        //var ctx = document.getElementById('my_canvas').getContext("2d");
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //}


    saveValue(key, value){
        this.props.TaskStore.task[key] = value;
    }

    saveValueFromTextInput(event){
        this.saveValue(event.target.id, event.target.value);
    }

    saveEmailFromAutoComplete(emp){
        this.props.TaskStore.task.email = this.props.EmployeeStore.autoCompleteEmployees.data[emp];
        this.props.TaskStore.task.opened_by = emp;
    }

    saveTask(e){
        e.preventDefault();
        this.props.LoadingStore.is_loading = true;
        let taskData = this.props.TaskStore.task;
        taskData['developers'] = this.props.TaskStore.taskDevsIds;
        taskData['file'] = localStorage.getItem("file");
        if(this.props.UserStore.anonymous){
            taskData['is_bug']=true;
        }
        if (this.id) {
            saveExistingTaskApi(taskData).then(
                response => {
                    console.log(response, String(this.id));
                    if (response.status >= 400){
                        alert("שמירת משימה נכשלה");
                    } else {
                        if (localStorage.getItem("userPastedImg")){
                            uploadPrintScreen(this.props.TaskStore.task.print_screen_file, String(this.id)).then(response => {
                                if (response.status >= 400){
                                    console.log("שמירת צילום מסך נכשלה");
                                }
                            });
                        }
                    }
                    this.props.LoadingStore.is_loading = false;
                });
        }
        else {
            saveNewTaskApi(taskData).then(
                response => {
                    if (response.status >= 400){
                        alert("שמירת משימה נכשלה");
                    } else {
                        if (localStorage.getItem("userPastedImg")){
                            let taskId = response;
                            uploadPrintScreen(this.props.TaskStore.task.print_screen_file, taskId).then(response => {
                                if (response.status >= 400){
                                    alert("שמירת צילום מסך נכשלה");
                                }
                            });
                        }
                    }
                    this.props.LoadingStore.is_loading = false;
                });
        }
    }


    updateTaskDevelopers(id){
        let taskDevelopers = this.props.TaskStore.taskDevsIds;
        if (taskDevelopers.includes(id) ) {
            let index = taskDevelopers.indexOf(id);
            taskDevelopers.splice(index, 1);
        } else {
            taskDevelopers.push(id);
        }
    }

    clearTaskStore(){
        this.props.TaskStore.task.project = {name: 'בחר'};
		this.props.TaskStore.task.task_status = 'בבדיקה';
		this.props.TaskStore.task.developers = [];
		this.props.TaskStore.task.opened_by = "";
		this.props.TaskStore.task.email = "";
		this.props.TaskStore.task.description = "";
		this.props.TaskStore.task.start_date = "";
		this.props.TaskStore.task.due_date = "";
		this.props.TaskStore.task.end_date = "";
		this.props.TaskStore.task.review_date = "";
        this.props.TaskStore.task.print_screen_url = "הכנס כתובת אתר של תמונה (URL) או העלה קובץ";
		this.props.TaskStore.task.is_bug = "";
		this.props.TaskStore.task.print_screen_file = null;
    }

    render() {
        return (
            <div>
                {
                    !this.props.params.id || this.props.TaskStore.task.id ?

                        <TaskComponent task={this.props.TaskStore.task}
                                       taskId={this.id}
                                       saveValue={this.saveValue}
                                       saveValueFromTextInput={this.saveValueFromTextInput}
                                       saveTask={this.saveTask}
                                       taskDevsIds={this.props.TaskStore.taskDevsIds}
                                       updateTaskDevelopers={this.updateTaskDevelopers}
                                       is_loading={this.props.LoadingStore.is_loading}
                                       allProjects={this.props.ProjectsStore.allProjects}
                                       anonymousUser={this.props.UserStore.anonymous}
                                       enableDisablePrintScreenPaste={this.enableDisablePrintScreenPaste}
                                       enablePrintScreenPaste={this.state.enablePrintScreenPaste}
                                       //firstRender={this.state.firstRender}
                                       //cancelPastePrintScreen={this.cancelPastePrintScreen}
                                       allDevelopers={this.props.DevelopersStore.allDevelopers}/> :
                        <Loading />
                }
            </div>
        );
    }
}

export default Task;