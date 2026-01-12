"use client";

import EditDialog from "@/components/layout/custom/edit-dialog";
import { Input } from "@/components/ui/input";
import { maxChars } from "@/constants";
import { useTranslation } from "@/providers/translation-provider";
import { CommentItem, UpdateCommentData } from "@/types/api-types";
import { useState } from "react";
import EmojiesPicker from "../../create-post/components/emojies-picker";

interface CommentEditDialogProps {
  editDialogOpen: boolean;
  onEditDialogOpen: (editDialogOpen: boolean) => void;

  comment: CommentItem;
  onConfirm: (data: UpdateCommentData) => void;
}
export default function CommentEditDialog({
  editDialogOpen,
  onEditDialogOpen,
  comment,
  onConfirm,
}: CommentEditDialogProps) {
  const dict = useTranslation().feedsPage.comments.edit;
  const [commentValue, setCommentValue] = useState(comment.content);
  const [shake, setShake] = useState(false);
  const charactersRemaining = maxChars - commentValue.length;
  const hasChanges = comment.content !== commentValue.trim();

  const handleEdit = () => {
    if (comment.content !== commentValue.trim()) {
      onConfirm({
        commentId: comment.id,
        content: commentValue,
        postId: comment.postId,
      });
    }
  };

  return (
    <EditDialog
      dict={dict}
      open={editDialogOpen}
      onOpenChange={onEditDialogOpen}
      onConfirm={handleEdit}
      confirmDisabled={!hasChanges}
    >
      <div className="flex flex-row gap-2 text-xs">
        <div className="w-full">
          <Input
            value={commentValue}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= maxChars) setCommentValue(value);
              else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
              }
            }}
            className={shake ? "animate-shake" : ""}
          />
          <div className={`px-2 pt-1 ${shake && "animate-shake"}`}>
            <span className={charactersRemaining === 0 ? "text-red-500" : ""}>
              {charactersRemaining}
            </span>
            /1000
          </div>
        </div>

        <EmojiesPicker setPostContent={setCommentValue} />
      </div>
    </EditDialog>
  );
}
