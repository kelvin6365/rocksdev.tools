import { Meta } from "@/types/Meta";
import { ResponseStatus } from "@/types/ResponseStatus";
import axios, { AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";
const API = {
  apiInstance: axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(process.env.NODE_ENV === "development" && {
        "Access-Control-Allow-Origin": "*",
      }),
    },
  }),

  API_PATH: {
    AUTH: {
      LOGIN: "/v1/auth/sign-in",
      REGISTER: "/v1/auth/sign-up",
      REFRESH_TOKEN: "/v1/auth/refresh",
    },
    USER: {
      PROFILE: "/v1/user",
    },
  },

  auth: {
    login: async (email: string, password: string) => {
      return API.apiInstance.post(API.API_PATH.AUTH.LOGIN, {
        username: email,
        password,
      });
    },
    register: async (
      email: string,
      password: string,
      name: string,
    ): Promise<
      AxiosResponse<{
        data: boolean;
        status: ResponseStatus;
      }>
    > => {
      return API.apiInstance.post(API.API_PATH.AUTH.REGISTER, {
        username: email,
        password,
        name,
      });
    },
    refreshToken: async (
      refreshToken: string,
    ): Promise<
      AxiosResponse<{
        data: any;
        status: ResponseStatus;
      }>
    > => {
      return API.apiInstance.get(API.API_PATH.AUTH.REFRESH_TOKEN, {
        headers: {
          "x-refresh-token": refreshToken,
        },
      });
    },
  },

  user: {
    profile: async (accessToken?: string) => {
      if (accessToken) {
        return API.apiInstance.get(API.API_PATH.USER.PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      return API.apiInstance.get(API.API_PATH.USER.PROFILE);
    },
  },
};

API.apiInstance.defaults.withCredentials = true;

API.apiInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    if (config && config.headers) {
      config.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
    }
  }
  return config;
});

API.apiInstance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  async (err) => {
    if (err && err.response?.status === 401) {
      const newSession = await getSession();
      if (newSession?.user?.error) {
        // Token refresh failed, log out the user
        signOut();
      }
    }
    return Promise.reject(err);
  },
);

export default API;
