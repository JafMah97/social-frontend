"use client";

import { useListPosts } from "@/hooks/api-hooks/post-hooks";
import PostCard from "./post-card";

export default function Posts() {
  const { data: posts } = useListPosts(1, 10);

  return (
    <div >
      {posts?.data.posts.map((post) => (
        <div key={post.id}>
          {/* Render post content here */}
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
