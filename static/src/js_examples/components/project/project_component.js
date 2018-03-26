import React, { proptypes } from 'react';
import { observer } from 'mobx-react';
import Loading from '../loading_compnent/loading_component';

const createLeaderChoiceLi = function(developer,index, props){
    return(
        <li key={"dev"+index}><a value={""+developer.id} onClick={()=>props.saveValue('leader', developer)} >{developer.name}</a></li>
    );
};

const createDevelopersCheckboxDiv = (projectsDevsIds, developer, index, props) => {
    return(
        <div className="checkbox" key={index}>
            <label>
                <input type="checkbox" checked={projectsDevsIds.includes(developer.id)} onClick={()=> props.updateProjectDevelopers(developer.id)} />
                <span className="checkbox-material"><span className="check"></span></span>
                {developer.name}
            </label>
        </div>
    );
};


const ProjectComponent = observer(props =>
    <div className="container">
        <div className="row">
            <div className="col-md-8 col-sm-8 col-xs-12 pull-right">
                <div id="project" className="card">
                    <div className="row">
                        <form onSubmit ={props.saveProject}>
                            <div className="col-md-6" id="projectform">
                                <div className="md-form">
                                    <label className="active formLabel" htmlFor="name">שם</label>
                                    <input id="name"
                                           value={props.project.name}
                                           onChange={ props.saveValueFromTextInput}
                                           type="text"
                                           className="form-control"
                                           required />
                                    <label className="active formLabel">תאור</label>
                                <textarea id="description"
                                          value={props.project.description}
                                          onChange={props.saveValueFromTextInput}
                                          className="form-control"
                                          rows="5">
                                </textarea>
                                    <label className="active formLabel">תאריך התחלה</label>
                                    <input id="start_date"
                                           value={props.project.start_date}
                                           onChange={props.saveValueFromTextInput}
                                           className="form-control"
                                           type="date" />
                                    <label className="active formLabel">תאריך ביקורת</label>
                                    <input id="review_date"
                                           value={props.project.review_date}
                                           onChange={props.saveValueFromTextInput}
                                           className="form-control"
                                           type="date" />
                                    <label className="active formLabel">תאריך יעד</label>
                                    <input id="due_date"
                                           onChange={props.saveValueFromTextInput}
                                           className="form-control"
                                           type="date"
                                           value={props.project.due_date} />
                                    <label className="active formLabel">תאריך סיום</label>
                                    <input id="end_date"
                                           onChange={props.saveValueFromTextInput}
                                           className="form-control"
                                           type="date"
                                           value={props.project.end_date} />
                                    <label className="active formLabel">כתובת גיטלאב</label>
                                    <input id="git_url"
                                           onChange={props.saveValueFromTextInput}
                                           value={props.project.git_url}
                                           type="text"
                                           className="form-control" />
                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">סוג</label>
                                        <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            {props.project.project_type}
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a onClick={()=>props.saveValue('project_type', 'תוכנה')}>תוכנה</a></li>
                                            <li><a onClick={()=>props.saveValue('project_type', 'דו"ח')}>דוח</a></li>
                                            <li><a onClick={()=>props.saveValue('project_type', 'אחר')}>אחר</a></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">סטטוס</label>
                                        <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            {props.project.project_status}
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a onClick={()=>props.saveValue('project_status', 'חדש')}>חדש</a></li>
                                            <li><a onClick={()=>props.saveValue('project_status', 'בפיתוח')}>בפיתוח</a></li>
                                            <li><a onClick={()=>props.saveValue('project_status', 'הסתיים')}>הסתיים</a></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">אחראי פרוייקט</label>
                                        <a className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            {props.project.leader ? props.project.leader.name : false}
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            {props.allDevelopers ? props.allDevelopers.toJS().map((developer, index) => createLeaderChoiceLi(developer,index, props)) : false}
                                        </ul>
                                    </div>
                                    <div>
                                        <label className="active" htmlFor="form6">מתכנתים</label>
                                        {props.allDevelopers ? props.allDevelopers.toJS().map((developer, index) => createDevelopersCheckboxDiv(props.projectsDevsIds, developer, index, props)) : false}
                                    </div>
                                    <div>
                                        <label className="active" htmlFor="form6">העלאה קובץ אפיון</label>
                                        <input id="uploadDescFile" type="file" onChange={props.uploadFile} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" id="saveBtn" type="submit">
                                    {
                                        props.is_loading ?  <Loading />  : <span>שמור</span>
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

export default ProjectComponent;
