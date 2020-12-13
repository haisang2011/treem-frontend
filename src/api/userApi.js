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

const userApi = {
  login: (data) => {
    const url = '/user/login';
    return axiosClient.post(
        url,
        data,
        tokenConfig(store.getState)
    );
  },
  logout: () => {
    const url = '/user/logout';
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    const data = { accessToken }
    return axiosClient.post(
        url,
        data,
        {
          headers : {
            'access-token' : accessToken,
          },
        }
    );
  },
  changePasswordUser: (params) => {
    const body = params;
    const url = `/user/changepassword`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.post(
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

export default userApi;