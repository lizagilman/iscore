import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Link from 'react-router/lib/Link';
import Navbar from '../navbar/navbar_container';


const RootComponent = observer((props) =>
        <div>
            <Navbar loggedDevelopersTasks = {props.stores.TasksStore.loggedDevelopersTasks}
                    ProjectsStore = {props.stores.ProjectsStore}
                    TasksStore = {props.stores.TasksStore}
                    WorkDayStore = {props.stores.WorkDayStore}
                    UserStore = {props.stores.UserStore}/>
            <div id="childrenDiv">
                {props.children && React.cloneElement(props.children, {...props.stores})}
            </div>
        </div>
);

RootComponent.propTypes = {
    children: PropTypes.object.isRequired,
};

export default RootComponent;
