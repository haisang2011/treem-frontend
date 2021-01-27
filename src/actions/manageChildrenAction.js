import { ManageChildren, Auth, Status } from '../contants/actionType';
import SpecialCircumstancesApi from '../api/manageChildrenSpecialCircumstancesApi';
import commonApi from '../api/commonApi';
import manageFamilyApi from '../api/manageFamilyApi';
import RiskSpecialCircumstancesApi from '../api/manageChildrenRiskSpecialApi';
import ManageChidlrenApi from '../api/manageChildrenApi';
import OtherCircumstancesApi from '../api/manageChildrenOtherCircumstancesApi';
import FormOfHelpApi from '../api/manageChildrenFormOfHelpApi';
import { returnErrors } from '../actions/errorAction';
import { fetchVillage } from '../actions/commonAction';
import FileDownload from 'js-file-download';
import fs from 'fs';
import { fetchDataFamily } from './manageFamilyAction';
/* Manage Children */
export const fetchData = (payload, total) => {
    return {
        type : ManageChildren.FETCH_DATA,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataRequest = (query) => dispatch => {
    ManageChidlrenApi.getDataPaginationSearchHaveQuery(query)
                     .then(res => {
                        dispatch(fetchData(res.result, res.total))
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

/* Manage Special Circumstances */
export const fetchDataSpecialCircumstances = (payload, total) => {
    return {
        type : ManageChildren.FETCH_SPECIAL_CIRCUMSTANCES,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataSpecialCircumstancesRequest = (query) => (dispatch) => {
    SpecialCircumstancesApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataSpecialCircumstances(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}

/* Manage Risk Special Circumstances */
export const fetchDataRiskSpecialCircumstances = (payload, total) => {
    return {
        type : ManageChildren.FETCH_RISK_SPECIAL_CIRCUMSTANCES,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataRiskSpecialCircumstancesRequest = (query) => (dispatch) => {
    RiskSpecialCircumstancesApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataRiskSpecialCircumstances(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}

// export const fetchDataRiskSpecialCircumstancesRequest = () => (dispatch) => {
//     SpecialCircumstancesApi.getAll()
//                            .then(res => {
//                              dispatch(fetchData(res.result));
//                            })
//                            .catch(err => {
//                              dispatch(returnErrors(err.code,err.message))
//                              dispatch({
//                                  type: Auth.AUTH_ERROR
//                              })
//                            })
// }

/* Manage Other Circumstances */
export const fetchDataOtherCircumstances = (payload, total) => {
    return {
        type : ManageChildren.FETCH_OTHER_CIRCUMSTANCES,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataOtherCircumstancesRequest = (query) => (dispatch) => {
    OtherCircumstancesApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataOtherCircumstances(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}

/* Manage Form Of Help */
export const fetchDataFormOfHelp = (payload, total) => {
    return {
        type : ManageChildren.FETCH_FORM_OF_HELP,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataFormOfHelpRequest = (query) => (dispatch) => {
    FormOfHelpApi.getDataSearchHavePagination(query)
                           .then(res => {
                             dispatch(fetchDataFormOfHelp(res.result, res.total));
                           })
                           .catch(err => {
                             dispatch(returnErrors(err.code,err.message))
                            //  dispatch({
                            //      type: Auth.AUTH_ERROR
                            //  })
                           })
}


/* Detail Children */

export const closeAndCleanDetailChildren = (payload) => dispatch => {
    dispatch({
        type: ManageChildren.CLEANUP_DATA_DETAIL_CHILDREN,
    });
    dispatch({
        type: Status.CLOSE_DETAIL_CHILDREN,
        payload
    });
}

export const fetchDataDetailChildren = (id) => dispatch => {
    ManageChidlrenApi.getDataToShowDetailChildren(id)
                     .then(res => {
                        dispatch({
                            type : ManageChildren.FETCH_DATA_DETAIL_CHILDREN,
                            payload : res,
                        })

                        commonApi.getVillage(res.result.id_phuongxa)
                                 .then(thon => {
                                    dispatch(fetchVillage(thon.result));
                                 })
                                 .catch(errThon => {
                                     dispatch(returnErrors(errThon.code, errThon.message));
                                 })

                        dispatch({
                            type : Status.OPEN_DETAIL_CHILDREN,
                            payload : true
                        })
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

/* Show Detail Children Follow ID Family */
export const fetchDataDetailChildrenFollowFamily = (id) => dispatch => {
    ManageChidlrenApi.getDataToShowDetailChildren(id)
                     .then(res => {
                         /* Delete Info Children Because Here is Add With Family */
                        delete res.result.Hinh_Thuc_Tro_Giup;
                        delete res.result.Hoan_Canh_Dac_Biet;
                        delete res.result.Nguy_Co_Roi_Vao_HCDB;
                        delete res.result.Hoan_Canh_Khac;
                        delete res.result.id_treem;
                        delete res.result.hoten;
                        delete res.result.ngaysinh;
                        delete res.result.dantoc;
                        delete res.result.gioitinh;
                        delete res.result.lophoccaonhat;
                        delete res.result.tinhtranghoctap;

                        dispatch({
                            type : ManageChildren.FETCH_DATA_DETAIL_CHILDREN,
                            payload : res,
                        })

                        dispatch({
                            type : Status.OPEN_DETAIL_CHILDREN_FOLLOW_ID_FAMILY,
                            payload : true
                        })

                        dispatch({
                            type : Status.OPEN_DETAIL_CHILDREN,
                            payload : true
                        })
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

/* Show Detail Children Follow Location User */
// export const fetchDataDetailChildrenFollowLocationUser = (id) => dispatch => {
//     ManageChidlrenApi.getDataToShowDetailChildren(id)
//                      .then(res => {
//                          /* Delete Info Children Because Here is Add With Family */
//                         delete res.result.Hinh_Thuc_Tro_Giup;
//                         delete res.result.Hoan_Canh_Dac_Biet;
//                         delete res.result.Nguy_Co_Roi_Vao_HCDB;
//                         delete res.result.Hoan_Canh_Khac;
//                         delete res.result.id_treem;
//                         delete res.result.hoten;
//                         delete res.result.ngaysinh;
//                         delete res.result.dantoc;
//                         delete res.result.gioitinh;
//                         delete res.result.lophoccaonhat;
//                         delete res.result.tinhtranghoctap;

//                         dispatch({
//                             type : ManageChildren.FETCH_DATA_DETAIL_CHILDREN,
//                             payload : res,
//                         })

//                         dispatch({
//                             type : Status.OPEN_DETAIL_CHILDREN_FOLLOW_LOCATION_USER,
//                             payload : true
//                         })

//                         dispatch({
//                             type : Status.OPEN_DETAIL_CHILDREN,
//                             payload : true
//                         })
//                      })
//                      .catch(err => {
//                         dispatch(returnErrors(err.code, err.message))
//                      })
// }

/* Detail Children */

export const addChildWithFamily = (body) => dispatch => {
    ManageChidlrenApi.addChildrenWithFamily(body)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })  
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

export const addChildOtherFamily = (body) => dispatch => {
    ManageChidlrenApi.addChildrenOtherFamily(body)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })  
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

export const updateChildren = (body) => dispatch => {
    ManageChidlrenApi.updateInfoChildren(body)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })

                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

/* ------------------------- */
export const updatePersonRequest = (body) => dispatch => {
    ManageChidlrenApi.updateInfoPerson(body)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })                     
    })
    .catch(err => {
        dispatch(returnErrors(err.code, err.message))
    })
}


export const addPersonRequest = (body) => async (dispatch) => {
    return await ManageChidlrenApi.addPerson(body)
                    .then(res => {
                        dispatch(returnErrors(res.code, res.message));
                        return res.result[0];             
                    })
                    .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                    })
}

export const getInfoPersonRequest = async (id) => {
    return await ManageChidlrenApi.getInfoPerson(id)
                    .then(res => {
                        return res.result[0];           
                    })
                    .catch(err => {
                        return err;
                    })
}

const tokenConfig = (getState) => {

    /* Get token from Localstorage */
    const token = getState().auth.token;
  
    const config = {
        headers : {
            'Content-type': 'application/json'
        },
    }
  
    /* If token, add to headers */
    if(token){
        config.headers['access-token'] = token;
    }
  
    return config
  
}
export const deleteChildrenIntoTrash = (id) => dispatch => {
    ManageChidlrenApi.deleteInfoChildrenIntoTrash(id)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })                  
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

export const deleteChildrenMultiIntoTrash = (listId) => dispatch => {
    ManageChidlrenApi.deleteInfoChildrenMultiIntoTrash(listId)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })

                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

export const restoreChildrenMulti = (listId) => dispatch => {
    ManageChidlrenApi.restoreInfoChildrenMultiFromTrash(listId)
                     .then(res => {
                        dispatch(returnErrors(res.code, res.message));

                        ManageChidlrenApi.getDataPaginationSearch()
                                        .then(resChild => {
                                            dispatch(fetchData(resChild.result, resChild.total))
                                        })
                                        .catch(errChild => {
                                            dispatch(returnErrors(errChild.code, errChild.message))
                                        })

                        /* Special Circumstances */
                        SpecialCircumstancesApi.getDataSearch()
                        .then(specialCircumstances => {
                            dispatch(fetchDataSpecialCircumstances(specialCircumstances.result, specialCircumstances.total))
                        })
                        .catch(errSpecialCircumstances => {
                            dispatch(returnErrors(errSpecialCircumstances.code,errSpecialCircumstances.message))
                        })


                        /* Risk Special Circumstances */
                        RiskSpecialCircumstancesApi.getDataSearch()
                                                .then(RiskSpecial => {
                                                    dispatch(fetchDataRiskSpecialCircumstances(RiskSpecial.result, RiskSpecial.total))
                                                })
                                                .catch(errRiskSpecial => {
                                                    dispatch(returnErrors(errRiskSpecial.code,errRiskSpecial.message))
                                                })


                        /* Other Circumstances */
                        OtherCircumstancesApi.getDataSearch()
                                        .then(OtherCircumstances => {
                                            dispatch(fetchDataOtherCircumstances(OtherCircumstances.result, OtherCircumstances.total))
                                        })
                                        .catch(errOtherCircumstances => {
                                            dispatch(returnErrors(errOtherCircumstances.code,errOtherCircumstances.message))
                                        })
                                        
                                        
                        /* Form Of Help */
                        FormOfHelpApi.getDataSearch()
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
                                        dispatch(returnErrors(errFamily.code, errFamily.message));
                                    })

                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

export const downloadFileExcelDataHCDBRequest = (query) => (dispatch) => {
    SpecialCircumstancesApi.downloadFileExcelHCDB(query)
                           .then(res => {
                               FileDownload(res, 'DanhSachTreEm.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const downloadFileExcelDataHTTGRequest = (query) => (dispatch) => {
    FormOfHelpApi.downloadFileExcelHTTG(query)
                           .then(res => {
                               FileDownload(res, 'DanhSachTreEm.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const downloadFileExcelDataNCHCDBRequest = (query) => (dispatch) => {
    RiskSpecialCircumstancesApi.downloadFileExcelNCHCDB(query)
                           .then(res => {
                               FileDownload(res, 'DanhSachTreEm.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const downloadFileExcelDataHCKRequest = (query) => (dispatch) => {
    OtherCircumstancesApi.downloadFileExcelHCK(query)
                           .then(res => {
                               FileDownload(res, 'DanhSachTreEm.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const downloadFileExcelDataChildrenSampleRequest = () => {
    ManageChidlrenApi.downloadFileExcelSample()
                           .then(res => {
                               FileDownload(res, 'temp_DSTreEmNhap.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const downloadFileDocHDSDRequest = () => {
    ManageChidlrenApi.downloadFileDocHDSD()
                           .then(res => {
                               FileDownload(res, 'HDSD.doc')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

// export const uploadFileExcelAddChildren = (data) => {
//     ManageChidlrenApi.uploadFileAddChildren(data)
//                            .then(res => {
//                                console.log({res})
//                                 dispatch(returnErrors(res.code, res.message));
//                             })
//                            .catch(err => {
//                              console.log("Fail")
//                            })
// }