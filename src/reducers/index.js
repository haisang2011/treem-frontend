import auth from './authReducer';
import error from './errorReducer';
import manageChildren from './manageChildrenReducer';
import common from './commonReducer';
import manageAccount from './managaAccountReducer';
import manageLocal from './manageLocalReducer';
import status from './statusReducer';
import family from './manageFamilyReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    error,
    manageChildren,
    manageAccount,
    manageLocal,
    common,
    status,
    family,
})