import React, { PropTypes } from 'react';


const DeveloperInfoComponent = props =>

    <div id="developerInfo" className="card padding-bottom-card">
        <div className="header header-primary text-center">פרופיל</div>
        <div className="container" id="devInfoRow">
            <div className="row center-col-md">
                <div className="col-md-2" title="תאריך סיום">{props.developer.end_date !== null? props.developer.end_date : "-"}</div>
                <div className="col-md-2" title="תאריך התחלה">{props.developer.start_date !== null? props.developer.start_date : "תאריך התחלה לא קיים"}</div>
                <div className="col-md-2" title="היקף משרה">{props.developer.position_type !== null? props.developer.position_type : "סוג משרה לא קיים"}</div>
                  <div className="col-md-2">
                    <div className="progress" title="אחוז שעות חודשיות שהושלמו">
                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: Number((props.developer.monthly_hours_completed/ props.developer.monthly_hours_required)*100) +'%'}}>
                            <span className="sr-only">{Number((props.developer.monthly_hours_completed/ props.developer.monthly_hours_required)*100) +'%'} Complete!!</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2" title="שם">{props.developer.name !== null? props.developer.name : "שם לא קיים"}</div>
                <div className="col-md-2" title="תמונה"><img src={props.developer.photo !== "" ? props.developer.photo : "https://s3-us-west-2.amazonaws.com/esg-dev-platform/devs-avatars/default.png"} alt="Circle Image" className="img-circle img-responsive"/></div>
            </div>
        </div>
    </div>;

export default DeveloperInfoComponent;
