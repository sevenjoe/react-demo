import {combineReducers} from 'redux';

import auth from './auth';
import flashMessages from './flashMessage';

export default combineReducers({
    auth,flashMessages
})