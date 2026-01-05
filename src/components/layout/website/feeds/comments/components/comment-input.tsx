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
import { maxChars } from "@/constants";

export default function CommentInput({ postId }: { postId: string }) {
  const dict = useTranslation().feedsPage.comments.commentInput;
  const [commentValue, setCommentValue] = useState("");
  const [shake, setShake] = useState(false); 
  const { refetch } = useComments({ postId, page: 1, limit: 5 });
  const { data } = useCurrentLoggedUser();
  const { mutate, isPending } = useCreateComment({
    onSuccess: () => {
      refetch();
      setCommentValue("");
      toast.success(dict.toast.success);
    },
    onError: () => {
      toast.error(dict.toast.error);
    },
  });

  const handleCreateComment = () => {
    if (!commentValue.trim()) return;
    mutate({
      postId,
      content: commentValue,
    });
  };

  // ✅ enforce max size
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setCommentValue(value);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const charactersRemaining = maxChars - commentValue.length;

  return (
    <div className="px-4 mt-4 flex flex-row items-start gap-3">
      <Avatar className="w-10 h-10">
        <AvatarImage src={data?.data.profileImage} />
        <AvatarFallback>{data?.data.username.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <Input
          className={`min-h-10 rounded-2xl ${shake ? "animate-shake" : ""}`}
          value={commentValue}
          onChange={handleChange}
          placeholder={dict.placeholder}
        />
        <div className="text-xs text-muted-foreground mt-3">
          {charactersRemaining} / 1000
        </div>
      </div>
      <div className="mt-1 flex gap-2">
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
    </div>
  );
}
