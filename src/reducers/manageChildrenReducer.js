import { ManageChildren } from '../contants/actionType'

const initialState = {
    childrenList : [],
}

export default (state=initialState, action) => {
    switch (action.type) {
        case ManageChildren.FETCH_DATA:
            return {
                ...state,
                childrenList : action.payload
            };
        default:
            return state;
    }
}