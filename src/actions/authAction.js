import { Auth } from '../contants/actionType';
import { returnErrors } from './errorAction';
import { fetchData } from './manageChildrenAction';
import { fetchDistrict, fetchWard, fetchVillage } from './commonAction';
import userApi from '../api/userApi';
import manageChildrenApi from '../api/manageChildrenApi';
import commonApi from '../api/commonApi';


export const loadUser = () => (dispatch, getState) => {

    /* User loading */
    if(getState().auth.token){

    dispatch({ type : Auth.USER_LOADING });

    manageChildrenApi.getAll()
                     .then(res => {

                         const {
                             username,
                             location
                         } = res
                         
                         const payload = {username, location}
                        
                         /* Check Location to Fetch Data List */
                         if(location.id_tinh && !location.id_quan && !location.id_xa){
                             /* Fetch Data District */
                            commonApi.getDistrict(location.id_tinh)
                            .then(resDistrict => {
                                dispatch(fetchDistrict(resDistrict.result))
                            })
                            .catch(errDistrict => {
                                const { code, message } = errDistrict.response.data
                                dispatch(returnErrors(code, message));
                            })
                         }else if(location.id_tinh && location.id_quan && !location.id_xa){
                             /* Fetch Data Ward */
                            commonApi.getWard(location.id_quan)
                            .then(resWard => {
                                dispatch(fetchWard(resWard.result))
                            })
                            .catch(errWard => {
                                const { code, message } = errWard.response.data
                                dispatch(returnErrors(code, message));
                            })
                         }else if(location.id_tinh && location.id_quan && location.id_xa){
                            /* Fetch Data Village */
                            commonApi.getVillage(location.id_xa)
                            .then(resVillage => {
                                dispatch(fetchVillage(resVillage.result))
                            })
                            .catch(errVillage => {
                                const { code, message } = errVillage.response.data
                                dispatch(returnErrors(code, message));
                            })
                         }else{
                             // Do something
                         }

                         dispatch(fetchData(res.result))
                         dispatch({
                             type : Auth.USER_LOADED,
                             payload : payload
                         })
                     })
                     .catch(err => {
                         const { code, message } = err.response.data
                         dispatch(returnErrors(code, message));
                         dispatch({
                             type : Auth.AUTH_ERROR
                         })
                     })
                    }
}

export const login = (data) => (dispatch, getState) => {
    userApi.login(data)
           .then(res_ => {
               dispatch({
                    type : Auth.LOGIN_SUCCESS,
                    payload : res_
                })

                manageChildrenApi.getAll()
                     .then(res__ => {

                        const {
                            username,
                            location
                        } = res__

                        if(location.id_tinh && location.id_quan && location.id_xa){
                            /* Fetch Village */
                            commonApi.getVillage(res_.location.id_xa)
                            .then(res => {
                                dispatch(fetchVillage(res.result))
                            })
                            .catch(err => {
                                const { code, message } = err.response.data
                                dispatch(returnErrors(code, message));
                            })
                        }else if(location.id_tinh && location.id_quan && !location.id_xa){
        
                            /* Fetch Ward */
                            commonApi.getWard(res_.location.id_quan)
                            .then(res => {
                                dispatch(fetchWard(res.result))
                            })
                            .catch(err => {
                                const { code, message } = err.response.data
                                dispatch(returnErrors(code, message));
                            })
        
                        }else if(location.id_tinh && !location.id_quan && !location.id_xa){
                            commonApi.getDistrict(res_.location.id_tinh)
                            .then(res => {
                                dispatch(fetchDistrict(res.result))
                            })
                            .catch(err => {
                                const { code, message } = err.response.data
                                dispatch(returnErrors(code, message));
                            })
                        }else{
                            console.log("Do something")
                        }

                         dispatch(fetchData(res__.result))

                        /* Not need dispatch this */
                        //  dispatch({
                        //      type : Auth.USER_LOADED,
                        //      payload : res__.username
                        //  })
                     })
                     .catch(err__ => {
                         dispatch(returnErrors(err__.code, err__.message));
                     })
        })
        .catch(err => {

        dispatch(
            returnErrors(err.response.code, err.response.message)
        );
        dispatch({
            type : Auth.LOGIN_FAIL
        })
        })
}

export const logout = () => dispatch => {
    dispatch({
        type : Auth.LOGOUT_SUCCESS
    })
}

export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['access-token'] = token;
    }
  
    return config;
  };