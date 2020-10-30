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
        default:
            return state;
    }
}