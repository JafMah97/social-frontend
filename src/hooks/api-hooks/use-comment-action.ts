"use client";
import { useState } from "react";
import { useCommentsPagination } from "./use-comments-pagination";
import {
  useCreateComment,
  useDeleteComment,
  useLikeComment,
  useUnlikeComment,
  useUpdateComment,
} from "./comments-hooks";
import { useTranslation } from "@/providers/translation-provider";
import { toast } from "sonner";
import { NormalizedComment } from "@/types/api-types";

interface UseCommentActionsParams {
  
    postId: string;
    enabled: boolean;
    limit: number;
}
export function useCommentActions({
  postId, enabled, limit 
}: UseCommentActionsParams) {
  const dict = useTranslation().feedsPage.comments.toast;

  const [comments, setComments] = useState<NormalizedComment[] | []>([]);

  const {
    refetch: refetchComments,
    comments: requestedComments,
    hasMore,
    isFetchingMore: isFetchingMoreComments,
    isLoading: isCommentsPending,
    loadMore,
  } = useCommentsPagination(postId, enabled, limit);

  if (!isCommentsPending && !isFetchingMoreComments) {
    setComments((prev) => {
      if (prev === requestedComments) return prev;
      return requestedComments;
    });
  }

  const {
    mutate: createComment,
    data: CreateCommentData,
    isSuccess: isCreateSuccess,
    isPending: isCreatePending,
    isError: isCreateError,
  } = useCreateComment({
    onSuccess: () => {
      toast.success(dict.create.success); 
      setComments((prev) => [...prev, CreateCommentData!.data.comment]);
    },
    onError: () => {
      toast.error(dict.create.error);
    },
  });

  const {
    mutate: updateComment,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useUpdateComment({
    onMutate: (vars) => {
      const prevComments = comments;

      setComments((prev) =>
        prev.map((c) =>
          c.id === vars.commentId ? { ...c, content: vars.content } : c
        )
      );
      return { prevComments };
    },
    onSuccess: (data) => {
      toast.success(dict.update.success);
      setComments((prev) =>
        prev.map((c) => (c.id === data.data.comment.id ? data.data.comment : c))
      );
    },
    onError: (err, vars, context) => {
      if (context?.prevComments) {
        setComments(context.prevComments);
      }
      toast.error(dict.update.error);
    },
  });
  const {
    mutate: likeComment,
    isPending: isLikePending,
    isError: isLikeError,
    isSuccess: isLikeSuccess,
  } = useLikeComment({
    onMutate: (vars) => {
      const prevComments = comments;
      setComments((prev) =>
        prev.map((c) =>
          c.id === vars.commentId
            ? { ...c, isLiked: true, likesCount: c.likesCount + 1 }
            : c
        )
      );
      return { prevComments };
    },
    onSuccess: (data) => {
      setComments((prev) =>
        prev.map((c) => (c.id === data.data.comment.id ? data.data.comment : c))
      );
    },
    onError: (err, vars, context) => {
      if (context?.prevComments) {
        setComments(context.prevComments);
      }
      toast.error(dict.like.error);
    },
  });
  const {
    mutate: unLikeComment,
    isPending: isUnLikePending,
    isError: isUnLikeError,
    isSuccess: isUnLikeSuccess,
  } = useUnlikeComment({
    onMutate: (vars) => {
      const prevComments = comments;
      setComments((prev) =>
        prev.map((c) =>
          c.id === vars.commentId
            ? { ...c, isLiked: false, likesCount: c.likesCount - 1 }
            : c
        )
      );
      return { prevComments };
    },
    onSuccess: (data) => {
      setComments((prev) =>
        prev.map((c) => (c.id === data.data.comment.id ? data.data.comment : c))
      );
    },
    onError: (err, vars, context) => {
      if (context?.prevComments) {
        setComments(context.prevComments);
      }
      toast.error(dict.like.error);
    },
  });
  const {
    mutate: deleteComment,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteComment({
    onMutate: (context) => {
      const prevComments = comments;
      setComments((prev) => prev.filter((c) => c.id !== context.commentId));
      return { prevComments };
    },
    onSuccess: () => {
      toast.success(dict.delete.success);
    },
    onError: (err, vars, context) => {
      if (context?.prevComments) {
        setComments(context.prevComments);
      }
    },
  });
  return {
    // comments
    comments,
    isCommentsPending,
    loadMore,
    hasMore,
    isFetchingMoreComments,
    refetchComments,

    // creating comment
    createComment,
    isCreatePending,
    isCreateSuccess,
    isCreateError,

    //update comment
    updateComment,
    isUpdatePending,
    isUpdateSuccess,
    isUpdateError,

    // like comment
    likeComment,
    isLikePending,
    isLikeSuccess,
    isLikeError,

    // unLike Comment
    unLikeComment,
    isUnLikePending,
    isUnLikeSuccess,
    isUnLikeError,

    // delete Comment
    deleteComment,
    isDeletePending,
    isDeleteSuccess,
    isDeleteError,
  };
}
