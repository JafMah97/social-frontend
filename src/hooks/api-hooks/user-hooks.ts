import { uploadAvatarApi } from "@/api/api-request";
import { completeYourProfileApi, loggedUserApi, uploadCoverApi } from "@/api/user-api";
import {
  ApiErrorResponse,
  CompleteYourProfileData,
  CompleteYourProfileResponse,
  LoggedUserResponse,
  UserUploadProfilePictureResponse,
  UserUploadCoverPictureResponse,
} from "@/types/api-types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

/**
 * Hook for completing the user's profile.
 *
 * - Variable type is `CompleteYourProfileData` (fields like fullName, bio, etc.).
 * - Success type is `CompleteYourProfileResponse`.
 * - Error type is `ApiErrorResponse`.
 *
 * This wraps `completeYourProfileApi` in a React Query mutation,
 * allowing you to call it from components and handle loading/error states.
 */
export function useCompleteYourProfile(
  options?: UseMutationOptions<
    CompleteYourProfileResponse,
    ApiErrorResponse,
    CompleteYourProfileData
  >
) {
  return useMutation<
    CompleteYourProfileResponse,
    ApiErrorResponse,
    CompleteYourProfileData
  >({
    mutationFn: (data: CompleteYourProfileData) => completeYourProfileApi(data),
    ...options,
  });
}

/**
 * Hook for fetching the currently logged-in user's profile.
 *
 * - Success type is `LoggedUserResponse`.
 * - Error type is `ApiErrorResponse`.
 *
 * This wraps `loggedUserApi` in a React Query query,
 * automatically caching the result under the key `["currentLoggedUser"]`.
 */
export function useCurrentLoggedUser() {
  return useQuery<LoggedUserResponse, ApiErrorResponse>({
    queryKey: ["currentLoggedUser"],
    queryFn: () => loggedUserApi(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime:
      1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook for uploading a profile avatar.
 *
 * - Variable type is `File` (we send a single File).
 * - Success type is `UserUploadProfilePictureResponse`.
 * - Error type is `ApiErrorResponse`.
 *
 * This wraps `uploadAvatarApi` in a React Query mutation,
 * handling file upload via multipart/form-data.
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
      return await uploadAvatarApi(file);
    },
    ...options,
  });
}

/**
 * Hook for uploading a cover image (profile banner).
 *
 * - Variable type is `File` (we send a single File).
 * - Success type is `UserUploadCoverPictureResponse`.
 * - Error type is `ApiErrorResponse`.
 *
 * This wraps `uploadCoverApi` in a React Query mutation,
 * handling file upload via multipart/form-data.
 */
export function useUploadCover(
  options?: UseMutationOptions<
    UserUploadCoverPictureResponse,
    ApiErrorResponse,
    File
  >
) {
  return useMutation<UserUploadCoverPictureResponse, ApiErrorResponse, File>({
    mutationFn: async(file: File) => {
      return await uploadCoverApi(file);
    },
    ...options,
  });
}
