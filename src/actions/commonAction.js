import { CommonList } from '../contants/actionType';
import commonApi from '../api/commonApi';

export const fetchWardRequest = (id) => (dispatch) => {
    commonApi.getWard(id)
             .then(res => {
                 dispatch(fetchWard(res.result))
                 dispatch({
                     type : CommonList.CLEAR_DATA_VILLAGE
                 })
             })
}

export const fetchDistrict = (payload) => {
    return {
        type : CommonList.FETCH_DATA_DISTRICT,
        payload : payload
    }
}

export const fetchVillageRequest = (id) => (dispatch) => {
    commonApi.getVillage(id)
             .then(res => {
                 dispatch(fetchVillage(res.result))
             })
}

export const fetchWard = (payload) => {
    return {
        type : CommonList.FETCH_DATA_WARD,
        payload : payload
    }
}

export const fetchVillage = (payload) => {
    return {
        type : CommonList.FETCH_DATA_VILLAGE,
        payload : payload
    }
}

export const fetchListHCDB = (payload) => {
    return {
        type : CommonList.FETCH_DATA_HCDB,
        payload : payload
    }
}

export const fetchListNCHCDB = (payload) => {
    return {
        type : CommonList.FETCH_DATA_NCHCDB,
        payload : payload
    }
}

export const fetchListHCK = (payload) => {
    return {
        type : CommonList.FETCH_DATA_HCK,
        payload : payload
    }
}

export const fetchListHTTG = (payload) => {
    return {
        type : CommonList.FETCH_DATA_HTTG,
        payload : payload
    }
}