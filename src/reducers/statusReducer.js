import { Status } from '../contants/actionType'

const initialState = {
    isShowDetailChildren : false,
    isShowDetailChildrenFollowIdFamily : false,
    isShowDetailChildrenFollowLocationUser : false,
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
                isShowDetailChildrenFollowIdFamily : action.payload,
                isShowDetailChildrenFollowLocationUser : action.payload,
            }
        case Status.OPEN_DETAIL_CHILDREN_FOLLOW_ID_FAMILY:
            return {
                ...state,
                isShowDetailChildrenFollowIdFamily : action.payload,
            }
        case Status.OPEN_DETAIL_CHILDREN_FOLLOW_LOCATION_USER:
            return {
                ...state,
                isShowDetailChildrenFollowLocationUser : action.payload,
            }
        default:
            return state;
    }
}