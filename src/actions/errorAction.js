import { Error } from '../contants/actionType'

export const returnErrors = (code, msg) => {
    return {
        type : Error.GET_ERRORS,
        payload : {
            code,
            msg
        }
    }
}

export const clearErrors = () => {
    return {
        type : Error.CLEAR_ERRORS,
    }
}