import { ManageAccount } from '../contants/actionType'

const initialState = {
    listAccount : [],
}

export default (state=initialState, action) => {
    switch (action.type) {
        case ManageAccount.FETCH_ACCOUNT_SEARCH:
            return {
                ...state,
                listAccount : [...action.payload]
            };
        case ManageAccount.CLEANUP_ALL_DATA:
            return {
                listAccount : []
            };
        default:
            return state;
    }
}