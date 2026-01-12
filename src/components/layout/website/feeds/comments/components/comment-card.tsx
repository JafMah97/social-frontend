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
import { useCommentActions } from "@/hooks/api-hooks/use-comment-action";
import { useTimeAgo } from "@/hooks/use-time-ago";
import { CommentItem } from "@/types/api-types";
import { Heart } from "lucide-react";
import { useState } from "react";
import CommentActionMenu from "./comment-action-menu";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import { Spinner } from "@/components/ui/spinner";

interface CommentCardProps {
  comment: CommentItem;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const timeAgo = useTimeAgo(comment.createdAt);
  const [contentIsExpanded, setContentIsExpanded] = useState(false);
  const loggedUserdata = useCurrentLoggedUser();

  const {
    likeComment,
    unlikeComment,
    deleteComment,
    updateComment,
    isLikeCommentPending,
    isUnlikeCommentPending,
    isUpdateCommentPending,
    isDeleteCommentPending,
  } = useCommentActions({ postId: comment.postId, limit: 4 });

  const isLong = comment.content.length > 200;
  const displayedText = contentIsExpanded
    ? comment.content
    : isLong
    ? comment.content.slice(0, 200)
    : comment.content;

  const handleLike = () => {
    console.log(comment.isLiked);
    if (isLikeCommentPending || isUnlikeCommentPending) return;
    if (!comment.isLiked) {
      likeComment({ commentId: comment.id });
    } else {
      unlikeComment({ commentId: comment.id });
    }
  };

  return (
    <Card id={comment.id} className="my-2 gap-1 p-4 bg-primary/10">
      {isUpdateCommentPending || isDeleteCommentPending ? (
        <div className="flex justify-center items-center">

          <Spinner />
        </div>
      ) : (
        <>
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
            <CommentActionMenu
              show={loggedUserdata.data?.data.id === comment.author.id}
              comment={comment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
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

            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer pt-0"
              onClick={handleLike}
            >
              <Heart
                size={16}
                className={comment.isLiked ? "fill-red-500 text-red-500" : ""}
              />
              <span className="ml-1">{comment.likesCount}</span>
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}
