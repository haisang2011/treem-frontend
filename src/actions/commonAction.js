import { CommonList } from '../contants/actionType';
import commonApi from '../api/commonApi';


export const fetchDistrict = (payload) => {
    return {
        type : CommonList.FETCH_DATA_DISTRICT,
        payload : payload
    }
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
