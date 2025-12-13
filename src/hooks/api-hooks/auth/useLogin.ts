// src/hooks/useLogin.ts
import { ApiErrorResponse, LoginData, LoginResponse } from "@/types/api-types";
import { loginApi } from "@/api/auth/loginApi";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

// The hook
export function useLogin(
  options?: UseMutationOptions<LoginResponse, ApiErrorResponse, LoginData>
) {
  return useMutation<LoginResponse, ApiErrorResponse, LoginData>({
    mutationFn: (data: LoginData) => loginApi(data),
    ...options,
  });
}
