import React, { PropTypes } from 'react';



const TaskComponent = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 pull-right">
                    <div id="task" className="card">
                        <div className="row">
                            <div className="col-md-6" id="projectForm">
                                <div className="md-form">
                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">תקלה בתוכנה:</label>
                                        <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            בחר
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href="">רמזור</a></li>
                                            <li><a href="#">נאוה</a></li>
                                            <li><a href="#">פלטפורמה למתכנתים</a></li>
                                        </ul>
                                    </div>

                                    <label className="active formLabel">תאור</label>
                                    <input id="description" onChange={props.saveValue} className="form-control" type="text" value={props.task.description}/>

                                    <label className="active formLabel">תאריך התחלה</label>
                                    <input id="start_date" onChange={props.saveValue} className="datepicker form-control" type="text" value={props.task.start_date} />


                                    <label className="active formLabel">תאריך יעד</label>
                                    <input className="datepicker form-control" type="text" id="due_date" onChange={props.saveValue} value={props.task.due_date} />

                                    <label className="active formLabel">תאריך סיום</label>
                                    <input className="datepicker form-control" type="text" id="end_date" onChange={props.saveValue} value={props.task.end_date} />


                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">סטטוס</label>
                                        <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            {props.task.task_status}
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a href="">בבדיקה</a></li>
                                            <li><a href="#">בטיפול</a></li>
                                            <li><a href="#">הסתיים</a></li>
                                        </ul>

                                    </div>

                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">מתכנת אחראי</label>
                                        <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            {props.task.developer ? props.task.developer.name : false}
                                            <b className="caret"></b>
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li><a>לימור אלייב</a></li>
                                            <li><a>גל יעיש</a></li>
                                            <li><a>יונתן שטקל</a></li>
                                            <li><a>יונתן שטקל</a></li>
                                        </ul>
                                    </div>

                                    <div className="dropdown">
                                        <label className="active" htmlFor="form6">האם תקלה?</label>
                                        <a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">
                                            {props.task.is_bug ? <span>כן</span>: <span>לא</span>}
                                            <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a>כן</a></li>
                                            <li><a>לא</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


/*
 LizaComponent.propTypes =  {
 name: PropTypes.string.isRequired,
 numberOfLizot: PropTypes.number.isRequired,
 };
 */

export default TaskComponent;
