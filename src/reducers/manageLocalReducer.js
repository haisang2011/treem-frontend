import { ManageLocal } from '../contants/actionType'

const initialState = {
    listLocal : [],
}

export default (state=initialState, action) => {
    switch (action.type) {
        case ManageLocal.FETCH_DATA_LOCAL:
            return {
                ...state,
                listLocal : [...action.payload]
            };
        default:
            return state;
    }
}