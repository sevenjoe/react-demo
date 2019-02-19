import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/NavigationBar';
import FlashMessagesList from './components/flash/FlashMessagesList';
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import routes from './routes';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from './utils/setAuthorizationToken'
import {setCurrentUser} from "./actions/authActions";

const store = createStore(
    rootReducer,
    // applyMiddleware(thunk);

composeWithDevTools(
    applyMiddleware(thunk, logger)
)
)
;

// setAuthorizationToken(localStorage.jwtToken);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <NavigationBar/>
                <FlashMessagesList/>
                {routes}
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);


serviceWorker.unregister();
