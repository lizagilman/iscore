import React, { PropTypes } from 'react';
import Tasks from '../../components/tasks/tasks_container';

const EmployeeComponent = props =>

    <div>
        <Tasks TasksStore={props.TasksStore} UserStore={props.UserStore} component="developer"/>
    </div>


/*
 LizaComponent.propTypes = {
 name: PropTypes.string.isRequired,
 numberOfLizot: PropTypes.number.isRequired,
 };
 */

export default EmployeeComponent;
