import { postRequest } from "../axios";
import { isAxiosError } from "axios";
import { ApiErrorResponse, LoginData, LoginResponse } from "./login-types";

export const loginApi = async (data: LoginData): Promise<LoginResponse> => {
  try {
    return await postRequest<LoginResponse, LoginData>("/auth/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err)
    if (isAxiosError(err) && err.response?.data?.error) {
      throw err.response.data as ApiErrorResponse;
    }
    if (isAxiosError(err) ) {
      throw {
      success: false,
      error: {
        code: "unknownError",
        message: err?.message as string || "An unknown error occurred",
      },} as ApiErrorResponse;
    }
    throw {
      success: false,
      error: {
        code: "unknownError",
        message: "An unknown error occurred",
      },
    } as ApiErrorResponse;
  }
};
