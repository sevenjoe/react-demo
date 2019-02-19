import React, {Component} from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import {userSignupRequest,isUserExists} from "../../actions/signupActions";
import {addFlashMessage} from "../../actions/flashMessages";

class SignupPage extends Component{
    render() {
        const {addFlashMessage,userSignupRequest,isUserExists} = this.props;
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    {/*路由跳转第一种方法,把historyd对象传给子组件,history={this.props.history}*/}
                    <SignupForm addFlashMessage={addFlashMessage} userSignupRequest={userSignupRequest} isUserExists={isUserExists}/>
                </div>
                <div className="col-md-3"></div>
            </div>
        )
    }
}

export default connect(null,{userSignupRequest,addFlashMessage,isUserExists})(SignupPage);