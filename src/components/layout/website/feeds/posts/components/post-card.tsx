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
import Overlay from "./overlay";
import PostActionMenu from "./post-action-menu";
import { useCommentsPagination } from "@/hooks/api-hooks/comments-hooks";

interface PostCardProps {
  post: PostDTO;
  isLoading: boolean;
}

export default function PostCard({ post, isLoading }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const { data } = useCurrentLoggedUser();
  const dictPost = useTranslation().feedsPage.post;
  const dictComment = useTranslation().feedsPage.comments;
  const {
    isDeletePostPending,
    isPostUpdatePending,
    updatePost,
    deletePost,
    isLikePostPending,
    likePost: like,
    unLikePost: unlike,
    isUnLikePostPending,
    isSavePostPending,
    isUnSavePostPending,
    savePost: save,
    unSavePost: unsave,
  } = usePostActions({
    limit: 4,
    authorId: undefined,
    format: undefined,
  });

  const timeAgo = useTimeAgo(post.createdAt);

  const {comments,hasMore,loadMore,isLoading:isLoadingComments,isFetchingMore:isFetchingMoreComments} = useCommentsPagination(post.id,true,4)

  const handleLikeButton = (isLiked: boolean) => {
    if (isLikePostPending || isUnLikePostPending) return
    if (!isLiked) {
      like(post.id);
    } else {
      unlike(post.id);
    }
  };

  const handleSaveButton = (isSaved: boolean) => {
    if (isSavePostPending || isUnSavePostPending) return;
    if (!isSaved) {
      save(post.id);
    } else {
      unsave(post.id);
    }
  };

  return (
    <Card
      className={`bg-background gap-0 border-none p-4 my-4 
      `}
    >
      {isDeletePostPending || isLoading || isPostUpdatePending ? (
        <Overlay
          dict={isDeletePostPending ? dictPost.temp.delete : dictPost.temp.edit}
        />
      ) : (
        <div>
          {/* Header */}
          <CardHeader className="flex justify-between items-center gap-4 px-2">
            <div className="flex items-center gap-4">
              <CustomAvatar
                src={post.author.profileImage}
                fallback={post.author.username}
                className="md:w-15 md:h-15 w-10 h-10"
              />
              <div>
                <CardTitle className="text-lg font-semibold">
                  @{post.author.username}
                </CardTitle>
                <CardDescription className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    {timeAgo}
                  </span>
                </CardDescription>
              </div>
            </div>
            <PostActionMenu
              show={data?.data.id === post.author.id}
              post={post}
              updatePost={updatePost}
              deletePost={deletePost}
            />
          </CardHeader>

          {/* Content */}
          <CardContent className="px-2">
            {post.image && (
              <div className="mt-2 md:mt-4 rounded-md overflow-hidden">
                <Image
                  src={post.image}
                  alt="Post image"
                  width={1000}
                  height={1000}
                  className="object-contain w-full max-h-96 rounded-md"
                />
              </div>
            )}

            <p className="mt-4 text-wrap wrap-break-word">{post.content}</p>
          </CardContent>

          {/* Footer */}
          <CardFooter className="px-0 pt-4 flex justify-between text-sm text-muted-foreground">
            <div className="flex flex-col w-full">
              <div className="px-2 flex flex-row justify-between items-center w-full">
                <div className="flex gap-3">
                  <span>
                    <span className="text-primary mx-1">
                      {post.commentsCount}
                    </span>
                    {dictComment.comments}
                  </span>
                  <span>
                    <span className="text-primary mx-1">{post.likesCount}</span>
                    {dictPost.likes}
                  </span>
                </div>
              </div>

              <div className="mt-2 py-2 flex border-t border-b border-foreground/20 flex-row justify-evenly">
                <Button
                  variant="ghost"
                  className={`cursor-pointer ${
                    post.isLiked ? "text-red-600" : ""
                  }`}
                  onClick={() =>
                    handleLikeButton(post.isLiked)
                  }
                  
                >
                  <Heart />
                  <span>{post.isLiked ? dictPost.liked : dictPost.like}</span>
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
                  className={`cursor-pointer ${
                    post.isSaved ? "text-blue-600" : ""
                  }`}
                  onClick={() =>
                    handleSaveButton(post.isSaved)
                  }
                  
                >
                  <Bookmark/>
                  <span>{post.isSaved ? dictPost.saved : dictPost.save}</span>
                </Button>
              </div>

              {showComments && (
            <CommentSection
            postId={post.id}
              comments={comments}
              isCommentsPending={isLoadingComments}
              loadMoreComments={loadMore}
              hasMoreComments={hasMore}
              isFetchingMoreComments={isFetchingMoreComments}
            />
          )}
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  );
}
