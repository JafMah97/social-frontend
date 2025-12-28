"use client";

import { useListPosts } from "@/hooks/api-hooks/post-hooks";
import PostCard from "./post-card";
import { Spinner } from "@/components/ui/spinner";

export default function Posts() {
  const { data: posts, isPending } = useListPosts(1, 10);

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <Spinner className="w-10 h-10" />
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
