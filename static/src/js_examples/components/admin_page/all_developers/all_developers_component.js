import React, {Component, proptypes } from 'react';
import { observer } from 'mobx-react';


const createDevelopersList = (developer)=>
    <div className="devRow" key={developer.id}>
        {(developer.is_working_now)?<div className="col-md-4 isWorking">עובד כרגע</div> : <div className="col-md-4 notWorking">לא עובד כרגע</div>}
        <div className="col-md-4 devName">עובד/ת על - {developer.currently_working_on}</div>
        <div className="col-md-4 devName">{developer.name}</div>
    </div>;




const AllDevelopersComponent = observer(props =>

<div className="container">
<div id="developersStatus" className="card padding-bottom-card">
    <div className="header header-primary text-center">{"מתכנתים - תמונת מצב-  " + new Date().toLocaleString()}</div>
    <div className="container" id="allDevsStatusContainer">
        <div className="row center-col-md">
             {props.allDevelopers.map(createDevelopersList)}
        </div>
    </div>
</div>
    </div>






);

export default AllDevelopersComponent;

