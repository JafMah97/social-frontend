import { uploadCoverWithAxios } from "@/api/user/upload-cover-api";
import {
  ApiErrorResponse,
  UserUploadCoverPictureResponse,
} from "@/types/api-types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

/**
 * Hook for uploading a cover image.
 *
 * - Variable type is `File` (we send a single File).
 * - Success type is `UserUploadCoverPictureResponse`.
 * - Error type is `ApiErrorResponse`.
 */
export function useUploadCover(
  options?: UseMutationOptions<
    UserUploadCoverPictureResponse,
    ApiErrorResponse,
    File
  >
) {
  return useMutation<UserUploadCoverPictureResponse, ApiErrorResponse, File>({
    mutationFn: async (file: File) => {
      if (!file || !(file instanceof File)) {
        throw {
          success: false,
          error: {
            code: "invalid_argument",
            message: "A valid File must be provided to uploadCover.",
          },
        } as ApiErrorResponse;
      }

      return uploadCoverWithAxios(file);
    },
    ...options,
  });
}
