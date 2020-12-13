import { ManageLocal } from '../contants/actionType';
import ManageLocalApi from '../api/manageLocalApi';
import { returnErrors } from './errorAction';
import commonApi from '../api/commonApi';
import store from '../app/store';
import { fetchVillage } from './commonAction';

export const fetchDataLocal = (payload) => {
    return {
        type : ManageLocal.FETCH_DATA_LOCAL,
        payload
    }
}

export const addLocalRequest = (body) => dispatch => {
    ManageLocalApi.addLocal(body)
                  .then(res => {
                      dispatch(returnErrors(res.code, res.message))

                      ManageLocalApi.getAllLocal()
                                            .then(locals => {
                                                dispatch(fetchDataLocal(locals.result))
                                            })
                                            .catch(errLocals => {
                                                dispatch(returnErrors(errLocals.code,errLocals.message))
                                            })

                        commonApi.getVillage(store.getState().auth.locationUser.id_xa)
                            .then(resVillage => {
                                dispatch(fetchVillage(resVillage.result))
                            })
                            .catch(errVillage => {
                                const { code, message } = errVillage.response.data
                                dispatch(returnErrors(code, message));
                            }) 
                  })
                  .catch(err => {
                      const { code, message } = err.response.data
                      dispatch(returnErrors(code, message))
                  })
}

export const updateLocalRequest = (body) => dispatch => {
    ManageLocalApi.updateLocal(body)
                  .then(res => {
                        dispatch(returnErrors(res.code, res.message))

                        ManageLocalApi.getAllLocal()
                                            .then(locals => {
                                                dispatch(fetchDataLocal(locals.result))
                                            })
                                            .catch(errLocals => {
                                                dispatch(returnErrors(errLocals.code,errLocals.message))
                                            })

                        commonApi.getVillage(store.getState().auth.locationUser.id_xa)
                        .then(resVillage => {
                            dispatch(fetchVillage(resVillage.result))
                        })
                        .catch(errVillage => {
                            const { code, message } = errVillage.response.data
                            dispatch(returnErrors(code, message));
                        }) 
                  })
                  .catch(err => {
                      const { code, message } = err.response.data
                      dispatch(returnErrors(code, message))
                  })
}

export const deleteLocalRequest = (id) => dispatch => {
    ManageLocalApi.deleteLocal(id)
                  .then(res => {
                        dispatch(returnErrors(res.code, res.message))

                        ManageLocalApi.getAllLocal()
                                            .then(locals => {
                                                dispatch(fetchDataLocal(locals.result))
                                            })
                                            .catch(errLocals => {
                                                dispatch(returnErrors(errLocals.code,errLocals.message))
                                            })

                        commonApi.getVillage(store.getState().auth.locationUser.id_xa)
                                .then(resVillage => {
                                    dispatch(fetchVillage(resVillage.result))
                                })
                                .catch(errVillage => {
                                    const { code, message } = errVillage.response.data
                                    dispatch(returnErrors(code, message));
                                })                      
                  })
                  .catch(err => {
                      const { code, message } = err.response.data
                      dispatch(returnErrors(code, message))
                  })
}

export const mergeLocalRequest = (data) => dispatch => {
    ManageLocalApi.mergeLocal(data)
                  .then(res => {
                        dispatch(returnErrors(res.code, res.message))

                        ManageLocalApi.getAllLocal()
                                            .then(locals => {
                                                dispatch(fetchDataLocal(locals.result))
                                            })
                                            .catch(errLocals => {
                                                dispatch(returnErrors(errLocals.code,errLocals.message))
                                            })

                        commonApi.getVillage(store.getState().auth.locationUser.id_xa)
                                .then(resVillage => {
                                    dispatch(fetchVillage(resVillage.result))
                                })
                                .catch(errVillage => {
                                    const { code, message } = errVillage.response.data
                                    dispatch(returnErrors(code, message));
                                })                      
                  })
                  .catch(err => {
                      const { code, message } = err.response.data
                      dispatch(returnErrors(code, message))
                  })
}