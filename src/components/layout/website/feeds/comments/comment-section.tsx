"use client";

import { CommentItem } from "@/types/api-types";
import CommentItemCard from "./components/comment-item-card";
import CommentInput from "./components/comment-input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";

interface CommentSectionProps {
  comments: CommentItem[];
  isLoading: boolean;
  postId: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function CommentSection({
  comments,
  isLoading,
  postId,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CommentSectionProps) {
  const dict = useTranslation().feedsPage.comments.noComments;

  return (
    <div className="w-full pt-5">
      <div className="flex flex-col justify-center items-center p-2 px-10 space-y-3">
        {isLoading && <Spinner />}

        {!isLoading && comments.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">{dict}</p>
        )}

        {!isLoading &&
          comments.length > 0 &&
          comments.map((comment) => (
            <CommentItemCard key={comment.id} comment={comment} />
          ))}

        {hasNextPage && (
          <Button
            variant="ghost"
            className="mt-4"
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? <Spinner /> : "Show more"}
          </Button>
        )}
      </div>

      <CommentInput postId={postId} />
    </div>
  );
}
