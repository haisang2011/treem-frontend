import { ManageAccount } from '../contants/actionType';
import ManageAccountApi from '../api/manageAccountApi';
import { returnErrors } from '../actions/errorAction';

export const fetchAccountSearch = (payload) => {
    return {
        type : ManageAccount.FETCH_ACCOUNT_SEARCH,
        payload
    }
}

export const fetchAccountSearchRequest = (params) => dispatch => {
    ManageAccountApi.getAccountSearchHaveParams(params)
                    .then(res => {
                        dispatch(fetchAccountSearch(res.result))
                    })
                    .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                    })
}

export const updateAccount = (payload) => {
    return {
        type : ManageAccount.UPDATE_ACCOUNT,
        payload
    }
}

export const updateAccountRequest = (params, valueSearch) => dispatch => { 

    ManageAccountApi.updateAccount(params)
                    .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageAccountApi.getAccountSearchHaveParams(valueSearch)
                        .then(resListAccount => {
                            dispatch(fetchAccountSearch(resListAccount.result))
                        })
                        .catch(errListAccount => {
                            dispatch(returnErrors(errListAccount.code, errListAccount.message))
                        })

                    })
                    .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                    })
}

export const updatePasswordAccountRequest = (params) => dispatch => { 

    ManageAccountApi.updatePasswordAccount(params)
                    .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        // ManageAccountApi.getAccountSearchHaveParams(valueSearch)
                        // .then(resListAccount => {
                        //     dispatch(fetchAccountSearch(resListAccount.result))
                        // })
                        // .catch(errListAccount => {
                        //     dispatch(returnErrors(errListAccount.code, errListAccount.message))
                        // })

                    })
                    .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                    })
}