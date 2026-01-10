import {
  CreateCommentData,
  CreateCommentResponse,
  DeleteCommentData,
  DeleteCommentResponse,
  LikeCommentData,
  LikeCommentResponse,
  ListCommentsResponse,
  UnlikeCommentData,
  UnlikeCommentResponse,
  UpdateCommentData,
  UpdateCommentResponse,
} from "@/types/api-types";
import { Lang } from "@/utils/translation/dictionary-utils";
import { apiRequest } from "./api-request";

/**
 * Create a new comment
 */
export const createComment = (data: CreateCommentData, lang?: Lang) =>
  apiRequest<CreateCommentResponse, CreateCommentData>(
    "post",
    `/comments/create`,
    data,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

/**
 * Delete a comment (param‑based)
 */
export const deleteComment = (data: DeleteCommentData, lang?: Lang) =>
  apiRequest<DeleteCommentResponse>(
    "delete",
    `/comments/delete/${data.commentId}`, 
    undefined,                           
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );
/**
 * Update a comment
 */
export const updateComment = (data: UpdateCommentData, lang?: Lang) =>
  apiRequest<UpdateCommentResponse, UpdateCommentData>(
    "put",
    `/comments/edit`,
    data,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

/**
 * Like a comment
 */
export const likeComment = (data: LikeCommentData, lang?: Lang) =>
  apiRequest<LikeCommentResponse, LikeCommentData>(
    "post",
    `/comments/like`,
    data,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

/**
 * Unlike a comment
 */
export const unlikeComment = (data: UnlikeCommentData, lang?: Lang) =>
  apiRequest<UnlikeCommentResponse, UnlikeCommentData>(
    "post",
    `/comments/unlike`,
    data,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

/**
 * Get comments for a post with pagination
 */
export const getComments = (postId: string, page = 1, limit = 10) =>
  apiRequest<ListCommentsResponse>(
    "get",
    `/comments/post/${postId}?page=${page}&limit=${limit}`,
    undefined,
    { withCredentials: true }
  );
