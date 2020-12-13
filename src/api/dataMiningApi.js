import axiosClient from "./axiosClient";
import store from '../app/store';

const tokenConfig = (getState) => {

    /* Get token from Localstorage */
    const token = getState().auth.token;
  
    const config = {
        headers : {
            'Content-type': 'application/json'
        }
    }
  
    /* If token, add to headers */
    if(token){
        config.headers['access-token'] = token;
    }
  
    return config
  
  }

const dataMiningApi = {
  downloadFileExcelChildrenKTDL: (params) => {
    const url = `/excel/download/khaithacdulieu`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.get(
        url,
        {
          params,
          responseType: 'blob',
          headers : {
            'access-token' : accessToken,
            'content-type': 'application/vnd.ms-excel;charset=UTF-8',
          }
        }
    );
  },
  downloadFileExcelChildrenNormalKTDL: (params) => {
    const url = `/excel/download/khaithacdulieu/binhthuong`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.get(
        url,
        {
          params,
          responseType: 'blob',
          headers : {
            'access-token' : accessToken,
            'content-type': 'application/vnd.ms-excel;charset=UTF-8',
          }
        }
    );
  },
  downloadFileExcelChildrenObjectKTDL: (params) => {
    const url = `/excel/download/khaithacdulieu/doituong`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.get(
        url,
        {
          params,
          responseType: 'blob',
          headers : {
            'access-token' : accessToken,
            'content-type': 'application/vnd.ms-excel;charset=UTF-8',
          }
        }
    );
  },
}

export default dataMiningApi;