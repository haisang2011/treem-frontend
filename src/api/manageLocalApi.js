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

const manageLocalApi = {
  getAllLocal: () => {
    const url = `/quan-ly-thon`;
    return axiosClient.get(
        url,
        tokenConfig(store.getState)
    );
  },
  addLocal: (body) => {
    const url = `/quan-ly-thon/add`;
    return axiosClient.post(
        url,
        body,
        tokenConfig(store.getState)
    );
  },
  updateLocal: (body) => {
    const { id_thon } = body;
    const url = `/quan-ly-thon/update/${id_thon}`;
    return axiosClient.put(
        url,
        body,
        tokenConfig(store.getState)
    );
  },
  deleteLocal: (id) => {
    const url = `/quan-ly-thon/delete/${id}`;
    return axiosClient.delete(
        url,
        tokenConfig(store.getState)
    );
  },
  mergeLocal: (data) => {
    const {
      id, dsthon
    } = data;
    const url = `/quan-ly-thon/merge/${id}`;
    return axiosClient.put(
        url,
        {dsthon},
        tokenConfig(store.getState)
    );
  },
}

export default manageLocalApi;