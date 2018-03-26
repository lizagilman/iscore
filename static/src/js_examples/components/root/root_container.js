import React, { Component, PropTypes } from 'react';
import * as stores from '../../stores';
import RootComponent from './root_component';
import { getUserApi } from '../../utils/api';
import { observer } from 'mobx-react';


@observer
class Root extends Component {

    constructor(props) {
        super(props);
        this.authenticate = this.authenticate.bind(this);
        this.getTokenFromStorageAndAuthenticate = this.getTokenFromStorageAndAuthenticate.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    componentWillMount(){
        this.getTokenFromStorageAndAuthenticate();
    }

    componentWillUpdate(){
        if (!stores.UserStore.anonymous && !stores.UserStore.developer){
            this.getTokenFromStorageAndAuthenticate()
        }
    }

    getTokenFromStorageAndAuthenticate(){
        stores.UserStore.anonymous = true;
        if(localStorage.getItem('token')){
            stores.UserStore.id = Number(localStorage.getItem('user_id'));
            getUserApi(localStorage.getItem('token')).then(this.authenticate);
        }
        else{
            if (this.props.location.pathname !="/devs/index/task/") {
                this.redirectToHome();
            }
        }
    }

    authenticate(response){
        (response.json().then(json=>
        {if(stores.UserStore.id === json.id){
            stores.UserStore.anonymous = false;
            stores.UserStore.developer = true;
            stores.UserStore.name = response.username;
        }
        else{
            stores.UserStore.anonymous = true;
            if(this.props.location.pathname !="/devs/index/task/"){
                this.redirectToHome();
            }

        }}))

    }

    redirectToHome(){
        if(this.props.children.type.name !== 'Employee' && this.props.children.type.name !== 'Login'){
            this.context.router.push('/devs/index/');
        }
    }


    render() {
        if (!stores.UserStore.anonymous && !stores.UserStore.developer){ console.log("loading");return (<LoadingComponent/>);}
            return (
              <RootComponent children={this.props.children} stores={stores} />
          );
    }
}
Root.propTypes = {
    children: PropTypes.object.isRequired,
};

Root.contextTypes = {
    router: React.PropTypes.object
};

export default Root;
