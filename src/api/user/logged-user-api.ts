import { ApiErrorResponse, LoggedUserResponse } from "../api-types";
import { getRequest } from "../axios";
import { isAxiosError } from "axios";

export const loggedUser = async (): Promise<LoggedUserResponse> => {
  try {
    console.log("triggrd")
    return await getRequest<LoggedUserResponse>("/user/me", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      throw err.response.data as ApiErrorResponse;
    }
    if (isAxiosError(err)) {
      throw {
        success: false,
        error: {
          code: "unknownError",
          message: (err?.message as string) || "An unknown error occurred",
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
};
