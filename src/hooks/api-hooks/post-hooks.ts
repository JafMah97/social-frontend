// src/hooks/post-hooks.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  CreatePostResponse,
  DeletePostResponse,
  GetPostByIdResponse,
  LikePostResponse,
  UnlikePostResponse,
  SavePostResponse,
  UnsavePostResponse,
  SavedPostsResponse,
  UpdatePostResponse,
  ApiErrorResponse,
  CreatePostData,
  UpdatePostData,
  MutationPostContext,
  
} from "@/types/api-types";
import {
  createPostApi,
  deletePostApi,
  getPostByIdApi,
  likePostApi,
  unlikePostApi,
  savePostApi,
  unsavePostApi,
  listPostsApi,
  savedPostsApi,
  updatePostApi,
} from "@/api/post-api";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Hook for creating a new post.
 */
export function useCreatePost(
  options?: UseMutationOptions<
    CreatePostResponse,
    ApiErrorResponse,
    CreatePostData,
    MutationPostContext
  >
) {
  return useMutation({
    mutationFn: (data: CreatePostData) => createPostApi(data),
    ...options,
  });
}

/**
 * Hook for deleting a post by ID.
 */
export function useDeletePost(
  options?: UseMutationOptions<
    DeletePostResponse,
    ApiErrorResponse,
    string,
    MutationPostContext
  >
) {
  return useMutation({
    mutationFn: (postId: string) => deletePostApi(postId),
    ...options,
  });
}

/**
 * Hook for retrieving a post by ID.
 */
export function useGetPostById(
  postId: string,
  options?: UseQueryOptions<GetPostByIdResponse, ApiErrorResponse>
) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostByIdApi(postId),
    ...options,
  });
}

/**
 * Hook for liking a post.
 */
export function useLikePost(
  options?: UseMutationOptions<
    LikePostResponse,
    ApiErrorResponse,
    string,
    MutationPostContext
  >
) {
  return useMutation({
    mutationFn: (postId: string) => likePostApi(postId),
    ...options,
  });
}

/**
 * Hook for unliking a post.
 */
export function useUnlikePost(
  options?: UseMutationOptions<
    UnlikePostResponse,
    ApiErrorResponse,
    string,
    MutationPostContext
  >
) {
  return useMutation({
    mutationFn: (postId: string) => unlikePostApi(postId),
    ...options,
  });
}

/**
 * Hook for saving a post.
 */
export function useSavePost(
  options?: UseMutationOptions<
    SavePostResponse,
    ApiErrorResponse,
    string,
    MutationPostContext
  >
) {
  return useMutation({
    mutationFn: (postId: string) => savePostApi(postId),
    ...options,
  });
}

/**
 * Hook for unsaving a post.
 */
export function useUnsavePost(
  options?: UseMutationOptions<
    UnsavePostResponse,
    ApiErrorResponse,
    string,
    MutationPostContext
  >
) {
  return useMutation
  ({
    mutationFn: (postId: string) => unsavePostApi(postId),
    ...options,
  });
}

/**
 * Hook for retrieving saved posts with pagination.
 */
export function useSavedPosts(
  page: number,
  limit: number,
  options?: UseQueryOptions<SavedPostsResponse, ApiErrorResponse>
) {
  return useQuery({
    queryKey: ["savedPosts", page, limit],
    queryFn: () => savedPostsApi(page, limit),
    ...options,
  });
}

export function useUpdatePost(
  options?: UseMutationOptions<
    UpdatePostResponse,
    ApiErrorResponse,
    { postId: string; data: UpdatePostData },
    MutationPostContext
  >
) {
  return useMutation({
    mutationFn: ({ postId, data }) => updatePostApi(postId, data),
    ...options,
  });
}

export function usePostsPagination(
  enabled: boolean,
  limit = 10,
  authorId?: string,
  format?: string
) {
  const query = useInfiniteQuery({
    queryKey: ["posts", limit, authorId, format],
    initialPageParam: 1,

    enabled: enabled,

    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return listPostsApi(page, limit, authorId, format);
    },

    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data;

      const current = pagination.page;
      const totalPages = pagination.pages;

      return current < totalPages ? current + 1 : undefined;
    },
  });

  const posts = query.data?.pages.flatMap((page) => page.data.posts) ?? [];

  return {
    posts,
    isLoading: query.isLoading,
    isFetchingMore: query.isFetchingNextPage,
    loadMore: query.fetchNextPage,
    hasMore: query.hasNextPage,
    isSuccess: query.isSuccess,
    isError: query.isError,
    _rawQuery: query,
  };
}
