import { CommentItem, ListCommentsResponse } from "@/types/api-types";

// helper to remove a comment from cached pages
export function removeCommentInPages(
  pages: ListCommentsResponse[],
  commentId: string
) {
  return pages.map((page) => ({
    ...page,
    data: {
      ...page.data,
      comments: page.data.comments.filter((c) => c.id !== commentId),
    },
  }));
}

// helper to replace a comment in cached pages
export function replaceCommentInPages(
  pages: ListCommentsResponse[],
  commentId: string,
  updated: CommentItem
) {
  return pages.map((page) => ({
    ...page,
    data: {
      ...page.data,
      comments: page.data.comments.map((c) =>
        c.id === commentId ? updated : c
      ),
    },
  }));
}
