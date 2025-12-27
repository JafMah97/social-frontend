import { apiRequest } from "./api-request";
import { Lang } from "@/utils/translation/dictionary-utils";
import {
  LoginResponse,
  LoginData,
  LogoutResponse,
  RegisterData,
  RegisterResponse,
  ResendVerifyCodeData,
  ResendVerifyCodeResponse,
  VerifyCodeData,
  VerifyCodeResponse,
} from "@/types/api-types";

/**
 * Logs in a user with credentials.
 * Requires username/email and password.
 *
 * @param data - LoginRequest object containing credentials
 * @param lang - Optional language override for error messages
 */
export const loginApi = (data: LoginData, lang?: Lang) =>
  apiRequest<LoginResponse, LoginData>("post", "/auth/login", data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    lang: lang || "en",
  });

/**
 * Logs out the current user.
 * Requires authentication; clears session/cookie on the backend.
 *
 * @param lang - Optional language override for error messages
 */
export const logoutApi = (lang?: Lang) =>
  apiRequest<LogoutResponse, null>("post", "/auth/logout", null, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    lang: lang || "en",
  });

/**
 * Registers a new user.
 * Sends credentials and profile data to the backend.
 *
 * @param data - RegisterData object containing username/email, password, etc.
 * @param lang - Optional language override for error messages
 */
export const registerApi = (data: RegisterData, lang?: Lang) =>
  apiRequest<RegisterResponse, RegisterData>("post", "/auth/register", data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    lang: lang || "en",
  });

/**
 * Resends the verification code to the user.
 * Requires authentication or valid session depending on backend rules.
 *
 * @param data - ResendVerifyCodeData containing email/username or other identifiers
 * @param lang - Optional language override for error messages
 */
export const resendVerifyCodeApi = (data: ResendVerifyCodeData, lang?: Lang) =>
  apiRequest<ResendVerifyCodeResponse, ResendVerifyCodeData>(
    "post",
    "/auth/resend-verification",
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      lang: lang || "en",
    }
  );

/**
 * Verifies a user's email using the provided code.
 * Requires authentication or valid session depending on backend rules.
 *
 * @param data - VerifyCodeData containing the verification code and user identifier
 * @param lang - Optional language override for error messages
 */
export const verifyCodeApi = (data: VerifyCodeData, lang?: Lang) =>
  apiRequest<VerifyCodeResponse, VerifyCodeData>(
    "post",
    "/auth/verify-email-with-code",
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      lang: lang || "en",
    }
  );
