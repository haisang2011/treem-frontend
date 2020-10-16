import { Error } from '../contants/actionType'

const initialState = {
    msg: {},
    code : null,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case Error.GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.code,
            }
        case Error.CLEAR_ERRORS:
            return {
                msg: {},
                code: null,
            }    
        default:
            return state;
    }
}