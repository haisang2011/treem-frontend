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
    CLEANUP_DATA_DETAIL_CHILDREN : 'cleanUp_data_detail_children',
    CLEANUP_ALL_DATA : 'cleanUp_all_data',
}

const ManageFamily = {
    FETCH_DATA_FAMILY : 'fetch_data_family',
    CLEANUP_ALL_DATA : 'cleanUp_all_data',
}

const CommonList = {
    FETCH_DATA_DISTRICT : 'fetch_data_district',
    FETCH_DATA_WARD : 'fetch_data_ward',
    FETCH_DATA_VILLAGE : 'fetch_data_village',
    FETCH_DATA_HCDB : 'fetch_data_hcdb',
    FETCH_DATA_NCHCDB : 'fetch_data_nchcdb',
    FETCH_DATA_HCK : 'fetch_data_hck',
    FETCH_DATA_HTTG : 'fetch_data_httg',
    CLEAR_DATA_VILLAGE : 'clear_data_village',
    CLEANUP_ALL_DATA : 'cleanUp_all_data',
}

const ManageAccount = {
    FETCH_ACCOUNT_SEARCH : 'fetch_account_search',
    UPDATE_ACCOUNT : 'update_account',
    CLEANUP_ALL_DATA : 'cleanUp_all_data',
}

const ManageLocal = {
    FETCH_DATA_LOCAL : 'fetch_data_local',
    ADD_LOCAL : 'add_local',
    UPDATE_LOCAL : 'update_local',
    DELETE_LOCAL : 'delete_local',
    CLEANUP_ALL_DATA : 'cleanUp_all_data',
}

const Status = {
    OPEN_DETAIL_CHILDREN : 'open_detail_children',
    CLOSE_DETAIL_CHILDREN : 'close_detail_children',
    OPEN_DETAIL_CHILDREN_FOLLOW_ID_FAMILY : 'open_detail_children_follow_id_family',
    CLOSE_DETAIL_CHILDREN_FOLLOW_ID_FAMILY : 'close_detail_children_follow_id_family',
    OPEN_DETAIL_CHILDREN_FOLLOW_LOCATION_USER : 'open_detail_children_follow_location_user',
    CLEANUP_ALL_DATA : 'cleanUp_all_data',
}

export {
    Auth,
    Error,
    ManageChildren,
    CommonList,
    ManageAccount,
    ManageLocal,
    Status,
    ManageFamily,
}