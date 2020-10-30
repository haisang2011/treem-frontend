import { ManageChildren, Auth } from '../contants/actionType';
import SpecialCircumstancesApi from '../api/manageChildrenSpecialCircumstancesApi';
import RiskSpecialCircumstancesApi from '../api/manageChildrenRiskSpecialApi';
import ManageChidlrenApi from '../api/manageChildrenApi';
import OtherCircumstancesApi from '../api/manageChildrenOtherCircumstancesApi';
import FormOfHelpApi from '../api/manageChildrenFormOfHelpApi';
import { returnErrors } from '../actions/errorAction';

/* Manage Children */
export const fetchData = (payload, total) => {
    return {
        type : ManageChildren.FETCH_DATA,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataRequest = (query) => dispatch => {
    ManageChidlrenApi.getDataPaginationSearchHaveQuery(query)
                     .then(res => {
                        dispatch(fetchData(res.result, res.total))
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

/* Manage Special Circumstances */
export const fetchDataSpecialCircumstances = (payload, total) => {
    return {
        type : ManageChildren.FETCH_SPECIAL_CIRCUMSTANCES,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataSpecialCircumstancesRequest = (query) => (dispatch) => {
    SpecialCircumstancesApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataSpecialCircumstances(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}

/* Manage Risk Special Circumstances */
export const fetchDataRiskSpecialCircumstances = (payload, total) => {
    return {
        type : ManageChildren.FETCH_RISK_SPECIAL_CIRCUMSTANCES,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataRiskSpecialCircumstancesRequest = (query) => (dispatch) => {
    RiskSpecialCircumstancesApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataRiskSpecialCircumstances(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}

// export const fetchDataRiskSpecialCircumstancesRequest = () => (dispatch) => {
//     SpecialCircumstancesApi.getAll()
//                            .then(res => {
//                              dispatch(fetchData(res.result));
//                            })
//                            .catch(err => {
//                              dispatch(returnErrors(err.code,err.message))
//                              dispatch({
//                                  type: Auth.AUTH_ERROR
//                              })
//                            })
// }

/* Manage Other Circumstances */
export const fetchDataOtherCircumstances = (payload, total) => {
    return {
        type : ManageChildren.FETCH_OTHER_CIRCUMSTANCES,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataOtherCircumstancesRequest = (query) => (dispatch) => {
    OtherCircumstancesApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataOtherCircumstances(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}

/* Manage Form Of Help */
export const fetchDataFormOfHelp = (payload, total) => {
    return {
        type : ManageChildren.FETCH_FORM_OF_HELP,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataFormOfHelpRequest = (query) => (dispatch) => {
    FormOfHelpApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataFormOfHelp(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}