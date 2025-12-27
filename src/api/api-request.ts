import { isAxiosError } from "axios";
import {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
} from "./axios";
import { ApiErrorResponse, UserUploadProfilePictureResponse } from "../types/api-types";
import { i18n, Lang } from "@/utils/translation/dictionary-utils";
import { ERROR_CODES, ErrorCode } from "@/constants";
import { getErrorMessage } from "@/utils/translation/error-localization";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface ApiOptions {
  withCredentials?: boolean;
  headers?: Record<string, string>;
  lang?: Lang;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiRequest<Response, Data = unknown>(
  method: HttpMethod,
  endpoint: string,
  data?: Data,
  options: ApiOptions = {}
): Promise<Response> {
  try {
    switch (method) {
      case "get":
        return await getRequest<Response>(endpoint, options);
      case "post":
        return await postRequest<Response, Data>(endpoint, data, options);
      case "put":
        return await putRequest<Response, Data>(endpoint, data, options);
      case "patch":
        return await patchRequest<Response, Data>(endpoint, data, options);
      case "delete":
        return await deleteRequest<Response>(endpoint, options);
      default:
        throw await buildError(ERROR_CODES.UNKNOWN, options.lang);
    }
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      // Backend already returned a structured error
      throw err.response.data as ApiErrorResponse;
    }

    // Otherwise normalize into localized error
    throw await buildError(
      ERROR_CODES.UNKNOWN,
      options.lang,
      isAxiosError(err) ? err.message : undefined
    );
  }
}

/**
 * Helper to build a localized ApiErrorResponse
 */
async function buildError(
  code: ErrorCode,
  lang?: Lang,
  fallbackMessage?: string
): Promise<ApiErrorResponse> {
  const currentLang = lang || (i18n.defaultLang as Lang);
  const message = await getErrorMessage(code, currentLang);
  return {
    success: false,
    error: {
      code,
      message: fallbackMessage || message,
    },
  };
}

/**
 * Uploads a new avatar/profile picture for the current user.
 * Builds FormData internally and sends it as multipart/form-data.
 * Requires authentication.
 *
 * @param file - single File to upload
 * @param lang - Optional language override for error messages
 * @returns parsed success response
 */
export const uploadAvatarApi = (file: File, lang?: Lang) => {
  const formData = new FormData();
  formData.append("profileImage", file, file.name);

  return apiRequest<UserUploadProfilePictureResponse, FormData>(
    "post", // HTTP method
    "/user/profile-picture", // backend endpoint
    formData, // request body (FormData with file)
    {
      withCredentials: true, // include cookies/session
      headers: { "Content-Type": "multipart/form-data" }, // backend expects multipart
      lang: lang || "en", // default language fallback
    }
  );
};
