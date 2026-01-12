import { ListPostsResponse, PostDTO } from "@/types/api-types";
import { InfiniteData } from "@tanstack/react-query";

export function replacePostInPages(
  pages: InfiniteData<ListPostsResponse>["pages"],
  postId: string,
  newPost: PostDTO
) {
  return pages.map((page) => ({
    ...page,
    data: {
      ...page.data,
      posts: page.data.posts.map((p) => (p.id === postId ? newPost : p)),
    },
  }));
}

export function removePostInPages(
  pages: InfiniteData<ListPostsResponse>["pages"],
  postId: string
) {
  return pages.map((page) => ({
    ...page,
    data: {
      ...page.data,
      posts: page.data.posts.filter((p) => p.id !== postId),
    },
  }));
}
