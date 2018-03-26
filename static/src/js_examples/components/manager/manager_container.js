import React, { Component } from 'react';
import ManagerComponent from './manager_component';


class Manager extends Component {

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
                <ManagerComponent/>
            </div>
        );
    }
}

/*
Liza.propTypes = {
    params: PropTypes.object,
};
*/

export default Manager;
