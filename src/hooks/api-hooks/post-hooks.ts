// src/hooks/post-hooks.ts
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
  ApiErrorResponse,
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
  options?: UseMutationOptions<CreatePostResponse, ApiErrorResponse, PostData>
) {
  return useMutation<CreatePostResponse, ApiErrorResponse, PostData>({
    mutationFn: (data: PostData) => createPostApi(data),
    ...options,
  });
}

/**
 * Hook for deleting a post by ID.
 */
export function useDeletePost(
  options?: UseMutationOptions<DeletePostResponse, ApiErrorResponse, string>
) {
  return useMutation<DeletePostResponse, ApiErrorResponse, string>({
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
  return useQuery<GetPostByIdResponse, ApiErrorResponse>({
    queryKey: ["post", postId],
    queryFn: () => getPostByIdApi(postId),
    ...options,
  });
}

/**
 * Hook for liking a post.
 */
export function useLikePost(
  options?: UseMutationOptions<LikePostResponse, ApiErrorResponse, string>
) {
  return useMutation<LikePostResponse, ApiErrorResponse, string>({
    mutationFn: (postId: string) => likePostApi(postId),
    ...options,
  });
}

/**
 * Hook for unliking a post.
 */
export function useUnlikePost(
  options?: UseMutationOptions<UnlikePostResponse, ApiErrorResponse, string>
) {
  return useMutation<UnlikePostResponse, ApiErrorResponse, string>({
    mutationFn: (postId: string) => unlikePostApi(postId),
    ...options,
  });
}

/**
 * Hook for saving a post.
 */
export function useSavePost(
  options?: UseMutationOptions<SavePostResponse, ApiErrorResponse, string>
) {
  return useMutation<SavePostResponse, ApiErrorResponse, string>({
    mutationFn: (postId: string) => savePostApi(postId),
    ...options,
  });
}

/**
 * Hook for unsaving a post.
 */
export function useUnsavePost(
  options?: UseMutationOptions<UnsavePostResponse, ApiErrorResponse, string>
) {
  return useMutation<UnsavePostResponse, ApiErrorResponse, string>({
    mutationFn: (postId: string) => unsavePostApi(postId),
    ...options,
  });
}

/**
 * Hook for listing posts with pagination and optional filters.
 */
export function usePosts(
  {
    page,
    limit,
    authorId,
    format,
  }: { page: number; limit?: number; authorId?: string; format?: string },
  options?: Omit<
    UseQueryOptions<ListPostsResponse, ApiErrorResponse>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<ListPostsResponse, ApiErrorResponse>({
    queryKey: ["posts", page, limit, authorId, format],
    queryFn: () => listPostsApi(page, limit as number, authorId, format),

    enabled: page > 0, // same idea as !!postId

    placeholderData: (prev) => prev,
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
  return useQuery<SavedPostsResponse, ApiErrorResponse>({
    queryKey: ["savedPosts", page, limit],
    queryFn: () => savedPostsApi(page, limit),
    ...options,
  });
}

/**
 * Hook for updating a post by ID.
 */
export function useUpdatePost(
  options?: UseMutationOptions<
    UpdatePostResponse,
    ApiErrorResponse,
    { postId: string; data: PostData }
  >
) {
  return useMutation<
    UpdatePostResponse,
    ApiErrorResponse,
    { postId: string; data: PostData }
  >({
    mutationFn: ({ postId, data }) => updatePostApi(postId, data),
    ...options,
  });
}
