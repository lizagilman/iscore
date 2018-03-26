import React, { PropTypes } from 'react';
import StatusFilter from '../../components/status-filter/status_filter_container'
import DeveloperFilter from '../../components/developer_filter/developer_filter_container'
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { getNatanDevReport } from '../../utils/api';
import ToDoList from './todo_list/todo_list_container'


const ProjectDescriptionModal = function (item, id) {
    return (
        <div className="modal fade" id={"project"+id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{"תאור "+item.name}</h4>
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


const createTr = function(item, index, props) {
    return (<tr key={"project"+index}>
            <td className="text-center">{index}</td>
            <td>{item.name}</td>
            <td>{item.project_status}</td>
            <td>{item.review_date}</td>
            <td>{item.due_date}</td>
            <td>{item.end_date}</td>
            <td className="td-actions text-right">
                <button type="button" rel="tooltip" className="btn btn-info btn-simple btn-xs" data-toggle="modal" data-target={"#project"+index} title="תאור הפרוייקט">
                    <a> <i className="fa fa-list-alt"></i></a>
                </button>
                {ProjectDescriptionModal(item, index)}
                <button type="button" rel="tooltip" className="btn btn-success btn-simple btn-xs" title="קובץ אפיון">
                    {
                        item.description_file_s3_url ?
                            <a href={item.description_file_s3_url}> <i className="fa fa-file-o"></i></a>
                            :
                            <i className="fa fa-file-o"></i>
                    }
                </button>
                <button type="button" rel="tooltip" title="עריכה" className="btn btn-success btn-simple btn-xs">
                    <Link to = {"/devs/index/project/"+item.id}><i className="fa fa-edit"></i></Link>
                </button>
                <button type="button" rel="tooltip" className="btn btn-success btn-simple btn-xs" data-toggle="modal" data-target={"#todo_list"+index} title="רשימת משימות">
                    <i className="fa fa-check-square-o"></i>
                </button>
                <ToDoList projectID = {item.id} project ={item} todos_list = {item.todos} index= {index} />
                <button type="button" rel="tooltip" title="מחיקה" className="btn btn-success btn-simple btn-xs" onClick={(e)=>{props.deleteProject(item.id)}}>
                    <i className="fa fa-times" style={{color: '#9c27b0'}}></i>
                </button>
            </td>
        </tr>
    );
};


const ProjectsComponent = observer(props => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td className="btn btn-simple">
                        סנן משימות לפי:
                    </td>
                    <td>
                        <StatusFilter ProjectsStore ={props.ProjectsStore} component = "projects" statusim = {["הסתיים", "בפיתוח", "חדש"]}/>
                    </td>
                    <td>
                        <DeveloperFilter ProjectsStore ={props.ProjectsStore} component = "projects"/>
                    </td>
                    <td>
                        <a onClick= {props.removeFilter}>
                            הסר סינון
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="projects" className="card">
                            {(props.component == "developer")? <div className="header header-primary text-center">הפרוייקטים שלי</div>:<div className="header header-primary text-center">פרוייקטים</div>}
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-right">שם הפרוייקט</th>
                                    <th className="text-right">סטטוס</th>
                                    <th className="text-right">תאריך ביקורת</th>
                                    <th className="text-right">תאריך יעד</th>
                                    <th className="text-right">תאריך סיום</th>
                                    <th className="text-right">פעולות</th>
                                </tr>
                                </thead>
                                <tbody>
                                {props.ProjectsStore.filteredProjects.toJS().map((project, index) => createTr(project,index,props))}
                                </tbody>
                            </table>
                            <div className="m-b-md m-l-xxl pull-left">
                                <Link to = {"/devs/index/project/"}>
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


/*
 LizaComponent.propTypes = {
 name: PropTypes.string.isRequired,
 numberOfLizot: PropTypes.number.isRequired,
 };
 */

ProjectsComponent.contextTypes = {
    router: React.PropTypes.object
};

export default ProjectsComponent;
