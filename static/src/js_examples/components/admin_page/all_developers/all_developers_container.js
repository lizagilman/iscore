import AllDevelopersComponent from './all_developers_component';
import { observer } from 'mobx-react';
import React, {Component } from 'react';
import { getAllDevelopersApi } from '../../../utils/api';


@observer
class AllDevelopers extends Component {


    componentWillMount(){
        if (!(this.props.DevelopersStore.allDevelopers.length > 0)){
            getAllDevelopersApi().then( (json) => {
                this.props.DevelopersStore.allDevelopers = json;
            });
        }
    }


    render(){
        return (
            <AllDevelopersComponent allDevelopers ={this.props.DevelopersStore.allDevelopers}/>
        )
    }



}

export default AllDevelopers;
