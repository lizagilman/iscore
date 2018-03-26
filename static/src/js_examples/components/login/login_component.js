import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';

const LoginComponent = observer(props => {
    return(
        <div id="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="card card-signup">
                            <form className="form" method="" action="">
                                <div className="header header-primary text-center">
                                    <h4>כניסה למערכת12</h4>
                                </div>
                                <div className="content flex-center">
                                    <div className="input-group">
                                        <div className="form-group is-empty"><input id="userLogin" type="text" className="form-control text-center" placeholder="שם משתמש" /><span className="material-input"></span></div>
                                    </div>
                                    <div className="input-group">
                                        <div className="form-group is-empty"><input id="passwordLogin" type="password" className="form-control text-center" placeholder="סיסמה" /><span className="material-input"></span></div>
                                    </div>
                                </div>
                                <div className="footer text-center">
                                    <a href="#" className="btn btn-simple btn-primary btn-lg" onClick={props.login.bind(this)}>כניסה</a>
                                </div>
                            </form>
                        </div>
                        {props.UserStore.loginFail? <span>ההתחברות נכשלה</span>:false}
                    </div>
                </div>
            </div>
        </div>
    );
});
export default LoginComponent;