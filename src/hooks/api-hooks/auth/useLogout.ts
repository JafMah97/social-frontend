// src/hooks/useLogin.ts
import { ApiErrorResponse, LogoutResponse } from "@/types/api-types";
import { logoutApi } from "@/api/auth/logoutApi";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useLogout(
  options?: UseMutationOptions<LogoutResponse, ApiErrorResponse, null>
) {
  return useMutation<LogoutResponse, ApiErrorResponse, null>({
    mutationFn: () => logoutApi(),
    ...options,
  });
}
