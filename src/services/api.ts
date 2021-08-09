import Cookies from "js-cookie";
import axios, { AxiosRequestConfig, Method } from "axios";
import { ApiHeader, OptionsArgs } from "models/client";
import { env } from "config/environment";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error?.response?.data ?? "An error occurred! Please try again";
    return Promise.reject(err);
  }
);

export async function api(
  endpoint: string,
  method: Method,
  {
    body,

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
    method,
    ...customConfig,
    headers: {
      ...headers,
      //   @ts-ignore
      ...customHeaders,
    },
  };

  if (body) params.data = JSON.stringify(body);
  const { data } = await axios(`${env.baseUrl}/${endpoint}`, params);
  return data;
}
