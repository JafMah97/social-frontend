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
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response?.data?.error) {
      console.log(err.response.data);
      throw err.response.data as ApiErrorResponse;
    }
    throw {
      success: false,
      error: {
        code: "unknownError",
        message: "Unexpected error",
      },
    } as ApiErrorResponse;
  }
};
