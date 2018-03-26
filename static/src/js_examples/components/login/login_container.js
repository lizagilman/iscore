import React, { Component } from 'react';
import { observer } from 'mobx-react';
import LoginComponent from './login_component';
import { loginApi, getUserApi } from '../../utils/api';

@observer
class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    componentWillMount(){

    }

    login() {
        const user = $('#userLogin').val();
        const password = $('#passwordLogin').val();
        loginApi(user, password)
            .then(response => {
                if(response.status >= 400){
                    this.props.UserStore.loginFail = true;
                }
                else {
                    response.json().then(authJson =>{
                        localStorage.setItem('token', authJson.auth_token);
                        getUserApi(localStorage.getItem('token'))
                            .then(response => response.json().then(userJson => {
                                localStorage.setItem('user_id', userJson.id);
                                this.props.UserStore.name = userJson.username;
                                this.props.UserStore.anonymous =false;
                                this.props.UserStore.developer =true;
                                this.props.UserStore.loginFail = false;
                                this.context.router.push('/devs/index/developer/');

                            }))
                    });

                }})
    }
    render() {
        return (
            <div>
                {
                    <LoginComponent login={this.login} UserStore = {this.props.UserStore}/>
                }
            </div>
        );
    }
}

/*
Liza.propTypes = {
    params: PropTypes.object,
};
*/

Login.contextTypes = {
    router: React.PropTypes.object
};


export default Login;
