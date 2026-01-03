import {
  CreateCommentData,
  CreateCommentResponse,
  DeleteCommentData,
  DeleteCommentResponse,
  likeCommentData,
  LikeCommentResponse,
  ListCommentsResponse,
  UnlikeCommentData,
  UnlikeCommentResponse,
  UpdateCommentData,
  UpdateCommentResponse,
} from "@/types/api-types";
import { Lang } from "@/utils/translation/dictionary-utils";
import { apiRequest } from "./api-request";

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

export const deleteComment = (data: DeleteCommentData, lang?: Lang) =>
  apiRequest<DeleteCommentResponse, DeleteCommentData>(
    "delete",
    `/comments/delete`,
    data,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

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

export const LikeComment = (data: likeCommentData, lang?: Lang) =>
  apiRequest<LikeCommentResponse, likeCommentData>(
    "post",
    `/comments/like`,
    data,
    {
      withCredentials: true,
      lang: lang || "en",
    }
  );

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

export const getComments = (postId: string, page = 1, limit = 10) =>
  apiRequest<ListCommentsResponse>(
    "get",
    `/comments/post/${postId}?page=${page}&limit=${limit}`,
    undefined,
    { withCredentials: true }
  );

