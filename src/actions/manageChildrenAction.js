import { ManageChildren } from '../contants/actionType';

export const fetchData = (payload) => {
    return {
        type : ManageChildren.FETCH_DATA,
        payload
    }
}