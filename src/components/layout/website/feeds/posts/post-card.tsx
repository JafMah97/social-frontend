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
import { useDeletePost, useListPosts } from "@/hooks/api-hooks/post-hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface PostCardProps {
  post: PostDTO;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.isLiked);
  const [saved, setSaved] = useState(post.isSaved);

  const {} = useListPosts(1,10)

  const {mutate,isPending} =useDeletePost({
    onSuccess:()=>{
      toast.success("Post Deleted Successfuly")
    },
    onError:(error)=>{
      console.log(error)
      toast.error("Post Did not deleted")
    }
  })

  const handleDelete = () =>{
    mutate(post.id)
  }
  return (
    <Card className="bg-background gap-0 border-none p-4 my-4">
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
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </CardDescription>
          </div>
        </div>

        <Popover>
          <PopoverTrigger className="text-xs cursor-pointer">
            <EllipsisVertical size={20} />
          </PopoverTrigger>
          <PopoverContent className="text-xs w-32 p-2">
            <div className="flex flex-col gap-2">
              <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
                {isPending ?(<Spinner/>):"Delete"}
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </PopoverContent>
        </Popover>
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
          {/* Likes & comments counter */}
          <div className="px-2 flex flex-row justify-between items-center w-full">
            <div className="flex -space-x-2 min-h-8 items-center">
              {/* You can map real likes here if you add them */}
            </div>

            <div className="flex gap-3">
              <span>{post.commentsCount} Comments</span>
              <span>{post.likesCount} Likes</span>
            </div>
          </div>

          {/* Action bar */}
          <div className="mt-2 py-2 flex border-t border-foreground/20 flex-row justify-evenly">
            <Button
              variant="ghost"
              className={liked ? "text-red-600" : ""}
              onClick={() => setLiked((prev) => !prev)}
            >
              <Heart className={liked ? "text-red-600" : ""} />
              <span>{liked ? "Liked" : "Like"}</span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle /> Comment
            </Button>

            <Button
              variant="ghost"
              className={saved ? "text-blue-600" : ""}
              onClick={() => setSaved((prev) => !prev)}
            >
              <Bookmark />
              <span>{saved ? "Saved" : "Save"}</span>
            </Button>
          </div>

          {showComments && <CommentSection />}
        </div>
      </CardFooter>
    </Card>
  );
}
