import {
  PostData,
  CreatePostResponse,
  DeletePostResponse,
  GetPostByIdResponse,
  LikePostResponse,
  UnlikePostResponse,
  SavePostResponse,
  UnsavePostResponse,
  ListPostsResponse,
  SavedPostsResponse,
  UpdatePostResponse,
} from "@/types/api-types";
import { apiRequest } from "./api-request";
import { Lang } from "@/utils/translation/dictionary-utils";

/**
 * Creates a new post.
 * Requires authentication; supports multipart form-data for image upload or string URL.
 *
 * @param data - PostData object containing title, content, image, format, etc.
 * @param lang - Optional language override for error messages
 */
export const createPostApi = (data: PostData, lang?: Lang) =>
  apiRequest<CreatePostResponse, PostData>("post", "/posts/create", data, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
    lang: lang || "en",
  });

/**
 * Permanently deletes a post by ID.
 * Requires authentication; only the post owner can delete.
 *
 * @param postId - Unique identifier of the post
 * @param lang - Optional language override for error messages
 */
export const deletePostApi = (postId: string, lang?: Lang) =>
  apiRequest<DeletePostResponse>(
    "delete",
    `/posts/delete/${postId}`,
    undefined,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

/**
 * Retrieves detailed information about a specific post by ID.
 * Requires authentication; only accessible with valid session/cookie.
 *
 * @param postId - Unique identifier of the post
 * @param lang - Optional language override for error messages
 */
export const getPostByIdApi = (postId: string, lang?: Lang) =>
  apiRequest<GetPostByIdResponse>("get", `/posts/get/${postId}`, undefined, {
    withCredentials: true,
    lang: lang || "en",
  });

/**
 * Likes a post by ID.
 * Requires authentication; increments like count and records user interaction.
 *
 * @param postId - Unique identifier of the post
 * @param lang - Optional language override for error messages
 */
export const likePostApi = (postId: string, lang?: Lang) =>
  apiRequest<LikePostResponse>("post", `/posts/like/${postId}`, undefined, {
    withCredentials: true,
    lang: lang || "en",
  });

/**
 * Unlikes a post by ID.
 * Requires authentication; decrements like count and removes user-post like relationship.
 *
 * @param postId - Unique identifier of the post
 * @param lang - Optional language override for error messages
 */
export const unlikePostApi = (postId: string, lang?: Lang) =>
  apiRequest<UnlikePostResponse>("post", `/posts/unlike/${postId}`, undefined, {
    withCredentials: true,
    lang: lang || "en",
  });

/**
 * Saves a post by ID to the user's saved collection.
 * Requires authentication; no request body needed.
 *
 * @param postId - Unique identifier of the post
 * @param lang - Optional language override for error messages
 */
export const savePostApi = (postId: string, lang?: Lang) =>
  apiRequest<SavePostResponse>("post", `/posts/save/${postId}`, undefined, {
    withCredentials: true,
    lang: lang || "en",
  });
/**
 * Removes a post from the user's saved collection.
 * Requires authentication; no request body needed.
 *
 * @param postId - Unique identifier of the post
 * @param lang - Optional language override for error messages
 */
export const unsavePostApi = (postId: string, lang?: Lang) =>
  apiRequest<UnsavePostResponse>("post", `/posts/unsave/${postId}`, undefined, {
    withCredentials: true,
    lang: lang || "en",
  });

/**
 * Retrieves a paginated list of posts.
 * Applies visibility rules depending on authentication.
 *
 * @param page - Page number (1-based)
 * @param limit - Number of posts per page (max 50)
 * @param authorId - Optional filter by author
 * @param format - Optional filter by post format
 * @param lang - Optional language override for error messages
 */
export const listPostsApi = (
  page: number,
  limit: number,
  authorId?: string,
  format?: string,
  lang?: Lang
) =>
  apiRequest<ListPostsResponse>("get", "/posts/list", undefined, {
    withCredentials: true,
    lang: lang || "en",
    params: {
      page: page,
      limit: limit,
      ...(authorId ? { authorId } : {}),
      ...(format ? { format } : {}),
    },
  });

/**
 * Retrieves a paginated list of the user's saved posts.
 * Requires authentication; applies visibility rules.
 *
 * @param page - Page number (1-based)
 * @param limit - Number of posts per page (max 50)
 * @param lang - Optional language override for error messages
 */
export const savedPostsApi = (page: number, limit: number, lang?: Lang) =>
  apiRequest<SavedPostsResponse>("get", "/posts/saved", undefined, {
    withCredentials: true,
    lang: lang || "en",
    params: { page, limit },
  });

export const updatePostApi = (postId: string, data: PostData, lang?: Lang) => {
  // If we have a File, build FormData
  if (data.image instanceof File) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
      if (value === null) {
        // optional: you can skip appending, backend will treat missing as null if JSON used
        formData.append(key, "null"); // only if you want sentinel
      }
    });

    return apiRequest<UpdatePostResponse, FormData>(
      "put",
      `/posts/update/${postId}`,
      formData,
      {
        withCredentials: true,
        // ❌ don't set Content-Type manually, browser will handle it
        lang: lang || "en",
      }
    );
  }

  // Otherwise send JSON (handles string URL or null cleanly)
  return apiRequest<UpdatePostResponse, PostData>(
    "put",
    `/posts/update/${postId}`,
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      lang: lang || "en",
    }
  );
};

