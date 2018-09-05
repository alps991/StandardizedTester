import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import testingReducer from '../reducers/testing';
import pastTestsReducer from '../reducers/pastTests';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            testing: testingReducer,
            pastTests: pastTestsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
