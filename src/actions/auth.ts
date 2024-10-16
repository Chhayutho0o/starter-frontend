"use server";

import { cookies } from "next/headers";
import { decryptKey, encryptKey } from "@/lib/encryptKey";
import { DELETE, GET, POST, fetchJson, setAuthToken } from "@/services/request";
import { transformError } from "@/lib/utils";

export const getProfile = async () => {
  try {
    const token = await getCookies();
    const {
      data: { data },
    } = await fetchJson(GET("/account", {}, token?.value));
    return { status: "success", data };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return { status, message: err?.message };
  }
};

export const logout = async () => {
  try {
    const token = await getCookies();
    await fetchJson(DELETE("/auth", {}, token?.value));
    removeCookies();
    return { status: "success", data: {} };
  } catch (err: any) {
    removeCookies();
    const status = err.response?.status || "error";
    return { status, message: err?.message };
  }
};

export const login = async (params: any) => {
  try {
    const {
      data: { data, message, token },
    } = await fetchJson(POST("/auth", params));
    setAuthToken(token);
    setCookies(token);
    return { status: "success", data, message };
  } catch (err: any) {
    return transformError(err);
  }
};

export const register = async (params: any) => {
  try {
    const {
      data: { data, message, token },
    } = await fetchJson(POST("/auth/register", params));
    setAuthToken(token);
    setCookies(token);
    return { status: "success", data, message };
  } catch (err: any) {
    return transformError(err);
  }
};

export const forgetPassword = async (params: any) => {
  try {
    const { data } = await fetchJson(POST("/auth/forget_password", params));
    return { status: "success", data: data.data, message: data.message };
  } catch (err: any) {
    const status = err.response?.status || "error";
    return { status, message: err?.message, errors: err.response?.data?.errors };
  }
};

export const setCookies = async (session: { token: string; expireDate: number }) => {
  const tokenEncrypt = encryptKey(session.token, false);
  cookies().set({
    name: process.env.COOKIE_NAME as string,
    value: tokenEncrypt,
    path: "/",
    expires: session.expireDate,
  });
};

export async function getCookies() {
  const token = cookies().get(process.env.COOKIE_NAME as string);
  const decryptToken = token?.value ? decryptKey(token.value, false) : "";
  if (!token) {
    return null;
  }
  return {
    ...token,
    value: decryptToken,
  };
}

export async function removeCookies() {
  cookies().delete(process.env.COOKIE_NAME as string);
}
