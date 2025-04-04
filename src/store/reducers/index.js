import { combineReducers } from 'redux';
import casesReducer from 'store/reducers/casesReducer';
import usersReducer from 'store/reducers/usersReducer';

const rootReducer = combineReducers({
    cases: casesReducer,
    users: usersReducer
    // add other reducers here
});

export default rootReducer;