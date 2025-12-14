import { ApiErrorResponse, VerifyCodeData, VerifyCodeResponse } from "@/types/api-types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { verifyCodeApi } from "@/api/auth/verifyCodeApi";

// The hook
export function useVerifyEmailWithCode(
  options?: UseMutationOptions<
    VerifyCodeResponse,
    ApiErrorResponse,
    VerifyCodeData
  >
) {
  return useMutation<VerifyCodeResponse, ApiErrorResponse, VerifyCodeData>({
    mutationFn: (data: VerifyCodeData) => verifyCodeApi(data),
    ...options,
  });
}
