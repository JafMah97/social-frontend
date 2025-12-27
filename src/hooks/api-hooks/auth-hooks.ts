
import { loginApi, logoutApi, registerApi, resendVerifyCodeApi, verifyCodeApi } from "@/api/auth-api";
import { ApiErrorResponse, LoginData, LoginResponse, LogoutResponse, RegisterData, RegisterResponse, ResendVerifyCodeData, ResendVerifyCodeResponse, VerifyCodeData, VerifyCodeResponse } from "@/types/api-types";
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

export function useLogout(
  options?: UseMutationOptions<LogoutResponse, ApiErrorResponse, null>
) {
  return useMutation<LogoutResponse, ApiErrorResponse, null>({
    mutationFn: () => logoutApi(),
    ...options,
  });
}

export function useRegister(
  options?: UseMutationOptions<RegisterResponse, ApiErrorResponse, RegisterData>
) {
  return useMutation<RegisterResponse, ApiErrorResponse, RegisterData>({
    mutationFn: (data: RegisterData) => registerApi(data),
    ...options,
  });
}

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

