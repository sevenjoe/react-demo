import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import validateInput from '../../utils/validations/login'
import {login} from '../../actions/authActions';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        }
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        // validateInput:PropTypes.func.isRequired
    };

    static contextTypes = {
        router: PropTypes.object
    };


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    isValid = ()=>{
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    };



    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()){
            this.setState({errors:{},isLoding:true});
            this.props.login(this.state).then(
                (res)=>this.context.router.history.push('/'),
                (err)=>this.setState({errors:err.response.data.errors,isLoading:false})
            )
        }
    };

    render() {
        const {errors/*, identifier, password*/, isloading} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                {errors.form&&<div className='alert alert-danger'>{errors.form}</div>}
                {/*用户名================================================================*/}
                <div className='form-group'>
                    <label className="control-label">
                        Username / Email
                    </label>
                    <input value={this.state.identifier}
                           onChange={this.onChange.bind(this)}
                           type="text"
                           name="identifier"
                           className={classnames("form-control", {'is-invalid': errors.identifier})}
                    />
                    {errors.identifier && <span className='form-text text-muted'>{errors.identifier}</span>}
                </div>


                {/*密码=================================================================*/}
                <div className='form-group'>
                    <label className="control-label">
                        Password
                    </label>
                    <input value={this.state.password}
                           onChange={this.onChange.bind(this)}
                           type="password"
                           name="password"
                           className={classnames("form-control", {'is-invalid': errors.password})}
                    />
                    {errors.password && <span className='form-text text-muted'>{errors.password}</span>}
                </div>



                {/*登录按钮================================================================*/}
                <div className="form-group">
                    <button disabled={isloading} className='btn btn-primary btn-lg'>
                        Login
                    </button>
                </div>
            </form>
        )
    }
}

export default connect(null,{login: login})(LoginForm);