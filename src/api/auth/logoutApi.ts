import { postRequest } from "../axios";
import { isAxiosError } from "axios";
import { ApiErrorResponse, LogoutResponse } from "../api-types";

export async function logoutApi(): Promise<LogoutResponse> {
  try {
    const response = await postRequest<LogoutResponse,null>("/auth/logout",null, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.error) {
      throw error.response.data as ApiErrorResponse;
    }
    if (isAxiosError(error)) {
      throw {
        success: false,
        error: {
          code: "unknownError",
          message: (error?.message as string) || "An unknown error occurred",
        },
      } as ApiErrorResponse;
    }
    throw {
      success: false,
      error: {
        code: "unknownError",
        message: "An unknown error occurred",
      },
    } as ApiErrorResponse;
  }
}
