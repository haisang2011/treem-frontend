import { CommonList } from '../contants/actionType'

const initialState = {
    quanhuyenList : [],
    phuongxaList : [],
    thonList : [],
    listHCDB : [],
    listNCHCDB : [],
    listHCK : [],
    listHTTG : [],
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
        case CommonList.CLEAR_DATA_VILLAGE :
            return {
                ...state,
                thonList : []
            }
        case CommonList.FETCH_DATA_HCDB :
            return {
                ...state,
                listHCDB : [...action.payload],
            }
        case CommonList.FETCH_DATA_NCHCDB :
            return {
                ...state,
                listNCHCDB : [...action.payload],
            }
        case CommonList.FETCH_DATA_HCK :
                return {
                    ...state,
                    listHCK : [...action.payload],
                }
        case CommonList.FETCH_DATA_HTTG :
            return {
                ...state,
                listHTTG : [...action.payload],
            }
        default:
            return state;
    }
}