import React, {Component } from 'react';
import DeveloperInfoComponent from './developer_info_component';
import { getDeveloperByIdApi } from '../../../utils/api';
import Loading from '../../loading_compnent/loading_component';


class DeveloperInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {developerJson: null};
        // this.numberOfLizot = 0;
    }

    componentWillMount() {
        getDeveloperByIdApi((this.props.UserStore.id)-1).then(devJson => {
            this.setState({ developerJson: devJson });
        });

    }

    render() {
        return (
            <div>
                {
                    this.state.developerJson !== null
                        ? // dispaly loading dialog until data arrives from DB
                        <div className="container">
                            <DeveloperInfoComponent developer = {this.state.developerJson}/>
                        </div>
                        :
                        <Loading/>
                }
            </div>
        );
    }
}

export default DeveloperInfo;
