"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

import CustomAvatar from "@/components/layout/custom/custom-avatar";
import CommentSection from "../../comments/comment-section";
import { PostDTO } from "@/types/api-types";
import { usePostActions } from "@/hooks/api-hooks/use-post-actions";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import { useTranslation } from "@/providers/translation-provider";
import { useTimeAgo } from "@/hooks/use-time-ago";
import PostActionsMenu from "./post-action-menu";
import { useCommentsPagination } from "@/hooks/api-hooks/use-comments-pagination";

interface PostCardProps {
  post: PostDTO;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const { data } = useCurrentLoggedUser();
  const dictPost = useTranslation().feedsPage.post;

  // Prevent undefined postId from triggering the query
  const { comments, isLoading, isFetchingMore, loadMore, hasMore } =
    useCommentsPagination(post.id,showComments);

  const {
    post: p,
    liked,
    saved,
    like,
    unlike,
    save,
    unsave,
    deletePost,
    isLiking,
    isSaving,
    isDeleting,
  } = usePostActions(post);

  const timeAgo = useTimeAgo(p.createdAt);

  return (
    <Card className="bg-background gap-0 border-none p-4 my-4">
      {/* Header */}
      <CardHeader className="flex justify-between items-center gap-4 px-2">
        <div className="flex items-center gap-4">
          <CustomAvatar
            src={p.author.profileImage}
            fallback={p.author.username}
            className="md:w-15 md:h-15 w-10 h-10"
          />
          <div>
            <CardTitle className="text-lg font-semibold">
              @{p.author.username}
            </CardTitle>
            <CardDescription className="flex flex-col">
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </CardDescription>
          </div>
        </div>

        <PostActionsMenu
          isAuthor={data?.data?.id === p.author.id}
          deletePost={deletePost}
          isDeleting={isDeleting}
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="px-2">
        {p.image && (
          <div className="mt-2 md:mt-4 rounded-md overflow-hidden">
            <Image
              src={p.image}
              alt="Post image"
              width={1000}
              height={1000}
              className="object-contain w-full max-h-96 rounded-md"
            />
          </div>
        )}

        <p className="mt-4 text-wrap wrap-break-word">{p.content}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-0 pt-4 flex justify-between text-sm text-muted-foreground">
        <div className="flex flex-col w-full">
          <div className="px-2 flex flex-row justify-between items-center w-full">
            <div className="flex -space-x-2 min-h-8 items-center"></div>

            <div className="flex gap-3">
              <span>
                <span className="text-primary mx-1">{p.commentsCount}</span>
                {dictPost.comments}
              </span>
              <span>
                <span className="text-primary mx-1">{p.likesCount}</span>
                {dictPost.likes}
              </span>
            </div>
          </div>

          <div className="mt-2 py-2 flex border-t border-b border-foreground/20 flex-row justify-evenly">
            <Button
              variant="ghost"
              className={`cursor-pointer ${liked ? "text-red-600" : ""}`}
              onClick={() => (liked ? unlike() : like())}
              disabled={isLiking}
            >
              <Heart className={liked ? "text-red-600" : ""} />
              <span>{liked ? dictPost.liked : dictPost.like}</span>
            </Button>

            <Button
              className="cursor-pointer"
              variant="ghost"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle /> {dictPost.comment}
            </Button>

            <Button
              variant="ghost"
              className={`cursor-pointer${saved ? "text-blue-600" : ""}`}
              onClick={() => (saved ? unsave() : save())}
              disabled={isSaving}
            >
              <Bookmark />
              <span>{saved ? dictPost.saved : dictPost.save}</span>
            </Button>
          </div>

          {showComments && (
            <CommentSection
              comments={comments}
              isLoading={isLoading}
              postId={post.id}
              fetchNextPage={loadMore}
              hasNextPage={hasMore}
              isFetchingNextPage={isFetchingMore}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
