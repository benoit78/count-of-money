/* eslint-disable no-undef */

import axios from "axios";
import { errorTypes } from "../../constants";
import { logout } from "../authentification";

// class CustomError extends Error {
//   constructor(err) {
//     super(err.message);
//     this.status = err.status;
//     this.type = err.type;
//     this.from = err.from;
//   }
// }

const asyncAxios = (options) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await axios(options));
    } catch ({ response, ...other }) {
      const { data, status } = response;
console.log(status)
      if (status * 1 === 401) {
        logout();
        window.location.reload();
      }
      // const errObj = {
      //   status: status,
      //   type: data.type,
      //   message: data.type,
      // };

      reject(new Error(data.type));
    }
  }).catch((e) => {
    console.error(errorTypes[e.message] || e.message);
  });
};

export const getReq = async ({ endpoint, params, token }) =>
  asyncAxios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
export const postReq = async ({ endpoint, data, token }) =>
  asyncAxios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const patchReq = async ({ endpoint, data, token }) =>
  asyncAxios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteReq = async ({ endpoint, token, data }) =>
  asyncAxios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  });
