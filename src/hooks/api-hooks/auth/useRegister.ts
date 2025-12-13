import {
  ApiErrorResponse,
  RegisterData,
  RegisterResponse,
} from "@/types/api-types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { registerApi } from "@/api/auth/registerApi";

// The hook
export function useRegister(
  options?: UseMutationOptions<RegisterResponse, ApiErrorResponse, RegisterData>
) {
  return useMutation<RegisterResponse, ApiErrorResponse, RegisterData>({
    mutationFn: (data: RegisterData) => registerApi(data),
    ...options,
  });
}
