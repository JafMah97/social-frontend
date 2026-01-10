import {
  CreateCommentResponse,
  DeleteCommentData,
  DeleteCommentResponse,
  UpdateCommentData,
  UpdateCommentResponse,
  LikeCommentData,
  LikeCommentResponse,
  UnlikeCommentData,
  UnlikeCommentResponse,
  ApiErrorResponse,
  CreateCommentData,
  CommentQueryContext,
} from "@/types/api-types";

import {
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  unlikeComment,
  
} from "@/api/comment-api";

import {
  useMutation,
  UseMutationOptions,
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
    DeleteCommentData,
    CommentQueryContext
  >
) {
  return useMutation<
    DeleteCommentResponse,
    ApiErrorResponse,
    DeleteCommentData,
    CommentQueryContext
  >({ mutationFn: (data) => deleteComment(data), ...options });
}
/**
 * Hook for updating a comment.
 */
export function useUpdateComment(
  options?: UseMutationOptions<
    UpdateCommentResponse,
    ApiErrorResponse,
    UpdateCommentData,
    CommentQueryContext
  >
) {
  return useMutation<
    UpdateCommentResponse,
    ApiErrorResponse,
    UpdateCommentData,
    CommentQueryContext
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
    LikeCommentData,
    CommentQueryContext
  >
) {
  return useMutation<
    LikeCommentResponse,
    ApiErrorResponse,
    LikeCommentData,
    CommentQueryContext
  >({
    mutationFn: (data) => likeComment(data),
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
    UnlikeCommentData,
    CommentQueryContext
  >
) {
  return useMutation<
    UnlikeCommentResponse,
    ApiErrorResponse,
    UnlikeCommentData,
    CommentQueryContext
  >({
    mutationFn: (data) => unlikeComment(data),
    ...options,
  });
}


