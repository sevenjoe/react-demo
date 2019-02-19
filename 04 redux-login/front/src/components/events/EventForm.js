import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {createEvent} from '../../actions/eventActions';

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errors: {},
            isLoading: false
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    onSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state)
    };

    render() {
        return (

            <form onSubmit={this.onSubmit}>
                <h1>New Event</h1>

                <div className='form-group'>
                    <label className="control-label">
                        Title
                    </label>
                    <input value={this.state.value}
                           onChange={this.onChange}
                           type="text"
                           name="title"
                           className={classnames("form-control", {'is-invalid': this.state.errors.title})}
                    />
                </div>


                <div className="from-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Create
                    </button>
                </div>
            </form>
        );
    }
}

export default connect(null,{createEvent})(EventForm);
