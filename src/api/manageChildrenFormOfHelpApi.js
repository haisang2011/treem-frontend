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

const manageChildrenFormOfHelpApi = {
  getAll: () => {
    const url = `/hinh-thuc-tro-giup`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
  getDataSearch: () => {
    const url = `/hinh-thuc-tro-giup/search`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },

  getDataSearchHavePagination: (params) => {
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    const url = `/hinh-thuc-tro-giup/search`;
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

export default manageChildrenFormOfHelpApi;