import React, { PropTypes , Component } from 'react';
import { observer } from 'mobx-react';
import { startEndWorking, getDeveloperByIdApi } from '../../utils/api';
import DismissModal  from './dismiss_modal'


@observer
class WorkButtonModalComponent extends Component {
    constructor(props) {
        super(props);
    }

    onAssignmentClick(event, props,assignmentType,assignmentID){
        //props.WorkDayStore.projectNameInput = "text";
        props.WorkDayStore.assignmentType = assignmentType;
        props.WorkDayStore.assignmentID = assignmentID;
    };

    render() {
        return (
            <div className="modal fade" id="work_button" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><span onClick={(event) => {document.getElementById("unicorn").click(); $('#work_button').modal('hide'); $('.modal-backdrop').remove(); }}>&times;</span></button>
                             <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><span onClick={(event) => { $('#work_button').modal('hide'); $('.modal-backdrop').remove(); }}>&times;</span></button>*/}
                            <h3 className="modal-title text-muted" id="myModalLabel">ברוכים השבים</h3>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div>
                                    <label>
                                        <input  type="checkbox" onChange={(event) => { this.props.WorkDayStore.isFromHome = event.target.checked; }}
                                                                checked={this.props.WorkDayStore.isFromHome}/>
                                        עובד מהבית
                                    </label>
                                </div>
                                <div className="dropdown">
                                    <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                        בחר משימה
                                        <b className="caret"></b>
                                    </a>
                                    <ul className="dropdown-menu">
                                        {this.props.loggedDevelopersTasks.map((task)=><li key={task.id} onClick={(event) => this.onAssignmentClick(event, this.props,"task", task.id)}><a>{task.description}</a></li>)}
                                        {this.props.developerProjects.map((project)=><li key={project.id} onClick={(event) => this.onAssignmentClick(event, this.props,"project", project.id)}><a>{project.name}</a></li>)}
                                    </ul>
                                </div>
                                {/*<label className="active formLabel">"שם הפרוייקט"</label>*/}
                                {/*<input type="text" value={props.WorkDayStore.projectNameInput} className="form-control" onChange={(event) =>{props.WorkDayStore.projectNameInput = event.target.value}}/>*/}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-warning w-full" data-dismiss="modal" onClick={this.props.startWorking}>שמור</button>
                        </div>
                    </div>
                </div>
                <DismissModal WorkDayStore = {this.props.WorkDayStore} />
            </div>);
    }
}

export default WorkButtonModalComponent