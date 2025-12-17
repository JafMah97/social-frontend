import { resendVerifyCodeApi } from "@/api/auth/resendVerifyCodeApi";
import { ApiErrorResponse, ResendVerifyCodeData, ResendVerifyCodeResponse, } from "@/types/api-types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// The hook
export function useResendVerifyCode(
  options?: UseMutationOptions<
    ResendVerifyCodeResponse,
    ApiErrorResponse,
    ResendVerifyCodeData
  >
) {
  return useMutation<
    ResendVerifyCodeResponse,
    ApiErrorResponse,
    ResendVerifyCodeData
  >({
    mutationFn: (data: ResendVerifyCodeData) => resendVerifyCodeApi(data),
    ...options,
  });
}
