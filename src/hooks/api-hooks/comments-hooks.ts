import {
  CreateCommentResponse,
  DeleteCommentData,
  DeleteCommentResponse,
  UpdateCommentData,
  UpdateCommentResponse,
  likeCommentData,
  LikeCommentResponse,
  UnlikeCommentData,
  UnlikeCommentResponse,
  ListCommentsResponse,
  ApiErrorResponse,
  CreateCommentData,
  UseCommentsParams,
} from "@/types/api-types";

import {
  createComment,
  deleteComment,
  updateComment,
  LikeComment,
  unlikeComment,
  getComments,
} from "@/api/comment-api";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Hook for creating a comment.
 */
export function useCreateComment(
  options?: UseMutationOptions<
    CreateCommentResponse,
    ApiErrorResponse,
    CreateCommentData
  >
) {
  return useMutation<
    CreateCommentResponse,
    ApiErrorResponse,
    CreateCommentData
  >({
    mutationFn: (data) => createComment(data),
    ...options,
  });
}

/**
 * Hook for deleting a comment.
 */
export function useDeleteComment(
  options?: UseMutationOptions<
    DeleteCommentResponse,
    ApiErrorResponse,
    DeleteCommentData
  >
) {
  return useMutation<
    DeleteCommentResponse,
    ApiErrorResponse,
    DeleteCommentData
  >({
    mutationFn: (data) => deleteComment(data),
    ...options,
  });
}

/**
 * Hook for updating a comment.
 */
export function useUpdateComment(
  options?: UseMutationOptions<
    UpdateCommentResponse,
    ApiErrorResponse,
    UpdateCommentData
  >
) {
  return useMutation<
    UpdateCommentResponse,
    ApiErrorResponse,
    UpdateCommentData
  >({
    mutationFn: (data) => updateComment(data),
    ...options,
  });
}

/**
 * Hook for liking a comment.
 */
export function useLikeComment(
  options?: UseMutationOptions<
    LikeCommentResponse,
    ApiErrorResponse,
    likeCommentData
  >
) {
  return useMutation<LikeCommentResponse, ApiErrorResponse, likeCommentData>({
    mutationFn: (data) => LikeComment(data),
    ...options,
  });
}

/**
 * Hook for unliking a comment.
 */
export function useUnlikeComment(
  options?: UseMutationOptions<
    UnlikeCommentResponse,
    ApiErrorResponse,
    UnlikeCommentData
  >
) {
  return useMutation<
    UnlikeCommentResponse,
    ApiErrorResponse,
    UnlikeCommentData
  >({
    mutationFn: (data) => unlikeComment(data),
    ...options,
  });
}

export function useComments(
  { postId, page, limit = 10 }: UseCommentsParams,
  options?: Omit<
    UseQueryOptions<ListCommentsResponse, ApiErrorResponse>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<ListCommentsResponse, ApiErrorResponse>({
    queryKey: ["comments", postId, page, limit],
    queryFn: () => getComments(postId, page, limit),

    enabled: !!postId, 

    placeholderData: (prev) => prev,
    ...options,
  });
}
