import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import StatusFilter from '../../components/status-filter/status_filter_container';
import DeveloperFilter from '../../components/developer_filter/developer_filter_container';
import ProjectFilter from '../../components/project_filter/project_filter_container';
import { observer } from 'mobx-react';
import Loading from '../loading_compnent/loading_component';


const TaskDescriptionModal = function (item, id) {
    return (
        <div className="modal fade" id={"task"+id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{item.is_bug? "תאור תקלה ב"+item.project.name : "תאור משימה"}</h4>
                    </div>
                    <div className="modal-body"> {item.description} </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-simple" data-dismiss="modal">סגור</button>
                    </div>
                </div>
            </div>
        </div>
    )
};


const ViewPrintScreenModal = function (item, id) {
    return(
        <div className="modal fade" id={"printScreen"+id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{item.is_bug? "תקלה ב"+item.project.name+" - צילום מסך":"משימה - צילום מסך"}</h4>
                    </div>
                    <div className="modal-body"> <img src={item.print_screen_url} className="img-responsive"/> </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-simple" data-dismiss="modal">סגור</button>
                    </div>
                </div>
            </div>
        </div>
    )
};


const createTrforAnnonumoseUser = function(item, index){
    return(<tr key={"task"+index}>
        <td className="text-center">{index+1}</td>
        {item.project ? <td>{item.project.name}</td> : <td> - </td>}
        <td>{item.date_opened}</td>
        <td>{item.task_status}</td>
        <td>{item.opened_by}</td>
        <td>
            <button type="button" rel="tooltip" title="תאור התקלה"  className="btn btn-info btn-simple btn-xs" data-toggle="modal" data-target={"#task"+index}>
                <a> <i className="fa fa-list-alt"></i></a>
            </button>
            {TaskDescriptionModal(item, index)}
        </td>
        <td className="td-actions text-right">
            <button type="button" rel="tooltip" title="צילום מסך" className="btn btn-success btn-simple btn-xs" data-toggle="modal" data-target={"#printScreen"+index}>
                <a><i className="fa fa-eye"></i></a>
            </button>
            {ViewPrintScreenModal(item, index)}
            <button type="button" rel="tooltip" title="עריכה" className="btn btn-success btn-simple btn-xs">
                <Link to = {"/devs/index/task/"+item.id}><i className="fa fa-edit"></i></Link>
            </button>
        </td></tr>);
};


const createTrforLoggedInUser = function(item, index, props){
    return(<tr key={"task"+item.id}>
        <td className="text-center">{index+1}</td>
        {item.project ? <td>{item.project.name}</td> : <td> - </td>}
        <td>{item.date_opened}</td>
        <td>{item.developers[0] ? item.developers[0].name : false}</td>
        <td>{item.task_status}</td>
        <td>
            <button type="button" rel="tooltip" title="תאור התקלה"  className="btn btn-info btn-simple btn-xs" data-toggle="modal" data-target={"#task"+index}>
                <a> <i className="fa fa-list-alt"></i></a>
            </button>
            {TaskDescriptionModal(item, index)}
        </td>
        <td className="td-actions text-right">
            <button type="button" rel="tooltip" title="צילום מסך" className="btn btn-success btn-simple btn-xs" data-toggle="modal" data-target={"#printScreen"+index}>
                <a><i className="fa fa-eye"></i></a>
            </button>
            {ViewPrintScreenModal(item, index)}
            <button type="button" rel="tooltip" title="עריכת משימה ת תקלה" className="btn btn-success btn-simple btn-xs"><Link to = {"/devs/index/task/"+item.id}>
                <i className="fa fa-edit"></i></Link>
            </button>
            <button type="button" rel="tooltip" title="מחיקת משימה" className="btn btn-success btn-simple btn-xs" onClick={(e)=>{props.deleteTask(item.id)}}>
                <a><i className="fa fa-times"></i></a>
            </button>
        </td></tr>);
};


const TasksComponent = observer(props => {
    return(
        <div>
            <table>
                <tbody>
                <tr>
                    <td className="btn btn-simple">
                        סנן משימות לפי:
                    </td>
                    <td>
                        <StatusFilter TasksStore ={props.TasksStore} statusim = {["הסתיים", "בטיפול", "בבדיקה"]} component = "tasks"/>
                    </td>
                    <td>
                        { true?   <DeveloperFilter TasksStore ={props.TasksStore} component = "tasks"/>  : false }
                    </td>
                    <td>
                        { true?  <ProjectFilter TasksStore ={props.TasksStore}/>  : false }
                    </td>
                    <td className="btn btn-simple"> <a onClick= {e => props.TasksStore.filteredTasks = props.TasksStore.allTasks}>
                        הסר סינון
                    </a></td>
                </tr>
                </tbody>
            </table>
            <div className="container padding-bottom-card">

                <div className="row">
                    <div className="col-md-12">
                        <div id="tasks" className="card">
                            <div className="header header-primary text-center">
                                {props.annonymousUser? " תקלות" : false}
                                {props.component == "admin" ? "משימות": false}
                                {props.component == "developer" ? " המשימות שלי" : false}
                            </div>
                            <table className="table">
                                <thead>
                                {props.annonymousUser ?
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-right">תוכנה</th>
                                        <th className="text-right">נפתחה בתאריך</th>
                                        <th className="text-right">סטטוס</th>
                                        <th className="text-right">נפתחה ע"י</th>
                                        <th className="text-right">תאור התקלה</th>
                                        <th className="text-right">פעולות</th>
                                    </tr>

                                    :

                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-right">תוכנה</th>
                                        <th className="text-right">נפתחה בתאריך</th>
                                        <th className="text-right">מפתח</th>
                                        <th className="text-right">סטטוס</th>
                                        <th className="text-right">תאור התקלה</th>
                                        <th className="text-right">פעולות</th>
                                    </tr>
                                }

                                </thead>
                                <tbody>
                                {props.annonymousUser ?
                                    props.TasksStore.filteredTasks.toJS().map(createTrforAnnonumoseUser)
                                    :
                                    props.TasksStore.filteredTasks.toJS().map((task, index) => createTrforLoggedInUser(task,index,props))

                                }
                                </tbody>
                            </table>
                            <div className="m-b-md m-l-xxl pull-left">
                                <Link to = {"/devs/index/task/"}>
                                    {/*<button className="btn btn-primary btn-fab btn-round" onClick={props.addTask}> */}
                                    <button className="btn btn-primary btn-fab btn-round">
                                        <i className="material-icons">add</i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default TasksComponent;
