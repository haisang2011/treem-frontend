import { CommonList } from '../contants/actionType'

const initialState = {
    quanhuyenList : [],
    phuongxaList : [],
    thonList : [],
}

export default (state=initialState, action) => {
    switch (action.type) {
        case CommonList.FETCH_DATA_DISTRICT :
            return {
                ...state,
                quanhuyenList : [...action.payload]
            }
        case CommonList.FETCH_DATA_WARD :
            return {
                ...state,
                phuongxaList : [...action.payload]
            }
        case CommonList.FETCH_DATA_VILLAGE :
            return {
                ...state,
                thonList : [...action.payload]
            }
        default:
            return state;
    }
}