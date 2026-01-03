"use client";

import { useListPosts } from "@/hooks/api-hooks/post-hooks";
import PostCard from "./components/post-card";
import { Spinner } from "@/components/ui/spinner";
import { Inbox } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";

export default function Posts() {
  const { data: posts, isPending } = useListPosts(1, 10);
  const dict = useTranslation().feedsPage.post;

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }
  if (!isPending && posts?.data.posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
        <div className="bg-primary p-4 rounded-full mb-4">
          <Inbox className="h-10 w-10 text-background" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {dict.noPosts}
        </h2>
        <p className="text-muted-foreground mt-1">{dict.newPostsAppear}</p>
      </div>
    );
  }
  return (
    <div>
      {posts?.data.posts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
