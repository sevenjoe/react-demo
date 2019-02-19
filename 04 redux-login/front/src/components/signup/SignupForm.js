import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false,
            invalid:false
        }
    }

    static contextTypes = {
        router: PropTypes.object
    };
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired
    };

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.setState({errors: {}, isLoading: true});
        this.props.userSignupRequest(this.state).then(
            () => {
                this.props.addFlashMessage(
                    {
                        type: "success",
                        text: "You signed up successfully. welcome!"
                    }
                );

                /*第二种注册成功后路由跳转到首页,这个方法可以由其父组件穿过来,
                也可以从withRouter高阶组件传过来
                this.props.history.push('/')*/

                //第三种路由跳转,上下文方式
                this.context.router.history.push('/login')

            },
            ({response}) => {
                this.setState({errors: response.data, isLoading: false})
            }
        );
    };

    checkUserExitsts = (e) => {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            this.props.isUserExists(val).then(res => {
                console.log(res);
                let errors = this.state.errors;
                let invalid;
                if (res.data.user){
                    errors[field]=`There is user with such ${field}`;
                    invalid = true
                }else{
                    errors[field]='';
                    invalid = false
                }
                this.setState({errors,invalid})
            })
        }
    };

    render() {
        const {errors} = this.state;
        return (
            //如果onSubmit是箭头函数就不用bind(this)了;
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                {/*用户名========================================*/}
                <div className='form-group'>
                    <label className="control-label">
                        Username
                    </label>
                    <input value={this.state.username}
                           onChange={this.onChange.bind(this)}
                           onBlur={this.checkUserExitsts}
                           type="text"
                           name="username"
                           className={classnames("form-control", {'is-invalid': errors.username})}
                    />
                    {errors.username && <span className='form-text text-muted'>{errors.username}</span>}
                </div>

                {/*邮箱==========================================*/}
                <div className='form-group'>
                    <label className="control-label">
                        Email
                    </label>
                    <input value={this.state.email}
                           onBlur={this.checkUserExitsts}
                           onChange={this.onChange.bind(this)}
                           type="email"
                           name="email"
                           className={classnames("form-control", {'is-invalid': errors.email})}
                    />
                    {errors.email && <span className='form-text text-muted'>{errors.email}</span>}
                </div>

                {/*密码===========================================*/}
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

                {/*确认密码=========================================*/}
                <div className='form-group'>
                    <label className="control-label">
                        PasswordConfirmation
                    </label>
                    <input value={this.state.passwordConfirmation}
                           onChange={this.onChange.bind(this)}
                           type="password"
                           name="passwordConfirmation"
                           className={classnames("form-control", {'is-invalid': errors.passwordConfirmation})}
                    />
                    {errors.passwordConfirmation &&
                    <span className='form-text text-muted'>{errors.passwordConfirmation}</span>}
                </div>

                {/*提交按钮=========================================*/}
                <div className="form-group">
                    <button disabled={this.state.isLoading||this.state.invalid} className='btn btn-primary btn-lg'>
                        Sign up
                    </button>
                </div>
            </form>
        )
    }
}

export default SignupForm;

// 第二种路由跳转方式export default withRouter(SignupForm);