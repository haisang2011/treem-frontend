import axiosClient from "./axiosClient";
import store from '../app/store';
import queryString from 'query-string';

const URL_API = '/quan-ly-tre-em';

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

const manageChidlrenApi = {
  getAll: () => {
    const url = `/quan-ly-tre-em/all`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
  getDataPaginationSearch: () => {
    const url = `/quan-ly-tre-em/timkiem`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
  getDataPaginationSearchHaveQuery: (params) => {
    const url = `/quan-ly-tre-em/timkiem`;
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
  getDataToShowDetailChildren: (id) => {
    const url = `/quan-ly-tre-em/detail/${id}`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.get(
        url,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
}

export default manageChidlrenApi;