// src/api/user/upload-cover.ts
import { ApiErrorResponse, UserUploadCoverPictureResponse } from "@/types/api-types";
import { postRequest } from "../axios";
import { isAxiosError } from "axios";

/**
 * Local, self-contained types for this file
 */

/**
 * Upload cover using axios (postRequest wrapper).
 * Builds FormData internally and sends it as multipart/form-data.
 *
 * @param file - single File to upload
 * @returns parsed success response
 * @throws ApiErrorResponse on failure
 */
export async function uploadCoverWithAxios(
  file: File
): Promise<UserUploadCoverPictureResponse> {
  try {
    const formData = new FormData();
    // backend expects field name "coverImage" per your docs
    formData.append("coverImage", file, file.name);

    return await postRequest<UserUploadCoverPictureResponse, FormData>(
      "/user/profile-cover",
      formData,
      { withCredentials: true }
    );
  } catch (err: unknown) {
    if (isAxiosError(err) && (err ).response?.data?.error) {
      throw (err ).response.data as ApiErrorResponse;
    }

    if (isAxiosError(err)) {
      throw {
        success: false,
        error: {
          code: "networkError",
          message: (err as Error).message || "An unknown axios error occurred",
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
