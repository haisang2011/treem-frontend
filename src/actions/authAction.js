import { 
    Auth, ManageChildren, ManageAccount, 
    CommonList, Error, ManageLocal, Status, ManageFamily
} from '../contants/actionType';
import { returnErrors } from './errorAction';
import { 
    fetchData, 
    fetchDataSpecialCircumstances, 
    fetchDataRiskSpecialCircumstances, 
    fetchDataOtherCircumstances,
    fetchDataFormOfHelp,
} from './manageChildrenAction';
import { 
    fetchDistrict, 
    fetchWard, 
    fetchVillage, 
    fetchListHCDB, 
    fetchListNCHCDB, 
    fetchListHCK,
    fetchListHTTG,
} from './commonAction';
import { fetchAccountSearch } from './manageAccount';
import { fetchDataLocal } from './manageLocal';
import { fetchDataFamily } from './manageFamilyAction';
import userApi from '../api/userApi';
import manageChildrenApi from '../api/manageChildrenApi';
import manageFamilyApi from '../api/manageFamilyApi';
import SpecialCircumstances from '../api/manageChildrenSpecialCircumstancesApi';
import RiskSpecialCircumstances from '../api/manageChildrenRiskSpecialApi';
import OtherCircumstances from '../api/manageChildrenOtherCircumstancesApi';
import FormOfHelp from '../api/manageChildrenFormOfHelpApi';
import commonApi from '../api/commonApi';
import manageAccountApi from '../api/manageAccountApi';
import manageLocalApi from '../api/manageLocalApi';


export const loadUser = () => (dispatch, getState) => {

    /* User loading */
    if(getState().auth.token){

    dispatch({ type : Auth.USER_LOADING });

    manageChildrenApi.getDataPaginationSearch()
                     .then(res => {

                         const {
                             username,
                             location,
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

                            /* List Account */
                            manageAccountApi.getAccountSearch()
                            .then(account => {
                                dispatch(fetchAccountSearch(account.result))
                            })
                            .catch(errAccount => {
                                dispatch(returnErrors(errAccount.code,errAccount.message))
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

                            /* List Village (Local) */
                            manageLocalApi.getAllLocal()
                                            .then(locals => {
                                                dispatch(fetchDataLocal(locals.result))
                                            })
                                            .catch(errLocals => {
                                                dispatch(returnErrors(errLocals.code,errLocals.message))
                                            })
                            
                         }else{
                             // Do something
                         }

                         
                         /* Fetch List HCDB */
                         commonApi.getHCDB()
                                  .then(resHCDB => {
                                      dispatch(fetchListHCDB(resHCDB.result))
                                  })
                                  .catch(errHCDB => {
                                      dispatch(returnErrors(errHCDB.code, errHCDB.message))
                                  })

                        /* Fetch List NCHCDB */
                        commonApi.getNCHCDB()
                        .then(resNCHCDB => {
                            dispatch(fetchListNCHCDB(resNCHCDB.result))
                        })
                        .catch(errNCHCDB => {
                            dispatch(returnErrors(errNCHCDB.code, errNCHCDB.message))
                        })

                        /* Fetch List HCK */
                        commonApi.getHCK()
                        .then(resHCK => {
                            dispatch(fetchListHCK(resHCK.result))
                        })
                        .catch(errHCK => {
                            dispatch(returnErrors(errHCK.code, errHCK.message))
                        })

                        /* Fetch List HTTG */
                        commonApi.getHTTG()
                        .then(resHTTG => {
                            dispatch(fetchListHTTG(resHTTG.result))
                        })
                        .catch(errHTTG => {
                            dispatch(returnErrors(errHTTG.code, errHTTG.message))
                        })


                        /* Special Circumstances */
                        SpecialCircumstances.getDataSearch()
                                            .then(specialCircumstances => {
                                                dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                                            })
                                            .catch(errSpecialCircumstances => {
                                                dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                                            })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstances.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstances.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelp.getDataSearch()
                                .then(FormOfHelp => {
                                    dispatch(fetchDataFormOfHelp(FormOfHelp.result, FormOfHelp.total))
                                })
                                .catch(errFormOfHelp => {
                                    dispatch(returnErrors(errFormOfHelp.code,errFormOfHelp.message))
                                })



                         dispatch(fetchData(res.result, res.total))

                         /* Family */
                        manageFamilyApi.getDataSearch()
                                       .then(Family => {
                                           dispatch(fetchDataFamily(Family.result, Family.total))
                                       })
                                       .catch(errFamily => {
                                           dispatch(returnErrors(errFamily.code, errFamily.message));
                                       })

                         dispatch({
                             type : Auth.USER_LOADED,
                             payload : payload
                         })
                     })
                     .catch(err => {
                         const { code, message } = err
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

                manageChildrenApi.getDataPaginationSearch()
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

                            /* List Village (Local) */
                            manageLocalApi.getAllLocal()
                                            .then(locals => {
                                                dispatch(fetchDataLocal(locals.result))
                                            })
                                            .catch(errLocals => {
                                                dispatch(returnErrors(errLocals.code,errLocals.message))
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

                            /* List Account */
                            manageAccountApi.getAccountSearch()
                            .then(account => {
                                dispatch(fetchAccountSearch(account.result))
                            })
                            .catch(errAccount => {
                                dispatch(returnErrors(errAccount.code,errAccount.message))
                            })
                            
                        }else{
                            console.log("Do something")
                        }

                        dispatch(fetchData(res__.result, res__.total))
                         
                        /* Fetch List HCDB */
                        commonApi.getHCDB()
                        .then(resHCDB => {
                            dispatch(fetchListHCDB(resHCDB.result))
                        })
                        .catch(errHCDB => {
                            dispatch(returnErrors(errHCDB.code, errHCDB.message))
                        })

                        /* Special Circumstances */
                        SpecialCircumstances.getDataSearch()
                                            .then(specialCircumstances => {
                                                dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                                            })
                                            .catch(errSpecialCircumstances => {
                                                dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                                            })


                        /* Fetch List NCHCDB */
                        commonApi.getNCHCDB()
                        .then(resNCHCDB => {
                            dispatch(fetchListHCDB(resNCHCDB.result))
                        })
                        .catch(errNCHCDB => {
                            dispatch(returnErrors(errNCHCDB.code, errNCHCDB.message))
                        })

                        /* Risk Special Circumstances */
                        RiskSpecialCircumstances.getDataSearch()
                                            .then(RiskSpecial => {
                                                dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                            })
                                            .catch(errRiskSpecial => {
                                                dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                            })

                        /* Fetch List HCK */
                        commonApi.getHCK()
                        .then(resHCK => {
                            dispatch(fetchListHCK(resHCK.result))
                        })
                        .catch(errHCK => {
                            dispatch(returnErrors(errHCK.code, errHCK.message))
                        })


                        /* Other Circumstances */
                        OtherCircumstances.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })


                        /* Fetch List HTTG */
                        commonApi.getHTTG()
                        .then(resHTTG => {
                            dispatch(fetchListHTTG(resHTTG.result))
                        })
                        .catch(errHTTG => {
                            dispatch(returnErrors(errHTTG.code, errHTTG.message))
                        })


                        /* Form Of Help */
                        FormOfHelp.getDataSearch()
                                .then(FormOfHelp => {
                                    dispatch(fetchDataFormOfHelp(FormOfHelp.result, FormOfHelp.total))
                                })
                                .catch(errFormOfHelp => {
                                    dispatch(returnErrors(errFormOfHelp.code,errFormOfHelp.message))
                                })


                         /* Family */
                         manageFamilyApi.getDataSearch()
                         .then(Family => {
                             dispatch(fetchDataFamily(Family.result, Family.total))
                         })
                         .catch(errFamily => {
                             dispatch(errFamily.code, errFamily.message)
                         })

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
            dispatch(returnErrors(err.response.data.code, err.response.data.message));
            dispatch({
                type : Auth.LOGIN_FAIL
            })
        })
}

export const logout = () => dispatch => {
    userApi.logout()
           .then(res => {
                dispatch({
                    type : Auth.LOGOUT_SUCCESS
                })
                dispatch({
                    type : ManageChildren.CLEANUP_ALL_DATA
                })
                dispatch({
                    type : ManageAccount.CLEANUP_ALL_DATA
                })
                dispatch({
                    type : CommonList.CLEANUP_ALL_DATA
                })
                dispatch({
                    type : ManageLocal.CLEANUP_ALL_DATA
                })
                dispatch({
                    type : ManageFamily.CLEANUP_ALL_DATA
                })
                dispatch({
                    type : Error.CLEAR_ERRORS
                })
           })
           .catch(err => returnErrors(err.code, err.message)) 
}

export const changePasswordRequest = body => dispatch => {
    userApi.changePasswordUser(body)
           .then(res => {
                dispatch({
                    type : Auth.LOGIN_SUCCESS,
                    payload : res
                })
           })
           .catch(err => {
               dispatch(returnErrors(err.code, err.message))
               dispatch({
                    type : Auth.LOGIN_FAIL
               })
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