import { CommentItem } from "@/types/api-types";
import CommentCard from "./components/comment-card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "@/providers/translation-provider";
import CommentInput from "./components/comment-input";

interface CommentSectionProps {
  postId:string;
  comments: CommentItem[];
  isCommentsPending: boolean;
  loadMoreComments: () => void;
  hasMoreComments: boolean;
  isFetchingMoreComments: boolean;
}
export default function CommentSection({
  postId,
  comments,
  isCommentsPending,
  loadMoreComments,
  hasMoreComments,
  isFetchingMoreComments,
}: CommentSectionProps) {
  const dict = useTranslation().feedsPage.comments;
  if (isCommentsPending) return (
    <div className="p-5 flex justify-center items-center">
      <Spinner />
    </div>
  );

  return (
    <div className="pt-5 px-0 md:px-5">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <div className="flex justify-center items-center">
          {dict.noComments}
        </div>
      )}
      {hasMoreComments &&
        (isFetchingMoreComments ? (
          <div className="p-5 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full my-4"
            onClick={loadMoreComments}
          >
            {dict.loadMore}
          </Button>
        ))}
      <CommentInput postId={postId} />
    </div>
  );
}
