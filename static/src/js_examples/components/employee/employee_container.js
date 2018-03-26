import React, { Component } from 'react';
import EmployeeComponent from './employee_component';


class Employee extends Component {

    constructor(props) {
        super(props);
        // this.numberOfLizot = 0;
    }

    componentWillMount() {
        // this.numberOfLizot = Number(this.props.params.id);
    }

    render() {

        return (
            <div>
                <EmployeeComponent TasksStore={this.props.TasksStore} UserStore={this.props.UserStore}/>
            </div>
        );
    }
}

/*
Liza.propTypes = {
    params: PropTypes.object,
};
*/

export default Employee;