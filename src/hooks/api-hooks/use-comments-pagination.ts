import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "@/api/comment-api";
import {
  ListCommentsResponse,
  ApiErrorResponse,
  NormalizedComment,
} from "@/types/api-types";

export function useCommentsPagination(
  postId: string,
  enabled: boolean,
  limit: number
) {
  const query = useInfiniteQuery<ListCommentsResponse, ApiErrorResponse>({
    queryKey: ["comments", postId],
    initialPageParam: 1,

    enabled: enabled && !!postId,

    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return getComments(postId, page, limit);
    },

    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data;
      return pagination.hasNext ? pagination.currentPage + 1 : undefined;
    },

  });

  const comments: NormalizedComment[] =
    query.data?.pages.flatMap((page) => page.data.comments) ?? [];

  return {
    comments,
    isLoading: query.isLoading,
    isFetchingMore: query.isFetchingNextPage,
    loadMore: query.fetchNextPage,
    hasMore: query.hasNextPage,
    refetch: query.refetch
  };
}
