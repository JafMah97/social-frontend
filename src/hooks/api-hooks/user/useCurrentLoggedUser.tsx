// hooks/useCurrentLoggedUser.ts
import { useQuery } from "@tanstack/react-query";
import { loggedUser } from "@/api/user/logged-user-api";
import { LoggedUserResponse, ApiErrorResponse } from "@/types/api-types";
export function useCurrentLoggedUser() {
  return useQuery<LoggedUserResponse, ApiErrorResponse>({
    queryKey: ["currentLoggedUser"],
    queryFn: loggedUser,
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false, // prevent polling
  });
}

