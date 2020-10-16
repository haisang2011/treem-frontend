import auth from './authReducer';
import error from './errorReducer';
import manageChildren from './manageChildrenReducer';
import common from './commonReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    error,
    manageChildren,
    common
})