import { Auth } from '../contants/actionType'

const initialState = {
    token : localStorage.getItem('token'),
    currentUser : null,
    locationUser : {},
    isAuthenticated : null,
    isLoading : false,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case Auth.USER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case Auth.USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                isLoading : false,
                currentUser : action.payload.username,
                locationUser : {
                    ...state.locationUser,
                    id_tinh : action.payload.location.id_tinh,
                    thanhpho : action.payload.location.thanhpho,
                    id_quan : action.payload.location.id_quan,
                    quanhuyen : action.payload.location.quanhuyen,
                    id_xa : action.payload.location.id_xa,
                    phuongxa : action.payload.location.phuongxa
                }
            };
        case Auth.LOGIN_SUCCESS:
            /* 
                # Set token into Localstorage
             */
            localStorage.setItem('token', action.payload.token)
        return {
            ...state,
            token : action.payload.token,
            currentUser : action.payload.username,
            locationUser : {
                ...state.locationUser,
                id_tinh : action.payload.location.id_tinh,
                thanhpho : action.payload.location.thanhpho,
                id_quan : action.payload.location.id_quan,
                quanhuyen : action.payload.location.quanhuyen,
                id_xa : action.payload.location.id_xa,
                phuongxa : action.payload.location.phuongxa
            },
            isAuthenticated : true,
            isLoading : false,
        };
        case Auth.LOGIN_FAIL:
        case Auth.LOGOUT_SUCCESS:
        case Auth.AUTH_ERROR:
            /* 
                # Remove token in Localstorage
             */
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated : false,
                locationUser: {},
                isLoading : false,
                currentUser : null
            };
        default:
            return state;
    }
}