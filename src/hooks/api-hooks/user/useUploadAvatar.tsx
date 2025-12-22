import { uploadAvatarWithAxios } from "@/api/user/upload-avatar-api";
import {
  ApiErrorResponse,
  UserUploadProfilePictureResponse,
} from "@/types/api-types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

/**
 * Hook for uploading a profile avatar.
 *
 * - Variable type is `File` (we send a single File).
 * - Success type is `UserUploadProfilePictureResponse`.
 * - Error type is `ApiErrorResponse`.
 */
export function useUploadAvatar(
  options?: UseMutationOptions<
    UserUploadProfilePictureResponse,
    ApiErrorResponse,
    File
  >
) {
  return useMutation<UserUploadProfilePictureResponse, ApiErrorResponse, File>({
    mutationFn: async (file: File) => {
      if (!file || !(file instanceof File)) {
        throw {
          success: false,
          error: {
            code: "invalid_argument",
            message: "A valid File must be provided to uploadAvatar.",
          },
        } as ApiErrorResponse;
      }

      return uploadAvatarWithAxios(file);
    },
    ...options,
  });
}
