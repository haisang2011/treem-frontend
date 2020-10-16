import axiosClient from "./axiosClient";
import store from '../app/store';

const URL_API = '/quan-ly-tre-em';

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

const manageChidlrenApi = {
  getAll: () => {
    const url = `/quan-ly-tre-em/all`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
}

export default manageChidlrenApi;