import { ManageAccount } from '../contants/actionType';

export const fetchAccountSearch = (payload) => {
    return {
        type : ManageAccount.FETCH_ACCOUNT_SEARCH,
        payload
    }
}