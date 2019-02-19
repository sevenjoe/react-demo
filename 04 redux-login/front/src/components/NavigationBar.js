import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';


class NavigationBar extends Component {

    onLogout = (e) => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/')
    };

    render() {
        // console.log(localStorage);
        const {isAuthenticated} = this.props.auth;
        // console.log(user);
        const userLinks = (

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" onClick={this.onLogout}>Logout</Link>
                </li>
            </ul>


        );

        const guestLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign up </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login </Link>
                </li>
            </ul>
        );


        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className='container'>
                    <Link className="navbar-brand" to="/">ReduxLogin</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExample05"
                            aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        {isAuthenticated ? userLinks : guestLinks}

                    </div>
                </div>

            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default withRouter(connect(mapStateToProps, {logout})(NavigationBar));