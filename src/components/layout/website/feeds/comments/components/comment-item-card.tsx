"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentItem } from "@/types/api-types";
import { useTimeAgo } from "@/hooks/use-time-ago";
import { Heart } from "lucide-react";
import CommentActionsMenu from "./comment-action-menu";
import { Button } from "@/components/ui/button";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";

interface CommentItemCardProps {
  comment: CommentItem;
  onLike?: (commentId: string) => void;
  onEdit?: (comment: CommentItem) => void;
  onDelete?: (commentId: string) => void;
}

export default function CommentItemCard({
  comment,
  onLike,
  onEdit,
  onDelete,
}: CommentItemCardProps) {
  const timeAgo = useTimeAgo(comment.createdAt);
  const { data } = useCurrentLoggedUser();

  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 160;
  const isLong = comment.content.length > MAX_LENGTH;

  const displayedText = expanded
    ? comment.content
    : comment.content.slice(0, MAX_LENGTH);

  return (
    <div className="flex gap-3 bg-primary/10 p-3 rounded-2xl w-full">
      {/* Avatar */}
      <Avatar className="w-10 h-10">
        <AvatarImage src={comment.authorImage || ""} />
        <AvatarFallback>
          {comment.author.fullName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* ✅ Header row: username + time + actions menu */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold">
              @{comment.author.username}
            </span>
            <span className="text-[10px] text-muted-foreground">{timeAgo}</span>
          </div>

          <CommentActionsMenu
            isAuthor={comment.authorId === data?.data.id}
            onEdit={() => onEdit?.(comment)}
            onDelete={() => onDelete?.(comment.id)}
          />
        </div>

        {/* ✅ Body text now always starts below header */}
        <span className="text-md break-all">
          {displayedText}
          {isLong && !expanded && "..."}
        </span>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-500 hover:underline mt-1 w-fit"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}

        {/* Footer: likes bottom-left */}
        <div className="flex items-center gap-2 mt-2 ">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(comment.id)}
            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-foreground/20 transition cursor-pointer"
          >
            <Heart
              size={16}
              className={
                comment.isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              }
            />
          </Button>
            <span className="text-sm text-primary">
              {comment.likesCount}
            </span>
        </div>
      </div>
    </div>
  );
}
