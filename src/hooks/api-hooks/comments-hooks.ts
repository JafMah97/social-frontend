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
  ListCommentsResponse,
  CommentItem,
  MutationCommentsContext,
} from "@/types/api-types";

import {
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  unlikeComment,
  getComments,
} from "@/api/comment-api";

import {
  useInfiniteQuery,
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
  return useMutation({
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
    MutationCommentsContext
  >
) {
  return useMutation({ mutationFn: (data) => deleteComment(data), ...options });
}
/**
 * Hook for updating a comment.
 */
export function useUpdateComment(
  options?: UseMutationOptions<
    UpdateCommentResponse,
    ApiErrorResponse,
    UpdateCommentData,
    MutationCommentsContext
  >
) {
  return useMutation({
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
    MutationCommentsContext
  >
) {
  return useMutation({
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
    MutationCommentsContext
  >
) {
  return useMutation({
    mutationFn: (data) => unlikeComment(data),
    ...options,
  });
}

export function useCommentsPagination(
  postId: string,
  enabled: boolean,
  limit: number
) {
  const query = useInfiniteQuery<ListCommentsResponse, ApiErrorResponse>({
    queryKey: ["comments", postId, limit],
    initialPageParam: 1,

    enabled: enabled && !!postId,

    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return getComments(postId, page, limit);
    },

    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data;
      return pagination.hasNext ? pagination.currentPage + 1 : undefined;
    },
  });

  const comments: CommentItem[] =
    query.data?.pages.flatMap((page) => page.data.comments) ?? [];

  return {
    comments,
    isLoading: query.isLoading,
    isFetchingMore: query.isFetchingNextPage,
    loadMore: query.fetchNextPage,
    hasMore: query.hasNextPage,
    refetch: query.refetch,
  };
}
