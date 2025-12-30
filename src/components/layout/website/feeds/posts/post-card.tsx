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
import { Bookmark, EllipsisVertical, Heart, MessageCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomAvatar from "@/components/layout/custom/custom-avatar";
import CommentSection from "./comment-section";
import { PostDTO } from "@/types/api-types";
import { usePostActions } from "@/hooks/api-hooks/use-post-actions";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import CustomAlertDialog from "@/components/layout/custom/alert-dialog";
import { useTranslation } from "@/providers/translation-provider";
import { useTimeAgo } from "@/hooks/use-time-ago";

interface PostCardProps {
  post: PostDTO;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { data } = useCurrentLoggedUser();
  const dictPost = useTranslation().feedsPage.post;

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
              <span className="text-xs text-muted-foreground">
                {timeAgo}
              </span>
            </CardDescription>
          </div>
        </div>

        <Popover>
          <PopoverTrigger className="text-xs cursor-pointer">
            <EllipsisVertical size={20} />
          </PopoverTrigger>

          <PopoverContent className="text-xs w-40 p-2">
            {data?.data?.id === p.author.id ? (
              // ⭐ AUTHOR ACTIONS
              <div className="flex flex-col gap-2">
                <CustomAlertDialog
                  triggerText={dictPost.delete}
                  title={dictPost.deleteTitle}
                  description={dictPost.deleteDescription}
                  continueText={dictPost.deleteConfirm}
                  cancelText={dictPost.deleteCancel}
                  onContinue={deletePost}
                  isMobile={false}
                  isPending={isDeleting}
                />

                <Button variant="outline" size="sm">
                  {dictPost.edit}
                </Button>
              </div>
            ) : (
              // ⭐ NON-AUTHOR ACTIONS
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="sm">
                  {dictPost.report}
                </Button>

                <Button variant="ghost" size="sm">
                  {dictPost.hide}
                </Button>

                <Button variant="ghost" size="sm">
                  {dictPost.share}
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
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
          {/* Likes & comments counter */}
          <div className="px-2 flex flex-row justify-between items-center w-full">
            <div className="flex -space-x-2 min-h-8 items-center"></div>

            <div className="flex gap-3">
              <span>
                {p.commentsCount} {dictPost.comments}
              </span>
              <span>
                {p.likesCount} {dictPost.likes}
              </span>
            </div>
          </div>

          {/* Action bar */}
          <div className="mt-2 py-2 flex border-t border-foreground/20 flex-row justify-evenly">
            {/* LIKE */}
            <Button
              variant="ghost"
              className={liked ? "text-red-600" : ""}
              onClick={() => (liked ? unlike() : like())}
              disabled={isLiking}
            >
              <Heart className={liked ? "text-red-600" : ""} />
              <span>{liked ? dictPost.liked : dictPost.like}</span>
            </Button>

            {/* COMMENTS */}
            <Button
              variant="ghost"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle /> {dictPost.comment}
            </Button>

            {/* SAVE */}
            <Button
              variant="ghost"
              className={saved ? "text-blue-600" : ""}
              onClick={() => (saved ? unsave() : save())}
              disabled={isSaving}
            >
              <Bookmark />
              <span>{saved ? dictPost.saved : dictPost.save}</span>
            </Button>
          </div>

          {showComments && <CommentSection />}
        </div>
      </CardFooter>
    </Card>
  );
}
