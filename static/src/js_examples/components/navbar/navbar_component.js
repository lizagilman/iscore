import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router'
import WorkButtonComponent from '../work_button/work_button_componenet';
import WorkButtonModalComponent from  './start_working_modal';




const NavbarComponent = observer(props =>

    <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                    {props.UserStore.developer ? <div style={{display: 'inline'}} onClick ={(event) =>{if(props.UserStore.isWorking){props.finishWorking()}}}><WorkButtonComponent /></div>: false}
                    {props.UserStore.isWorking ? false: <WorkButtonModalComponent loggedDevelopersTasks ={props.loggedDevelopersTasks} WorkDayStore = {props.WorkDayStore} startWorking = {props.startWorking} developerProjects= {props.developerProjects}/>}
                    {props.UserStore.developer ? <Link to="/devs/index/login"><span className="btn btn-white btn-simple" onClick={props.disconnectClick}>התנתק</span></Link> : <Link to="/devs/index/login"><span className="btn btn-white btn-simple">התחבר</span></Link>}
                    {props.UserStore.name != false ? <span>{props.UserStore.name}</span> : false}
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">

                    {(props.UserStore.developer) ?
                        <ul className="nav navbar-nav">
                        <li><Link to="/devs/index/admin">אזור ניהול</Link></li>
                        <li className="active"><Link to ="/devs/index/developer">אזור אישי</Link></li>
</ul>
                        : false}
                <ul className="nav navbar-nav">
                    <li><Link to="/devs/index/bugs">אזור תקלות</Link></li>
                </ul>
            </div>
        </div>
    </nav>
);


/*
 LizaComponent.propTypes = {
 name: PropTypes.string.isRequired,
 numberOfLizot: PropTypes.number.isRequired,
 };
 */

export default NavbarComponent;
