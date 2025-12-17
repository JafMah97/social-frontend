import { postRequest } from "../axios";
import { isAxiosError } from "axios";
import {
  ApiErrorResponse,
  ResendVerifyCodeData,
  ResendVerifyCodeResponse,
} from "../../types/api-types";

export const resendVerifyCodeApi = async (
  data: ResendVerifyCodeData
): Promise<ResendVerifyCodeResponse> => {
  try {
    return await postRequest<ResendVerifyCodeResponse, ResendVerifyCodeData>(
      "/auth/resend-verification",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
