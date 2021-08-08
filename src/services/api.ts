import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { ApiHeader, OptionsArgs } from "models/client";
import { env } from "config/environment";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error?.response, error?.status, "error");
    const err = error?.response?.data ?? "An error occurred! Please try again";
    if (err.status) {
      err.status = error?.response?.status ?? "";
    }
    return Promise.reject(err);
  }
);

export async function api(
  endpoint: string,
  {
    body,
    del,
    patch,
    headers: customHeaders,
    ...customConfig
  }: OptionsArgs = {}
) {
  const token = Cookies.get(env.token);
  const headers: ApiHeader = {
    "Content-type": "application/json; charset=UTF-8",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const params: AxiosRequestConfig = {
    method: body ? "POST" : del ? "DELETE" : patch ? "PATCH" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      //   @ts-ignore
      ...customHeaders,
    },
  };

  if (body) params.data = JSON.stringify(body);
  const { data } = await axios(`${env.baseUrl}/${endpoint}`, params);
  console.log(data, "data");
  return data;
}
