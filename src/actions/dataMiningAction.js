import dataMiningApi from '../api/dataMiningApi';
import FileDownload from 'js-file-download';

export const downloadFileExcelDataChildrenRequest = (query) => (dispatch) => {
    dataMiningApi.downloadFileExcelChildrenKTDL(query)
                           .then(res => {
                               FileDownload(res, 'DanhSachTreEm.xls')
                            })
                           .catch(err => {
                             console.log("Fail")
                           })
}

export const downloadFileExcelDataChildrenNormalRequest = (query) => (dispatch) => {
  dataMiningApi.downloadFileExcelChildrenNormalKTDL(query)
                         .then(res => {
                             FileDownload(res, 'DanhSachTreEmBinhThuong.xls')
                          })
                         .catch(err => {
                           console.log("Fail")
                         })
}

export const downloadFileExcelDataChildrenObjectRequest = (query) => (dispatch) => {
  dataMiningApi.downloadFileExcelChildrenObjectKTDL(query)
                         .then(res => {
                             FileDownload(res, 'DanhSachTreEmTheoChiTieu.xls')
                          })
                         .catch(err => {
                           console.log("Fail")
                         })
}