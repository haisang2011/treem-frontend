/* Action Type Of Sign In */
const Auth = {
    USER_LOADING : 'login_loading',
    USER_LOADED : 'login_loaded',
    LOGIN_SUCCESS : 'login_success',
    LOGIN_FAIL : 'login_fail',
    LOGOUT_SUCCESS : 'logout_success',
    AUTH_ERROR : 'auth_error'
}

const Error = {
    GET_ERRORS : 'get_errors',
    CLEAR_ERRORS : 'clear_errors'
}

const ManageChildren = {
    FETCH_DATA : 'fetch_data',
}

const CommonList = {
    FETCH_DATA_DISTRICT : 'fetch_data_district',
    FETCH_DATA_WARD : 'fetch_data_ward',
    FETCH_DATA_VILLAGE : 'fetch_data_village',
}

export {
    Auth,
    Error,
    ManageChildren,
    CommonList,
}