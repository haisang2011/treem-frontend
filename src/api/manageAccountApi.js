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

const manageAccountApi = {
  getAccountSearch: () => {
    const url = `/account`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
  getAccountSearchHaveParams: (params) => {
    const url = `/account`;
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
  updateAccount: (params) => {
    const id = params.id_taikhoan;
    delete params.id_taikhoan;
    const body = params;
    const url = `/account/update/${id}`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.put(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          },
        }
    );
  },
  updatePasswordAccount: (params) => {
    const id = params.id_taikhoan;
    const body = params;
    const url = `/account/update/password/${id}`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.put(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          },
        }
    );
  },
}

export default manageAccountApi;