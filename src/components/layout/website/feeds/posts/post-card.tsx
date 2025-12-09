"use client";
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
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import CommentSection from "./comment-section";
import CustomAvatar from "@/components/layout/custom/custom-avatar";

// Dummy post type
interface DummyPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
  author: {
    username: string;
    profile_image?: string;
  };
  likes: {
    userId: number;
    user: { username: string; profile_image?: string };
  }[];
  likes_count: number;
  comments_count: number;
  liked?: boolean;
  saved?: boolean;
}

export default function PostCard() {
  // Dummy post data
  const post: DummyPost = {
    id: 1,
    title: "My First Post",
    content: "This is a dummy post content for testing the UI.",
    image: "/images/cover-placeholder.jpg",
    created_at: new Date().toISOString(),
    author: {
      username: "jafar_dev",
      profile_image: "/images/profile-placeholder.jpg",
    },
    likes: [
      { userId: 1, user: { username: "alice", profile_image: "" } },
      { userId: 2, user: { username: "bob", profile_image: "" } },
    ],
    likes_count: 2,
    comments_count: 3,
    liked: false,
    saved: false,
  };

  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);

  const likeHandler = () => setLiked((prev) => !prev);
  const saveHandler = () => setSaved((prev) => !prev);

  return (
    <Card className="bg-transparent gap-0 shadow-none border-none p-0">
      {/* Header */}
      <CardHeader className="flex justify-between items-center gap-4 px-2">
        <div className="flex items-center gap-4">
          <CustomAvatar
            src="/images/profile-placeholder.jpg"
            fallback={"CN"}
            className="md:w-15 md:h-15 w-10 h-10"
          />
          <div>
            <CardTitle className="text-lg font-semibold">
              @{post.author.username}
            </CardTitle>
            <CardDescription className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </CardDescription>
          </div>
        </div>
        <Popover>
          <PopoverTrigger className="text-xs cursor-pointer">
            <EllipsisVertical size={20} className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="text-xs w-32 p-2">
            <div className="flex flex-col gap-2">
              <Button variant="destructive" size="sm">
                Delete
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
              width={600}
              height={300}
              className="object-cover w-full max-h-96 rounded-md"
            />
          </div>
        )}
        <p className=" mt-4 text-wrap wrap-break-word">{post.content}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-0 pt-4 flex justify-between text-sm text-muted-foreground">
        <div className="flex flex-col w-full">
          {/* Likes & comments counter */}
          <div className="px-2 flex flex-row justify-between items-center w-full">
            <div className="flex -space-x-2 min-h-8 items-center">
              {post.likes.slice(0, 3).map((like) => (
                <CustomAvatar
                src="/images/profile-placeholder.jpg"
                  key={like.userId}
                  fallback={like.user.username}
                  className="w-7 h-7"
                />
              ))}
              {post.likes.length > 3 && (
                <span className="ml-1 text-lg font-bold text-muted-foreground">
                  ...
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">
                {post.comments_count} Comments
              </span>
              <span className="text-muted-foreground">
                {post.likes_count} Likes
              </span>
            </div>
          </div>

          {/* Action bar */}
          <div className="mt-2 py-2 flex border-b border-t border-foreground flex-row justify-evenly">
            <Button
              className={`text-foreground cursor-pointer ${
                liked ? "text-red-600" : ""
              }`}
              variant="ghost"
              onClick={likeHandler}
            >
              <Heart className={liked ? "text-red-600" : ""} />
              <span>{liked ? "Liked" : "Like"}</span>
            </Button>

            <Button
              className="text-foreground  cursor-pointer"
              variant="ghost"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle /> Comment
            </Button>

            <Button
              className={`text-foreground cursor-pointer ${
                saved ? "text-blue-600" : ""
              }`}
              variant="ghost"
              onClick={saveHandler}
            >
              <Bookmark />
              <span>{saved ? "Saved" : "Save"}</span>
            </Button>
          </div>

          {/* Comment section */}
          {showComments && <CommentSection />}
        </div>
      </CardFooter>
    </Card>
  );
}
