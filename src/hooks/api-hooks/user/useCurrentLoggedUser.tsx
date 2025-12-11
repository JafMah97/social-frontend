// hooks/useCurrentLoggedUser.ts
import { useQuery } from "@tanstack/react-query";
import { loggedUser } from "@/api/user/logged-user-api";
import { LoggedUserResponse, ApiErrorResponse } from "@/api/api-types";

export function useCurrentLoggedUser(enabled: boolean = true) {
  return useQuery<LoggedUserResponse, ApiErrorResponse>({
    queryKey: ["currentLoggedUser"],
    queryFn: loggedUser,
    enabled,
    retry: false,
  });
}
