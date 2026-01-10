import { useInfiniteQuery } from "@tanstack/react-query";
import { listPostsApi } from "@/api/post-api";

export function usePostsPagination(
  enabled: boolean,
  limit = 10,
  authorId?: string,
  format?: string
) {
  const query = useInfiniteQuery({
    queryKey: ["posts", limit, authorId, format],
    initialPageParam: 1,

    enabled: enabled, 

    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return listPostsApi(page, limit, authorId, format);
    },

    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data;

      const current = pagination.page;
      const totalPages = pagination.pages;

      return current < totalPages ? current + 1 : undefined;
    },
  });

  const posts = query.data?.pages.flatMap((page) => page.data.posts) ?? [];

  return {
    posts,
    isLoading: query.isLoading,
    isFetchingMore: query.isFetchingNextPage,
    loadMore: query.fetchNextPage,
    hasMore: query.hasNextPage,
    isSuccess:query.isSuccess,
    isError:query.isError
  };
}
