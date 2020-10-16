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

const commonApi = {
  getDistrict: (params) => {
    const url = `/local/thanhpho/${params}`;
    return axiosClient.get(
        url,
    );
  },
  getWard: (params) => {
    const url = `/local/thanhpho/huyen/${params}`;
    return axiosClient.get(
        url,
    );
  },
  getVillage: (params) => {
    const url = `/local/thanhpho/huyen/xa/${params}`;
    return axiosClient.get(
        url,
    );
  },
}

export default commonApi;