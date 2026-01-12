"use client";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "@/providers/translation-provider";
import {
  useLikePost,
  useUnlikePost,
  useSavePost,
  useUnsavePost,
  useDeletePost,
  useUpdatePost,
  useCreatePost,
} from "@/hooks/api-hooks/post-hooks";
import { ListPostsResponse, PostDTO } from "@/types/api-types";
import { removePostInPages } from "../helpers/posts-cache";
import { makeOptimisticPostMutation } from "../helpers/optimistic-update-helper";
export function usePostActions({
  limit,
  authorId,
  format,
}: {
  limit: number;
  authorId?: string;
  format?: string;
}) {
  const dictToast = useTranslation().feedsPage.post.toast;
  const queryClient = useQueryClient();
  const key = ["posts", limit, authorId, format] as const;

  // Like
  const {
    mutate: likePost,
    isSuccess: isLikePostSuccess,
    isPending: isLikePostPending,
    isError: isLikePostError,
  } = makeOptimisticPostMutation(useLikePost, {
    key,
    queryClient,
    fieldPatch: (p: PostDTO) => ({
      isLiked: true,
      likesCount: p.likesCount + 1,
    }),

    errorToast: dictToast.like.error,
  });

  // Unlike
  const {
    mutate: unLikePost,
    isSuccess: isUnLikePostSuccess,
    isPending: isUnLikePostPending,
    isError: isUnLikePostError,
  } = makeOptimisticPostMutation(useUnlikePost, {
    key,
    queryClient,
    fieldPatch: (p: PostDTO) => ({
      isLiked: false,
      likesCount: Math.max(p.likesCount - 1, 0),
    }),
    errorToast: dictToast.unlike.error,
  });

  // Save
  const {
    mutate: savePost,
    isSuccess: isSavePostSuccess,
    isPending: isSavePostPending,
    isError: isSavePostError,
  } = makeOptimisticPostMutation(useSavePost, {
    key,
    queryClient,
    fieldPatch: () => ({ isSaved: true }),
    errorToast: dictToast.save.error,
  });

  // Unsave
  const {
    mutate: unSavePost,
    isSuccess: isUnSavePostSuccess,
    isPending: isUnSavePostPending,
    isError: isUnSavePostError,
  } = makeOptimisticPostMutation(useUnsavePost, {
    key,
    queryClient,
    fieldPatch: () => ({ isSaved: false }),
    errorToast: dictToast.unSave.error,
  });

  // Update
  const {
    mutate: updatePost,
    isSuccess: isPostUpdateSuccess,
    isPending: isPostUpdatePending,
    isError: isPostUpdateError,
  } = makeOptimisticPostMutation(useUpdatePost, {
    key,
    queryClient,
    fieldPatch: (p: PostDTO) => p, // optimistic patch can be identity, server result will replace
    successToast: dictToast.update.success,
    errorToast: dictToast.update.error,
  });

  // Delete (special case: remove instead of patch)
  const {
    mutate: deletePost,
    isSuccess: isDeletePostSuccess,
    isPending: isDeletePostPending,
    isError: isDeletePostError,
  } = useDeletePost({
    onSuccess: (_res, postId) => {
      toast.success(dictToast.delete.success);
      queryClient.setQueryData<InfiniteData<ListPostsResponse>>(key, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: removePostInPages(old.pages, postId),
        };
      });
    },
    onError: () => toast.error(dictToast.delete.error),
  });

  // Create (still invalidate)
  const {
    mutate: createPost,
    isSuccess: isPostCreateSuccess,
    isPending: isPostCreatePending,
    isError: isPostCreateError,
  } = useCreatePost({
    onSuccess: () => {
      toast.success(dictToast.create.success);
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: () => toast.error(dictToast.create.error),
  });

  return {
    createPost,
    likePost,
    unLikePost,
    savePost,
    unSavePost,
    updatePost,
    deletePost,

    isLikePostSuccess,
    isLikePostPending,
    isLikePostError,

    isUnLikePostSuccess,
    isUnLikePostPending,
    isUnLikePostError,

    isSavePostSuccess,
    isSavePostPending,
    isSavePostError,

    isUnSavePostSuccess,
    isUnSavePostPending,
    isUnSavePostError,

    isPostUpdateSuccess,
    isPostUpdatePending,
    isPostUpdateError,

    isDeletePostSuccess,
    isDeletePostPending,
    isDeletePostError,

    isPostCreateSuccess,
    isPostCreatePending,
    isPostCreateError,
  };
}
