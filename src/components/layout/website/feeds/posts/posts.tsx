"use client";

import { useRef, useEffect } from "react";
import PostCard from "./components/post-card";
import { Spinner } from "@/components/ui/spinner";
import { Inbox } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";
import { usePostsPagination } from "@/hooks/api-hooks/post-hooks";

export default function Posts() {
  const { posts, isLoading, isFetchingMore, loadMore, hasMore ,isSuccess,isError } =
    usePostsPagination(true,4);

  const dict = useTranslation().feedsPage.post;
  const dictError = useTranslation().errors

  // Sentinel div for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!isLoading && isSuccess && posts?.length === 0) {
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

  if (!isLoading && isError && posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
        <div className="bg-primary p-4 rounded-full mb-4">
          <Inbox className="h-10 w-10 text-background" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {dictError.networkError}
        </h2>
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <PostCard post={post} isLoading={isLoading} />
        </div>
      ))}

      {/* Infinite scroll sentinel */}
      <div ref={loadMoreRef} className="h-10" />

      {/* Loading spinner for next pages */}
      {isFetchingMore && (
        <div className="flex justify-center py-6">
          <Spinner className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
