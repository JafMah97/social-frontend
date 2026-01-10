"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmojiesPicker from "../../create-post/components/emojies-picker";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { maxChars } from "@/constants";
import { useCommentActions } from "@/hooks/api-hooks/use-comment-action";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "@/providers/translation-provider";

export default function CommentInput({ postId }: { postId: string }) {
  const dict = useTranslation().feedsPage.comments;

  const [commentValue, setCommentValue] = useState("");
  const [shake, setShake] = useState(false);

  const charactersRemaining = maxChars - commentValue.length;

  const { createComment, isCreatePending } = useCommentActions({
    postId,
    enabled: false,
    limit: 5,
  });

  const handleCreate = () => {
    console.log("Create comment:", commentValue);
    createComment({ content: commentValue, postId: postId });
    setCommentValue("");
  };

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <div className="w-full mt-5">
        <Input
          disabled={isCreatePending}
          placeholder={dict.commentInput.placeholder}
          value={commentValue}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= maxChars) setCommentValue(value);
            else {
              setShake(true);
              setTimeout(() => setShake(false), 500);
            }
          }}
          className={shake ? "animate-shake" : ""}
        />
        <div className={`px-2 pt-1 ${shake && "animate-shake"}`}>
          <span className={charactersRemaining === 0 ? "text-red-500" : ""}>
            {charactersRemaining}
          </span>
          /1000
        </div>
      </div>
      <EmojiesPicker setPostContent={setCommentValue} />
      <Button
        type="submit"
        className="ml-2 cursor-pointer"
        onClick={handleCreate}
        disabled={isCreatePending}
      >
        {isCreatePending ? <Spinner /> : <Send />}
      </Button>
    </div>
  );
}
