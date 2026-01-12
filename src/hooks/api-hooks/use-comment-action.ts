"use client";

import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "@/providers/translation-provider";

import { ListCommentsResponse, CommentItem } from "@/types/api-types";
import {
  useCreateComment,
  useDeleteComment,
  useLikeComment,
  useUnlikeComment,
  useUpdateComment,
} from "./comments-hooks";
import { removeCommentInPages } from "../helpers/comments-cache";
import { makeOptimisticCommentMutation } from "../helpers/optimistic-update-helper";

export function useCommentActions({
  postId,
  limit,
}: {
  postId: string;
  limit: number;
}) {
  const dictToast = useTranslation().feedsPage.comments.toast;
  const queryClient = useQueryClient();
  const key = ["comments", postId, limit] as const;

  // Like
  const {
    mutate: likeComment,
    isSuccess: isLikeCommentSuccess,
    isPending: isLikeCommentPending,
    isError: isLikeCommentError,
  } = makeOptimisticCommentMutation(useLikeComment, {
    key,
    queryClient,
    fieldPatch: (c: CommentItem) => ({
      isLiked: true,
      likesCount: c.likesCount + 1,
    }),
    errorToast: dictToast.like.error,
  });

  // Unlike
  const {
    mutate: unlikeComment,
    isSuccess: isUnlikeCommentSuccess,
    isPending: isUnlikeCommentPending,
    isError: isUnlikeCommentError,
  } = makeOptimisticCommentMutation(useUnlikeComment, {
    key,
    queryClient,
    fieldPatch: (c: CommentItem) => ({
      isLiked: false,
      likesCount: Math.max(c.likesCount - 1, 0),
    }),
    errorToast: dictToast.unlike.error,
  });

  // Update
  const {
    mutate: updateComment,
    isSuccess: isUpdateCommentSuccess,
    isPending: isUpdateCommentPending,
    isError: isUpdateCommentError,
  } = makeOptimisticCommentMutation(useUpdateComment, {
    key,
    queryClient,
    fieldPatch: (c: CommentItem) => c, // identity patch, server result replaces
    successToast: dictToast.update.success,
    errorToast: dictToast.update.error,
  });

  // Delete (remove from cache)
  const {
    mutate: deleteComment,
    isSuccess: isDeleteCommentSuccess,
    isPending: isDeleteCommentPending,
    isError: isDeleteCommentError,
  } = useDeleteComment({
    onSuccess: (_res, variables) => {
      toast.success(dictToast.delete.success);
      queryClient.setQueryData<InfiniteData<ListCommentsResponse>>(
        key,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: removeCommentInPages(old.pages, variables.commentId),
          };
        }
      );
    },
    onError: () => toast.error(dictToast.delete.error),
  });

  // Create (invalidate to fetch new comments)
  const {
    mutate: createComment,
    isSuccess: isCreateCommentSuccess,
    isPending: isCreateCommentPending,
    isError: isCreateCommentError,
  } = useCreateComment({
    onSuccess: () => {
      toast.success(dictToast.create.success);
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: () => toast.error(dictToast.create.error),
  });

  return {
    createComment,
    likeComment,
    unlikeComment,
    updateComment,
    deleteComment,

    isLikeCommentSuccess,
    isLikeCommentPending,
    isLikeCommentError,

    isUnlikeCommentSuccess,
    isUnlikeCommentPending,
    isUnlikeCommentError,

    isUpdateCommentSuccess,
    isUpdateCommentPending,
    isUpdateCommentError,

    isDeleteCommentSuccess,
    isDeleteCommentPending,
    isDeleteCommentError,

    isCreateCommentSuccess,
    isCreateCommentPending,
    isCreateCommentError,
  };
}
