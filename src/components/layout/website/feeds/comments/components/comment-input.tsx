"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmojiesPicker from "../../create-post/components/emojies-picker";
import {
  useComments,
  useCreateComment,
} from "@/hooks/api-hooks/comments-hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import { useTranslation } from "@/providers/translation-provider";

export default function CommentInput({ postId }: { postId: string }) {
  const dict = useTranslation().feedsPage.comments.commentInput
  const [commentValue, setCommentValue] = useState("");
  const { refetch } = useComments(postId);
  const {data} = useCurrentLoggedUser()
  const { mutate, isPending } = useCreateComment({
    onSuccess: () => {
      refetch();
      setCommentValue("")
      toast.success(dict.toast.success);
    },
    onError: () => {
      toast.error(dict.toast.error);
    },
  });

  const handleCreateComment = () => {
    if (!commentValue.trim()) return;
    mutate({
      postId: postId,
      content: commentValue,
    });
  };

  return (
    <div className="px-4 mt-4 flex flex-row items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage src={data?.data.profileImage} />
        <AvatarFallback>{data?.data.username.slice(0,2)}</AvatarFallback>
      </Avatar>

      <Input
        className="min-h-10 rounded-2xl"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        placeholder={dict.placeholder}
      />

      <EmojiesPicker setPostContent={setCommentValue} />

      <Button
        className="cursor-pointer"
        size="icon"
        onClick={handleCreateComment}
        disabled={!commentValue.trim()}
      >
        {isPending ? <Spinner /> : <Send />}
      </Button>
    </div>
  );
}
