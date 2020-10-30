import axiosClient from "./axiosClient";

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
  getHCDB: () => {
    const url = `/local/list/hoancanhdacbiet`;
    return axiosClient.get(
        url,
    );
  },
  getNCHCDB: () => {
    const url = `/local/list/nguycohoancanhdacbiet`;
    return axiosClient.get(
        url,
    );
  },
  getHCK: () => {
    const url = `/local/list/hoancanhkhac`;
    return axiosClient.get(
        url,
    );
  },
  getHTTG: () => {
    const url = `/local/list/hinhthuctrogiup`;
    return axiosClient.get(
        url,
    );
  },
}

export default commonApi;