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

const manageFamilyApi = {
  getDataSearch: () => {
    const url = `/danh-sach-ho-gia-dinh/search`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },

  getDataSearchHavePagination: (params) => {
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    const url = `/danh-sach-ho-gia-dinh/search`;
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
  downloadFileExcelFamily: (params) => {
    const url = `/excel/download/family`;
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
  searchFather: (params) => {
    const url = `/danh-sach-ho-gia-dinh/search/father`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
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
  searchMother: (params) => {
    const url = `/danh-sach-ho-gia-dinh/search/mother`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
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
  searchNguoiNuoi: (params) => {
    const url = `/danh-sach-ho-gia-dinh/search/nguoinuoi`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
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
}

export default manageFamilyApi;