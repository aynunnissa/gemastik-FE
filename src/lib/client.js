import axios from "axios";
import authHeader from "./auth-header";

export const bashUrl = "http://127.0.0.1:5000";

// Bisa ditambah params kalo butuh get request dengan params
// source: https://axios-http.com/docs/req_config
export function client(url, { method, data }) {
  // console.log({ ...config, ...authHeader() });
  return axios({
    method: method,
    url: `${bashUrl}${url}`,
    headers: { ...authHeader() }, // headers ini perlu untuk ngirim token user (kalo ada)
    data: data,
  })
    .then(function (response) {
      // Bisa liat di console isi responsenya apa aja
      // // console.log(response.data);
      // // console.log(response.status);
      // // console.log(response.statusText);
      // // console.log(response.headers);
      // // console.log(response.config);
      return {
        data: response.data?.data,
        status: response.status,
      };
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        // Kedepannya bisa ditambahin handling buat status code lain
        if (error.response.status === 401) {
          return {
            status: error.response.status,
            error: error.response?.data?.message,
          };
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message);
      }
      // console.log(error);
      // console.log(error.response.data.message);
      return {
        error: error.response?.data?.message,
      };
    });
}
// ini bisa ditambah kalo perlu, contoh cara aksesnya bisa diliat di file auth-context.js
client.get = (url, data) => client(url, { method: "GET", data: data });
client.delete = (url, data) => client(url, { method: "DELETE", data: data });
client.post = (url, data) => client(url, { method: "POST", data: data });
client.put = (url, data) => client(url, { method: "PUT", data: data });
