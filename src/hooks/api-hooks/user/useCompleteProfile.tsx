import { completeYourProfile } from "@/api/user/complete-profile-api";
import {
  ApiErrorResponse,
  CompleteYourProfileData,
  CompleteYourProfileResponse,
} from "@/types/api-types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCompleteYourProfile(
  options?: UseMutationOptions<CompleteYourProfileResponse, ApiErrorResponse, CompleteYourProfileData>
) {
  return useMutation<CompleteYourProfileResponse, ApiErrorResponse, CompleteYourProfileData>({
    mutationFn: (data: CompleteYourProfileData) => completeYourProfile(data),
    ...options,
  });
}
