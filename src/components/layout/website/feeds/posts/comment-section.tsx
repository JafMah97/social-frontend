"use client";
import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipButton from "@/components/layout/custom/tooltip-button";

// Dummy comment type
interface DummyComment {
  id: string;
  content: string;
  created_at: string;
  author_full_name: string;
  author_username: string;
  author_image?: string;
}

export default function CommentSection() {
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState<DummyComment[]>([
    {
      id: "1",
      content: "Nice post!",
      created_at: new Date().toISOString(),
      author_full_name: "Alice Johnson",
      author_username: "alice",
      author_image: "",
    },
    {
      id: "2",
      content: "Love the photo.",
      created_at: new Date().toISOString(),
      author_full_name: "Bob Smith",
      author_username: "bob",
      author_image: "",
    },
  ]);

  const handleCreateComment = () => {
    if (commentValue.trim().length === 0) return;
    const newComment: DummyComment = {
      id: String(comments.length + 1),
      content: commentValue,
      created_at: new Date().toISOString(),
      author_full_name: "Current User",
      author_username: "me",
      author_image: "",
    };
    setComments((prev) => [...prev, newComment]);
    setCommentValue("");
  };

  return (
    <div className="w-full pt-5">
      {/* Comments List */}
      <div className="flex flex-col p-2 px-10 space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.author_image || ""} />
              <AvatarFallback>
                {comment.author_full_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">
                @{comment.author_username}
              </span>
              <span className="text-sm">{comment.content}</span>
              <span className="text-[10px] text-muted-foreground">
                {new Date(comment.created_at).toLocaleString()}
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
       
        <TooltipButton toolTipMessage={"tooltip"} button={<Smile/>} />
        <Button
          className="bg-grad btn-style"
          size="icon"
          onClick={handleCreateComment}
          disabled={commentValue.trim().length === 0}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
