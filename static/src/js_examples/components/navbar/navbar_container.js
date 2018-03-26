import React, {Component } from 'react';
import NavbarComponent from './navbar_component';
import { observer } from 'mobx-react';
import { startEndWorking, getDeveloperByIdApi, getProjectsByDeveloperIdApi, getTasksByDeveloperIdApi } from '../../utils/api';


@observer
class Navbar extends Component {

    constructor(props) {
        super(props);
        this.disconnectClick = this.disconnectClick.bind(this);
        //this.workButtonClick = this.workButtonClick.bind(this);
        this.finishWorking = this.finishWorking.bind(this);
        this.startWorking = this.startWorking.bind(this);
        this.workButtonClick = this.workButtonClick.bind(this);
        this.workHours = {start: false, end: false, developer: this.props.UserStore.id, is_from_home: false, otherAssignmentType:null, assignmentID:null, assignmentType:""};
        // this.numberOfLizot = 0;

    }

    componentWillMount() {
        if(localStorage.getItem("user_id")){
            getProjectsByDeveloperIdApi(this.props.UserStore.id-1).then(projectsJson => {
                    this.props.ProjectsStore.loggedDevelopersProjects = projectsJson;
                });
            getTasksByDeveloperIdApi(this.props.UserStore.id-1).then((tasksJson) => {
                 this.props.TasksStore.loggedDevelopersTasks = tasksJson;
                });
        }

    }

    componentDidMount(){

    }

    startWorking(e){
        this.props.WorkDayStore.userClickedSaveWorkDay = true;
        alert("להחתים כניסה?");
        getDeveloperByIdApi((this.props.UserStore.id)-1).then((developerJson)=>
        {
            this.props.UserStore.isWorking = developerJson.is_working_now;
            this.workHours.assignmentID = this.props.WorkDayStore.assignmentID;
            this.workHours.assignmentType = this.props.WorkDayStore.assignmentType;
            this.workHours.developer = (this.props.UserStore.id)-1;
            this.workHours.start = true;
            this.workHours.end = false;
            this.workHours.is_from_home = this.props.WorkDayStore.isFromHome;
            this.workHours.otherAssignmentType = this.props.WorkDayStore.projectNameInput;
            this.props.UserStore.isWorking = true;
            startEndWorking(this.workHours);
        })
    }

    finishWorking(){
        {
            this.props.UserStore.isWorking ? alert("להחתים יציאה?"): false;
        }
        getDeveloperByIdApi((this.props.UserStore.id)-1).then((developerJson) =>
            {
                this.props.UserStore.isWorking = developerJson.is_working_now;
                this.workHours.developer = (this.props.UserStore.id)-1;
                this.workHours.end = true;
                this.workHours.start = false;
                this.props.UserStore.isWorking = false;
                startEndWorking(this.workHours).then(() => {this.props.WorkDayStore.isFromHome = false;
                                                            this.props.WorkDayStore.projectNameInput = ""});
                this.props.UserStore.isWorking = false

            }
        )
    }


    workButtonClick(){
        if(this.props.UserStore.isWorking){
            this.finishWorking()
        }
    }
    //
    //workButtonClick1(e){
    //    console.log("unicorn click");
    //    getDeveloperByIdApi(this.props.UserStore.id).then((developerJson)=>
    //    {
    //        this.props.UserStore.isWorking = developerJson.is_working_now;
    //        this.workHours.developer = this.props.UserStore.id;
    //        if (!this.props.UserStore.isWorking) {
    //            this.workHours.start = true;
    //            this.workHours.end = false;
    //           this.workHours.is_from_home = this.props.WorkDayStore.isFromHome;
    //            this.workHours.project = this.props.WorkDayStore.projectNameInput;
    //            console.log(this.workHours);
    //            startEndWorking(this.workHours);
    //        }
    //        else {
    //            this.workHours.end = true;
    //            this.workHours.start = false;
    //            startEndWorking(this.workHours);
    //        }
    //        this.props.UserStore.isWorking = !this.props.UserStore.isWorking
    //    });
    //}

    disconnectClick() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.props.UserStore.developer =false;
        this.props.UserStore.anonymous =true;
        this.props.UserStore.name=false;
        this.props.UserStore.loginFail=false;
    }

    render() {
        return (

            <div>
                <NavbarComponent developerProjects ={this.props.ProjectsStore.loggedDevelopersProjects}
                                 loggedDevelopersTasks = {this.props.TasksStore.loggedDevelopersTasks}
                                 startWorking = {this.startWorking}
                                 finishWorking = {this.finishWorking}
                                 workButtonClick={this.workButtonClick}
                                 disconnectClick= {this.disconnectClick}
                                 UserStore = {this.props.UserStore}
                                 WorkDayStore={this.props.WorkDayStore}/>
            </div>
        );
    }
}

/*
 Liza.propTypes = {
 params: PropTypes.object,
 };
 */
Navbar.contextTypes = {
    router: React.PropTypes.object
};

export default Navbar;
