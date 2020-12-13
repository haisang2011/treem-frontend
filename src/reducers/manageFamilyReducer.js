import { ManageFamily } from '../contants/actionType'

const initialState = {
    familyList : [],
    totalFamilyList : null,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case ManageFamily.FETCH_DATA_FAMILY:
            return {
                ...state,
                familyList : [...action.data.payload],
                totalFamilyList : action.data.total
            };
        case ManageFamily.CLEANUP_ALL_DATA:
            return {
                familyList : [],
                totalFamilyList : null,
            };
        default:
            return state;
    }
}