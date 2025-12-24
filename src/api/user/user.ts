import { apiRequest } from "../api-request";
import {
  CompleteYourProfileData,
  CompleteYourProfileResponse,
  LoggedUserResponse,
  UserUploadCoverPictureResponse,
} from "../../types/api-types";
import { Lang } from "@/utils/translation/dictionary-utils";

/**
 * Completes the user's profile with additional information.
 * Requires authentication; backend will attach the profile data to the current user.
 *
 * @param data - CompleteYourProfileData containing fields like fullName, bio, etc.
 * @param lang - Optional language override for error messages
 */
export const completeYourProfileApi = (
  data: CompleteYourProfileData,
  lang?: Lang
) =>
  apiRequest<CompleteYourProfileResponse, CompleteYourProfileData>(
    "post", 
    "/user/complete-profile", 
    data, // request body
    {
      withCredentials: true, 
      headers: { "Content-Type": "application/json" }, // backend expects JSON
      lang: lang || "en",
    }
  );

  /**
   * Retrieves the currently logged-in user's profile.
   * Requires authentication; backend will return user details if session/cookie is valid.
   *
   * @param lang - Optional language override for error messages
   */
  export const loggedUserApi = (lang?: Lang) =>
    apiRequest<LoggedUserResponse>(
      "get", 
      "/user/me", 
      undefined, // no request body for GET
      {
        withCredentials: true, 
        headers: { "Content-Type": "application/json" }, // backend expects JSON
        lang: lang || "en",
      }
    );

    /**
     * Uploads a new cover/profile banner image for the current user.
     * Builds FormData internally and sends it as multipart/form-data.
     * Requires authentication.
     *
     * @param file - single File to upload
     * @param lang - Optional language override for error messages
     * @returns parsed success response
     */
    export const uploadCoverApi = (file: File, lang?: Lang) => {
      const formData = new FormData();
      // backend expects field name "coverImage" per your docs
      formData.append("coverImage", file, file.name);

      return apiRequest<UserUploadCoverPictureResponse, FormData>(
        "post", 
        "/user/profile-cover", 
        formData,
        {
          withCredentials: true, 
          headers: { "Content-Type": "multipart/form-data" },
          lang: lang || "en",
        }
      );
    };

