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
    FETCH_SPECIAL_CIRCUMSTANCES : 'fetch_special_circumstances',
    FETCH_RISK_SPECIAL_CIRCUMSTANCES : 'fetch_risk_special_circumstances',
    FETCH_OTHER_CIRCUMSTANCES : 'fetch_other_circumstances',
    FETCH_FORM_OF_HELP : 'fetch_form_of_help',
    FETCH_DATA_DETAIL_CHILDREN : 'fetch_data_detail_children',
}

const CommonList = {
    FETCH_DATA_DISTRICT : 'fetch_data_district',
    FETCH_DATA_WARD : 'fetch_data_ward',
    FETCH_DATA_VILLAGE : 'fetch_data_village',
    FETCH_DATA_HCDB : 'fetch_data_hcdb',
    FETCH_DATA_NCHCDB : 'fetch_data_nchcdb',
    FETCH_DATA_HCK : 'fetch_data_hck',
    FETCH_DATA_HTTG : 'fetch_data_httg',
    CLEAR_DATA_VILLAGE : 'clear_data_village'
}

const ManageAccount = {
    FETCH_ACCOUNT_SEARCH : 'fetch_account_search',
}

const ManageLocal = {
    FETCH_DATA_LOCAL : 'fetch_data_local',
}

const Status = {
    OPEN_DETAIL_CHILDREN : 'open_detail_children',
    CLOSE_DETAIL_CHILDREN : 'close_detail_children',
}

export {
    Auth,
    Error,
    ManageChildren,
    CommonList,
    ManageAccount,
    ManageLocal,
    Status
}