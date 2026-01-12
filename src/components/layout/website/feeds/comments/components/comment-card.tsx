"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTimeAgo } from "@/hooks/use-time-ago";
import { CommentItem } from "@/types/api-types";
import { Heart, MoreVertical } from "lucide-react";
import { useState } from "react";

interface CommentCardProps {
  comment: CommentItem;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const timeAgo = useTimeAgo(comment.createdAt);
  const [contentIsExpanded, setContentIsExpanded] = useState(false);

  const isLong = comment.content.length > 200;
  const displayedText = contentIsExpanded
    ? comment.content
    : isLong
    ? comment.content.slice(0, 200)
    : comment.content;

  return (
    <Card id={comment.id} className="my-2 gap-1 p-4 bg-primary/10">
      <CardHeader className="flex justify-between items-center p-0">
        <div className="flex flex-row items-start gap-2">
          <Avatar className="ring-1 ring-primary">
            <AvatarImage
              src={comment.author.profileImage || ""}
              alt={comment.author.username}
            />
            <AvatarFallback>
              {comment.author.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-md uppercase">
              @{comment.author.username}
            </CardTitle>
            <CardDescription className="text-xs py-1">
              {timeAgo}
            </CardDescription>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 rounded-full hover:bg-foreground/20 transition cursor-pointer"
        >
          <MoreVertical size={16} />
        </Button>
      </CardHeader>

      <CardContent className="py-2 px-0 flex justify-between gap-2 items-center break-all">
        <div className="flex-1">
          <p className="text-sm whitespace-pre-wrap">{displayedText}</p>
          {isLong && (
            <Button
              variant="link"
              size="sm"
              className="p-0 mt-1"
              onClick={() => setContentIsExpanded(!contentIsExpanded)}
            >
              {contentIsExpanded ? "Show less" : "Show more"}
            </Button>
          )}
        </div>

        <Button variant="ghost" size="sm" className="cursor-pointer pt-0">
          <Heart
            size={16}
            className={comment.isLiked ? "fill-red-500 text-red-500" : ""}
          />
          <span className="ml-1">{comment.likesCount}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
