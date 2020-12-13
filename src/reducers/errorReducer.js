import { Error } from '../contants/actionType'

const initialState = {
    msg: null,
    code : null,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case Error.GET_ERRORS:
            return {
                msg: action.payload.msg,
                code: action.payload.code,
            }
        case Error.CLEAR_ERRORS:
            return {
                msg: null,
                code: null,
            }    
        default:
            return state;
    }
}