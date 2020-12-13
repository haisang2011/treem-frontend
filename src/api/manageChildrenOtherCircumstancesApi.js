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

const manageChidlrenOtherCircumstancesApi = {
  getAll: () => {
    const url = `/tre-em-hoan-canh-khac`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
  getDataSearch: () => {
    const url = `/tre-em-hoan-canh-khac/search`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },

  getDataSearchHavePagination: (params) => {
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    const url = `/tre-em-hoan-canh-khac/search`;
    return axiosClient.get(
        url,
        {
          params,
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  downloadFileExcelHCK: (params) => {
    const url = `/excel/download/hck`;
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

export default manageChidlrenOtherCircumstancesApi;