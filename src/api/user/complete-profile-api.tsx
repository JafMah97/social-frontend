import {
  ApiErrorResponse,
  CompleteYourProfileData,
  CompleteYourProfileResponse,
} from "../../types/api-types";
import { postRequest } from "../axios";
import { isAxiosError } from "axios";

export async function completeYourProfile(
  data: CompleteYourProfileData
): Promise<CompleteYourProfileResponse> {
  try {
    return await postRequest<
      CompleteYourProfileResponse,
      CompleteYourProfileData
    >("/user/complete-profile", data, {
      withCredentials: true,
    });
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response?.data?.error) {
      throw err.response.data as ApiErrorResponse;
    }

    if (isAxiosError(err)) {
      throw {
        success: false,
        error: {
          code: "networkError",
          message: err.message || "An unknown axios error occurred",
        },
      } as ApiErrorResponse;
    }

    throw {
      success: false,
      error: {
        code: "unknownError",
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
      },
    } as ApiErrorResponse;
  }
}
