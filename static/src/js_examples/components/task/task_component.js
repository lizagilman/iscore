import React, {Component, proptypes } from 'react';
import { observer } from 'mobx-react';
import Loading from '../loading_compnent/loading_component';
import { clipboardClass } from '../../utils/clipboard';
import PrintScreenComponent from '../print_screen/print_screen_component';



@observer
class TaskComponent extends Component {

    constructor(props) {
        super(props);
        this.createProjectChoiceLi = this.createProjectChoiceLi.bind(this);
        this.createDevelopersCheckboxDiv = this.createDevelopersCheckboxDiv.bind(this);
    }

    createProjectChoiceLi = function(project, index){
        return(
            <li key={"project"+index}><a value={""+project.name} onClick={()=>this.props.saveValue('project', project)} >{project.name}</a></li>
        );
    };

    createDevelopersCheckboxDiv = (taskDevsIds, developer, index) => {
        return(
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox" name="optionscheckbcheckedoxes" checked={taskDevsIds.includes(developer.id)} onClick={()=> this.props.updateTaskDevelopers(developer.id)} />
                    <span className="checkbox-material"><span className="check"></span></span>
                    {developer.name}
                </label>
            </div>
        );
    };


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-8 col-xs-12 pull-right">
                        <div id="task" className="card">
                            <div className="row">
                                <form onSubmit ={this.props.saveTask}>
                                    <div className="col-md-6" id="taskform">
                                        <div className="md-form">
                                            <label className="active formLabel" htmlFor="name">שם העובד</label>
                                            <div className="input-field">
                                                <input id="opened_by" value={this.props.task.opened_by}
                                                       onChange={ this.props.saveValueFromTextInput} type="text"
                                                       className="form-control autocomplete" required />
                                            </div>
                                            <label className="active formLabel" htmlFor="name">אימייל</label>
                                            <input id="email" value={this.props.task.email}
                                                   onChange={ this.props.saveValueFromTextInput} type="email"
                                                   className="form-control"
                                                   required />
                                            <div className="dropdown">
                                                <label className="active" htmlFor="form6">תקלה בתוכנה:</label>
                                                <a href="#" className="btn btn-simple dropdown-toggle"
                                                   data-toggle="dropdown">
                                                    {this.props.task.project ? this.props.task.project.name : <span> - </span>}
                                                    <b className="caret"></b>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    {this.props.allProjects ? this.props.allProjects.toJS().map((project, index) => this.createProjectChoiceLi(project, index)) : false}
                                                </ul>
                                            </div>
                                            <label className="active formLabel">תאור <span className="text-info"> (נא לתאר בהרחבה ולפרט את מהות התקלה, במידה ומדובר בלקוח ספציפי - נא לציין אותו!) </span>
                                            </label>
                                                <textarea id="description" value={this.props.task.description}
                                                          onChange={this.props.saveValueFromTextInput} className="form-control"
                                                          rows="5" required></textarea>
                                            { this.props.anonymousUser ? false :
                                                <div>
                                                    <label className="active formLabel">תאריך התחלה</label>
                                                    <input id="start_date" value={this.props.task.start_date}
                                                           onChange={this.props.saveValueFromTextInput}
                                                           className="form-control" type="date"/>
                                                    <label className="active formLabel">תאריך יעד</label>
                                                    <input id="due_date" onChange={this.props.saveValueFromTextInput}
                                                           className="form-control" type="date"
                                                           value={this.props.task.due_date}/>
                                                    <label className="active formLabel">תאריך סיום</label>
                                                    <input id="end_date" onChange={this.props.saveValueFromTextInput}
                                                           className="form-control" type="date"
                                                           value={this.props.task.end_date}/>
                                                </div>
                                            }
                                            { this.props.anonymousUser ? false :
                                                <div>
                                                    <div className="dropdown">
                                                        <label className="active" htmlFor="form6">סטטוס</label>
                                                        <a href="#" className="btn btn-simple dropdown-toggle"
                                                           data-toggle="dropdown">
                                                            {this.props.task.task_status}
                                                            <b className="caret"></b>
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li><a onClick={()=>this.props.saveValue('task_status', 'חדש')}>בבדיקה</a>
                                                            </li>
                                                            <li><a
                                                                onClick={()=>this.props.saveValue('task_status', 'בטיפול')}>בטיפול</a>
                                                            </li>
                                                            <li><a
                                                                onClick={()=>this.props.saveValue('task_status', 'הסתיים')}>הסתיים</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <label className="active" htmlFor="form6">מתכנתים</label>
                                                            {this.props.allDevelopers ? this.props.allDevelopers.toJS().map((developer, index) => this.createDevelopersCheckboxDiv(this.props.taskDevsIds, developer, index)) : false}
                                                        </div>
                                                    </div>
                                                    <div className="dropdown">
                                                        <label className="active" htmlFor="form6">האם תקלה?</label>
                                                        <a href="#" className="btn btn-simple dropdown-toggle"
                                                           data-toggle="dropdown">
                                                            {this.props.task.is_bug ? <span>כן</span> : <span>לא</span>}
                                                            <b className="caret"></b>
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li><a onClick={()=>this.props.saveValue('is_bug', true)}>כן</a>
                                                            </li>
                                                            <li><a onClick={()=>this.props.saveValue('is_bug', false)}>לא</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            }
                                            {/*
                                             <label className="active formLabel">צילום מסך<span className="text-info"> (נא להעתיק צילום מסך - ע"י לחיצה על כפתור Pritn Screen במקלדת/ Ctrl+C / העתק, ולהדביק בעמוד זה - ע"י לחיצה על Ctrl+V/ הדבק. ניתן להדביק בכל מקום בעמוד זה.) </span></label>
                                             <input id="print_screen_url"
                                             value={""}
                                             onChange={ this.props.saveValueFromTextInput} type="text"
                                             className="form-control"/>
                                             */}

                                            <label className="active formLabel">צילום מסך</label><br/>
                                            <button type="button" rel="tooltip" title="העלה צילום מס" className="btn btn-primary btn-sm" onClick={this.props.enableDisablePrintScreenPaste} data-toggle="modal" data-target={"#uploadPrintScreenModal"}>
                                                העלה צילום מסך
                                            </button>
                                            <div className="modal fade" id={"uploadPrintScreenModal"} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title" id="myModalLabel">צילום מסך</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            {/* this.props.firstRender ? false : <PrintScreenComponent task={this.props.task} destroy={this.props.enablePrintScreenPaste ? false : true }/> */}
                                                            <PrintScreenComponent task={this.props.task} />
                                                            <br />
                                                            <h2>הדבק כאן</h2>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-default btn-simple" data-dismiss="modal" onClick={this.props.enableDisablePrintScreenPaste}>שמור</button>
                                                            {/* <button type="button" className="btn btn-default btn-simple" data-dismiss="modal" onClick={this.props.cancelPastePrintScreen}>בטל</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-primary" id="saveBtn"
                                               >
                                            {
                                                this.props.is_loading ? <Loading /> :
                                                    <span>שמור</span>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskComponent;
