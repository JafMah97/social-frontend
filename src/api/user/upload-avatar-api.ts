// src/api/user/upload-avatar.ts
import { ApiErrorResponse, UserUploadProfilePictureResponse } from "@/types/api-types";
import { postRequest } from "../axios";
import { isAxiosError } from "axios";

/**
 * Upload avatar using axios (postRequest wrapper).
 * Builds FormData internally and sends it as multipart/form-data.
 *
 * @param file - single File to upload
 * @returns parsed success response
 * @throws ApiErrorResponse on failure
 */
export async function uploadAvatarWithAxios(
  file: File
): Promise<UserUploadProfilePictureResponse> {
  try {
    const formData = new FormData();
    formData.append("profileImage", file, file.name);

    return await postRequest<UserUploadProfilePictureResponse, FormData>(
      "/user/profile-picture",
      formData,
      { withCredentials: true }
    );
  } catch (err: unknown) {
    if (isAxiosError(err) && err.response?.data?.error) {
      throw err.response.data as ApiErrorResponse
      ;
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
