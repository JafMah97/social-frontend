"use client";

import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipButton from "@/components/layout/custom/tooltip-button";
import { CommentItem } from "@/types/api-types";

interface CommentSectionProps {
  comments: CommentItem[] | undefined;
  isLoading: boolean;
  onCreateComment?: (content: string) => void;
}

export default function CommentSection({
  comments,
  isLoading,
  onCreateComment,
}: CommentSectionProps) {
  const [commentValue, setCommentValue] = useState("");

  const handleCreateComment = () => {
    if (!commentValue.trim()) return;
    onCreateComment?.(commentValue.trim());
    setCommentValue("");
  };

  return (
    <div className="w-full pt-5">
      {/* Comments List */}
      <div className="flex flex-col p-2 px-10 space-y-3">
        {isLoading && (
          <p className="text-center text-sm">Loading comments...</p>
        )}

        {!isLoading && comments && comments.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No comments yet
          </p>
        )}

        {!isLoading &&
          comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.authorImage || ""} />
                <AvatarFallback>
                  {comment.author.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  @{comment.author.username}
                </span>

                <span className="text-sm">{comment.content}</span>

                <span className="text-[10px] text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Comment Input */}
      <div className="px-4 mt-4 flex flex-row items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>

        <Input
          className="min-h-10 rounded-2xl"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          placeholder="Write a comment..."
        />

        <TooltipButton toolTipMessage="emoji" button={<Smile />} />

        <Button
          className="bg-grad btn-style"
          size="icon"
          onClick={handleCreateComment}
          disabled={!commentValue.trim()}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
