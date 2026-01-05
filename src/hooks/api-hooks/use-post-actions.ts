import { useState } from "react";
import {
  useLikePost,
  useUnlikePost,
  useSavePost,
  useUnsavePost,
  useDeletePost,
  useUpdatePost, 
} from "@/hooks/api-hooks/post-hooks";
import { PostDTO, PostData } from "@/types/api-types";
import { toast } from "sonner";
import { useTranslation } from "@/providers/translation-provider";
import { useQueryClient } from "@tanstack/react-query";

export function usePostActions(post: PostDTO) {
  const dictToast = useTranslation().feedsPage.toast;
  const [localPost, setLocalPost] = useState(post);

  const queryClient = useQueryClient();

  const likeMutation = useLikePost({
    onMutate: async () => {
      setLocalPost((prev) => ({
        ...prev,
        isLiked: true,
        likesCount: prev.likesCount + 1,
      }));
    },
    onSuccess: (updated) => {
      setLocalPost((prev) => ({
        ...prev,
        ...updated.data.post,
      }));
    },
    onError: () => {
      toast.error(dictToast.likeError);
      setLocalPost((prev) => ({
        ...prev,
        isLiked: false,
        likesCount: prev.likesCount - 1,
      }));
    },
  });

  const unlikeMutation = useUnlikePost({
    onMutate: async () => {
      setLocalPost((prev) => ({
        ...prev,
        isLiked: false,
        likesCount: prev.likesCount - 1,
      }));
    },
    onSuccess: (updated) => {
      setLocalPost((prev) => ({
        ...prev,
        ...updated.data.post,
      }));
    },
    onError: () => {
      toast.error(dictToast.unlikeError);
      setLocalPost((prev) => ({
        ...prev,
        isLiked: true,
        likesCount: prev.likesCount + 1,
      }));
    },
  });

  const saveMutation = useSavePost({
    onMutate: async () => {
      setLocalPost((prev) => ({
        ...prev,
        isSaved: true,
      }));
    },
    onSuccess: (updated) => {
      setLocalPost((prev) => ({
        ...prev,
        ...updated.data.post,
      }));
    },
    onError: () => {
      toast.error(dictToast.saveError);
      setLocalPost((prev) => ({
        ...prev,
        isSaved: false,
      }));
    },
  });

  const unsaveMutation = useUnsavePost({
    onMutate: async () => {
      setLocalPost((prev) => ({
        ...prev,
        isSaved: false,
      }));
    },
    onSuccess: (updated) => {
      setLocalPost((prev) => ({
        ...prev,
        ...updated.data.post,
      }));
    },
    onError: () => {
      toast.error(dictToast.unsaveError);
      setLocalPost((prev) => ({
        ...prev,
        isSaved: true,
      }));
    },
  });

  const deleteMutation = useDeletePost({
    onSuccess: () => {
      toast.success(dictToast.deleteSuccess);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => toast.error(dictToast.deleteError),
  });

  const updateMutation = useUpdatePost({
    onMutate: async () => {

    },
    onSuccess: (updated) => {
      toast.success(dictToast.updateSuccess ?? "Post updated successfully");
      setLocalPost((prev) => ({
        ...prev,
        ...updated.data.post,
      }));
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error(dictToast.updateError ?? "Failed to update post");
      // optionally rollback
      setLocalPost(post);
    },
  });

  return {
    post: localPost,

    liked: localPost.isLiked,
    saved: localPost.isSaved,

    like: () => likeMutation.mutate(localPost.id),
    unlike: () => unlikeMutation.mutate(localPost.id),
    save: () => saveMutation.mutate(localPost.id),
    unsave: () => unsaveMutation.mutate(localPost.id),
    deletePost: () => deleteMutation.mutate(localPost.id),
    updatePost: (data: PostData) =>
      updateMutation.mutate({ postId: localPost.id, data }),

    isLiking: likeMutation.isPending || unlikeMutation.isPending,
    isSaving: saveMutation.isPending || unsaveMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}
