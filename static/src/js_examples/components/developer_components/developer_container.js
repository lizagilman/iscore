import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import DeveloperComponent from './developer_component';
import Projects from '../../components/projects/projects_container'


@observer
class Developer extends Component {

    constructor(props) {
        super(props);
    }
    
    componentWillMount(){

    }


    render() {
        return (
            <div>
                <DeveloperComponent TasksStore = {this.props.TasksStore} ProjectsStore = {this.props.ProjectsStore} UserStore={this.props.UserStore}/>
            </div>
        );
    }
}


export default Developer;