import { postRequest } from "../axios";
import { isAxiosError } from "axios";
import {
  ApiErrorResponse,
  VerifyCodeData,
  VerifyCodeResponse
} from "../../types/api-types";

export const verifyCodeApi = async (data: VerifyCodeData): Promise<VerifyCodeResponse> => {
  try {
    return await postRequest<VerifyCodeResponse, VerifyCodeData>(
      "/auth/verify-email-with-code",
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
