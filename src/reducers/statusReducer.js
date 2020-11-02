import { Status } from '../contants/actionType'

const initialState = {
    isShowDetailChildren : false,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case Status.OPEN_DETAIL_CHILDREN:
            return {
                ...state,
                isShowDetailChildren : action.payload,
            }  
        case Status.CLOSE_DETAIL_CHILDREN:
            return {
                ...state,
                isShowDetailChildren : action.payload,
            }  
        default:
            return state;
    }
}