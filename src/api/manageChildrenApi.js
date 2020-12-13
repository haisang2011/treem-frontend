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
  addChildrenWithFamily: (body) => {
    const url = `/quan-ly-tre-em/addwithfamily`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.post(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  addChildrenOtherFamily: (body) => {
    const url = `/quan-ly-tre-em/addotherfamily`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.post(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  updateInfoChildren: (body) => {
    const { id_treem } = body;
    const url = `/quan-ly-tre-em/update/${id_treem}`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.put(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  deleteInfoChildrenIntoTrash: (id) => {
    const url = `/quan-ly-tre-em/xoa/${id}`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.put(
        url,
        null,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  deleteInfoChildrenMultiIntoTrash: (listId) => {
    const url = `/quan-ly-tre-em/xoa-multi`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.post(
        url,
        {listId},
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  deleteInfoChildrenPhysical: (body) => {
    const url = `/quan-ly-tre-em/xoaf/:id_treem`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.delete(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  updateInfoPerson: (body) => {
    const { id_person } = body;
    const url = `/quan-ly-tre-em/update/person/${id_person}`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.put(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  addPerson: (body) => {
    const url = `/quan-ly-tre-em/add/person`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.post(
        url,
        body,
        {
          headers : {
            'access-token' : accessToken,
          }
        }
    );
  },
  getInfoPerson: (id) => {
    const url = `/quan-ly-tre-em/info/person/${id}`;
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
  downloadFileExcelSample: () => {
    const url = `/excel/sample`;
    const accessToken = store.getState().auth.token ? store.getState().auth.token : null;
    return axiosClient.get(
        url,
        {
          responseType: 'blob',
          headers : {
            'access-token' : accessToken,
            'content-type': 'application/vnd.ms-excel;charset=UTF-8',
          }
        }
    );
  },
}
export default manageChidlrenApi;