import { ManageLocal } from '../contants/actionType';

export const fetchDataLocal = (payload) => {
    return {
        type : ManageLocal.FETCH_DATA_LOCAL,
        payload
    }
}