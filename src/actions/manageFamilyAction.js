import { ManageChildren, Auth, Status, ManageFamily } from '../contants/actionType';
import SpecialCircumstancesApi from '../api/manageChildrenSpecialCircumstancesApi';
import commonApi from '../api/commonApi';
import RiskSpecialCircumstancesApi from '../api/manageChildrenRiskSpecialApi';
import ManageChidlrenApi from '../api/manageChildrenApi';
import ManageFamilyApi from '../api/manageFamilyApi';
import OtherCircumstancesApi from '../api/manageChildrenOtherCircumstancesApi';
import FormOfHelpApi from '../api/manageChildrenFormOfHelpApi';
import { returnErrors } from '../actions/errorAction';
import { fetchVillage } from '../actions/commonAction';
import FileDownload from 'js-file-download';

export const fetchDataFamily = (payload, total) => {
    return {
        type : ManageFamily.FETCH_DATA_FAMILY,
        data : {
            payload,
            total
        }
    }
}

export const fetchDataFamilyRequest = (query) => dispatch => {
    ManageFamilyApi.getDataSearchHavePagination(query)
                     .then(res => {
                        dispatch(fetchDataFamily(res.result, res.total))
                     })
                     .catch(err => {
                        dispatch(returnErrors(err.code, err.message))
                     })
}

export const downloadFileExcelDataFamilyRequest = (query) => (dispatch) => {
    ManageFamilyApi.downloadFileExcelFamily(query)
                           .then(res => {
                               FileDownload(res, 'DSHoGiaDinh.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const searchFatherRequest = (query) => (
    ManageFamilyApi.searchFather(query)
                           .then(res => res)
                           .catch(err => {
                             console.log("Fail")
                           })
)

export const searchMotherRequest = (query) => (
    ManageFamilyApi.searchMother(query)
                           .then(res => res)
                           .catch(err => {
                             console.log("Fail")
                           })
)

export const searchNguoiNuoiRequest = (query) => (
  ManageFamilyApi.searchNguoiNuoi(query)
                         .then(res => res)
                         .catch(err => {
                           console.log("Fail")
                         })
)