import {
  InfiniteData,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  CommentItem,
  ListCommentsResponse,
  ListPostsResponse,
  MutationCommentsContext,
  MutationPostContext,
  PostDTO,
} from "@/types/api-types";
import { toast } from "sonner";

type OptimisticPostConfig = {
  key: readonly unknown[];
  queryClient: QueryClient;
  fieldPatch: (post: PostDTO) => Partial<PostDTO>;
  successToast?: string;
  errorToast?: string;
};

export function makeOptimisticPostMutation<TData, TError, TVariables>(
  mutationHook: (
    options?: UseMutationOptions<TData, TError, TVariables, MutationPostContext>
  ) => UseMutationResult<TData, TError, TVariables, MutationPostContext>,
  {
    key,
    queryClient,
    fieldPatch,
    successToast,
    errorToast,
  }: OptimisticPostConfig
) {
  return mutationHook({
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous =
        queryClient.getQueryData<InfiniteData<ListPostsResponse>>(key);

      const postId =
        (variables as { postId?: string })?.postId ??
        (variables as unknown as string);

      queryClient.setQueryData<InfiniteData<ListPostsResponse>>(key, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((p) =>
                p.id === postId ? { ...p, ...fieldPatch(p) } : p
              ),
            },
          })),
        };
      });

      return { previous };
    },
    onSuccess: (data: TData) => {
      const updated = (data as unknown as { data: { post: PostDTO } }).data
        .post;
      queryClient.setQueryData<InfiniteData<ListPostsResponse>>(key, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((p) =>
                p.id === updated.id ? updated : p
              ),
            },
          })),
        };
      });
      if (successToast) toast.success(successToast);
    },
    onError: (_err: TError, _vars: TVariables, ctx?: MutationPostContext) => {
      if (errorToast) toast.error(errorToast);
      if (ctx?.previous) {
        queryClient.setQueryData(key, ctx.previous);
      }
    },
  });
}

type OptimisticCommentConfig = {
  key: readonly unknown[];
  queryClient: QueryClient;
  fieldPatch: (comment: CommentItem) => Partial<CommentItem>;
  successToast?: string;
  errorToast?: string;
};

export function makeOptimisticCommentMutation<TData, TError, TVariables>(
  mutationHook: (
    options?: UseMutationOptions<
      TData,
      TError,
      TVariables,
      MutationCommentsContext
    >
  ) => UseMutationResult<TData, TError, TVariables, MutationCommentsContext>,
  {
    key,
    queryClient,
    fieldPatch,
    successToast,
    errorToast,
  }: OptimisticCommentConfig
) {
  return mutationHook({
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous =
        queryClient.getQueryData<InfiniteData<ListCommentsResponse>>(key);

      const commentId =
        (variables as { commentId?: string })?.commentId ??
        (variables as unknown as string);

      queryClient.setQueryData<InfiniteData<ListCommentsResponse>>(
        key,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                comments: page.data.comments.map((c) =>
                  c.id === commentId ? { ...c, ...fieldPatch(c) } : c
                ),
              },
            })),
          };
        }
      );

      return { previous };
    },
    onSuccess: (data: TData) => {
      const updated = (data as unknown as { data: { comment: CommentItem } })
        .data.comment;
      queryClient.setQueryData<InfiniteData<ListCommentsResponse>>(
        key,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                comments: page.data.comments.map((c) =>
                  c.id === updated.id ? updated : c
                ),
              },
            })),
          };
        }
      );
      if (successToast) toast.success(successToast);
    },
    onError: (
      _err: TError,
      _vars: TVariables,
      ctx?: MutationCommentsContext
    ) => {
      if (errorToast) toast.error(errorToast);
      if (ctx?.previous) {
        queryClient.setQueryData(key, ctx.previous);
      }
    },
  });
}
